import React, { useState, useEffect } from 'react'
import CustomeForm from '../custome-Form/Custome-form.component'
import { products } from '../../assets/products'
import { zoneGuide } from '../../assets/newZoneGuide'
import { hunterExpressZoneRate } from '../../assets/hunterExpressZoneRate'
import {
  getEgoRate,
  getSandleRate,
  getAuspostEparcelRate
} from '../../utils/api'

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
  const [egoTotal, setEgoTotal] = useState(0)
  const [sandleWCbmTotal, setSandleWCbmTotal] = useState(0)
  const [sandleNoCbmTotal, setsandleNoCbmTotal] = useState(0)
  const [auspostEparcelTotal, setAuspostEparcelTotal] = useState(0)
  const [basePrice, setBasePrice] = useState(initialBasePrice)
  const [prodList, setProdList] = useState(initialBasePrice)
  // const [showList, setShowList] = useState(initialShowList)
  const [selectedSuburb, setSelectedSuburb] = useState(initSuburb)

  useEffect(() => {}, [
    productInfo,
    // showList,
    selectedSuburb,
    basePrice,
    hunterExpressTotal,
    egoTotal,
    sandleWCbmTotal,
    sandleNoCbmTotal
  ])

  const calculateShippingCost = async () => {
    const { l, w, h, weight } = productInfo

    let cbm = true
    const dataToCsv = {
      postcode: '',
      suburb: ''
    }
    const argsForApi = { width: w, height: h, depth: l, weight }
    // EGO PRICING
    getEgoRate(argsForApi, dataToCsv)
      .then(price => {
        setEgoTotal(price)
      })
      .catch(error => console.log(error))

    //SENDLE PRICING WITHOUT CBM
    getSandleRate(argsForApi, dataToCsv, (cbm = false))
      .then(price => {
        setsandleNoCbmTotal(price)
      })
      .catch(error => console.log(error))

    //SANDLE PRICING WITH CBM
    getSandleRate(argsForApi, dataToCsv, cbm)
      .then(price => {
        setSandleWCbmTotal(price)
      })
      .catch(error => console.log(error))

    //AUSTRALIAN POST PRICING
    getAuspostEparcelRate(argsForApi, dataToCsv)
      .then(price => {
        setAuspostEparcelTotal(price)
      })
      .catch(error => console.log(error))

    //HUNTER EXPRESS PRICING
    const cubicWeight = ((l * w * h) / 1000000) * 250 //changing cm cubic to weight cubic

    const chargableWeith = weight > cubicWeight ? weight : cubicWeight
    const baseAllowWeight = 25
    const packageCount = Math.ceil(chargableWeith / baseAllowWeight)
    const baseCost = basePrice.fb + basePrice.sb * (packageCount - 1)

    const total = baseCost * basePrice.fuel * basePrice.gst
    setHunterExpressTotal(total)
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
      setBasePrice({
        ...basePrice,
        ...hunterExpressZoneRate[value]
      })
      setSelectedSuburb({
        ...selectedSuburb,
        zone: value
      })
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
        egoTotal={egoTotal}
        sandleWCbmTotal={sandleWCbmTotal}
        sandleNoCbmTotal={sandleNoCbmTotal}
        calculateShippingCost={calculateShippingCost}
        auspostEparcelTotal={auspostEparcelTotal}
      />
    </div>
  )
}

export default Calculator
