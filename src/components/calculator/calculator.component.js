import React, { useState, useEffect } from 'react'
import CustomeForm from '../custome-Form/Custome-form.component'
import { products } from '../../assets/products'
import { zoneGuide } from '../../assets/newZoneGuide'
import { hunterExpressZoneRate } from '../../assets/hunterExpressZoneRate'
import { calculateEparcel, calculateSatchel } from '../../assets/ausPost/index'
// import {
//   getEgoRate,
//   getSandleRate,
//   getAuspostEparcelRate
// } from '../../utils/api'

const initialProduct = {
  sku: '',
  title: '',
  weight: 0,
  postcode: ''
}
const initialBasePrice = {
  fb: '',
  sb: '',
  fuel: 1.18, //18% fule charge added
  gst: 1.1 // 10% GST charge added
}
// const initialShowList = { product: true }

const initSuburb = {
  lists: [],
  suburb: '',
  zone: ''
}
const Calculator = () => {
  const [productInfo, setProductInfo] = useState(initialProduct)
  const [hunterExpressTotal, setHunterExpressTotal] = useState(0)
  const [sandleWCbmTotal, setSandleWCbmTotal] = useState(0)
  const [sandleNoCbmTotal, setsandleNoCbmTotal] = useState(0)
  const [auspostEparcelTotal, setAuspostEparcelTotal] = useState(0)
  const [auspostSatchelTotal, setAuspostSatchelTotal] = useState(0)
  const [basePrice, setBasePrice] = useState(initialBasePrice)
  const [prodList, setProdList] = useState(initialBasePrice)
  const [selectedSuburb, setSelectedSuburb] = useState(initSuburb)

  useEffect(() => {}, [
    productInfo,
    selectedSuburb,
    basePrice,
    hunterExpressTotal,
    sandleWCbmTotal,
    sandleNoCbmTotal,
    auspostEparcelTotal,
    auspostSatchelTotal
  ])

  const calculateShippingCost = async () => {
    const { l, w, h, weight, postcode } = productInfo
    const roundedWeight = Math.ceil(weight)

    const eparcelCost = (await calculateEparcel(postcode, roundedWeight)) || 0
    setAuspostEparcelTotal(eparcelCost.toFixed(2))

    const cubicWeight = ((l * w * h) / 1000000) * 250 //changing cm cubic to weight cubic

    const satchelCost = await calculateSatchel(roundedWeight, cubicWeight)
    setAuspostSatchelTotal(
      typeof satchelCost === 'number' ? satchelCost.toFixed(2) : satchelCost
    )

    let chargableWeigth = weight > cubicWeight ? weight : cubicWeight
    chargableWeigth = Math.ceil(chargableWeigth)
    const baseAllowWeight = 25
    const packageCount = Math.ceil(chargableWeigth / baseAllowWeight)
    const baseCost = basePrice.fb + basePrice.sb * (packageCount - 1)

    const total = baseCost * basePrice.fuel * basePrice.gst
    setHunterExpressTotal(total.toFixed(2))
  }

  const handleProductSearch = e => {
    // e.preventDefault()
    const { value } = e.target
    setProductInfo({
      ...productInfo,
      sku: value
    })
    if (value.length < 2) {
      setProdList([])
      return
    }
    const searchProd = products.filter(
      row => row.title.toLowerCase().search(value.toLowerCase()) >= 0
    )

    setProdList(searchProd.length ? searchProd : [])
  }
  const handleOnChange = e => {
    e.preventDefault()

    const { name, value } = e.target
    if (name === 'suburb') {
      const args = value.split('|')
      const zone = args[0]
      const suburb = args[1]
      setBasePrice({
        ...basePrice,
        ...hunterExpressZoneRate[zone]
      })
      setSelectedSuburb({
        ...selectedSuburb,
        zone,
        suburb
      })
      setProductInfo({
        ...productInfo,
        suburb
      })
      return
    }

    setProductInfo({
      ...productInfo,
      [name]: value
    })
  }

  const handleSelectProd = row => {
    setProductInfo({
      ...productInfo,
      ...row
    })
    setProdList([])
  }

  const handleOnPostcodeChange = async e => {
    const pc = productInfo.postcode

    const lists = zoneGuide[pc] || []

    setSelectedSuburb({
      ...selectedSuburb,
      lists
    })
    setProductInfo({
      ...productInfo,
      postcode: pc
    })
  }

  return (
    <div className="text-white">
      Use calculator below to calculate Hunter Express shipping const.
      <hr />
      <CustomeForm
        productInfo={productInfo}
        handleOnChange={handleOnChange}
        handleProductSearch={handleProductSearch}
        prodList={prodList}
        handleSelectProd={handleSelectProd}
        handleOnPostcodeChange={handleOnPostcodeChange}
        selectedSuburb={selectedSuburb}
        hunterExpressTotal={hunterExpressTotal}
        sandleWCbmTotal={sandleWCbmTotal}
        sandleNoCbmTotal={sandleNoCbmTotal}
        calculateShippingCost={calculateShippingCost}
        auspostEparcelTotal={auspostEparcelTotal}
        auspostSatchelTotal={auspostSatchelTotal}
      />
    </div>
  )
}

export default Calculator
