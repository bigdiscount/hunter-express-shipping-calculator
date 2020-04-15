import React, { useState, useEffect } from 'react'
import CustomeForm from '../custome-Form/Custome-form.component'
import { products } from '../../assets/products'
import { zoneGuide } from '../../assets/newZoneGuide'
import { zoneRates } from '../../assets/zoneRate'

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
  const [totalCost, setTotalCost] = useState(0)
  const [basePrice, setBasePrice] = useState(initialBasePrice)
  const [prodList, setProdList] = useState(initialBasePrice)
  // const [showList, setShowList] = useState(initialShowList)
  const [selectedSuburb, setSelectedSuburb] = useState(initSuburb)

  useEffect(() => {}, [
    productInfo,
    // showList,
    selectedSuburb,
    basePrice,
    totalCost
  ])

  const calculateShippingCost = () => {
    const { l, w, h, weight } = productInfo
    const cubicWeight = ((l * w * h) / 1000000) * 250 //changing cm cubic to weight cubic

    const chargableWeith = weight > cubicWeight ? weight : cubicWeight
    console.log('chargable weight ->', chargableWeith)
    const baseAllowWeight = 25
    const packageCount = Math.ceil(chargableWeith / baseAllowWeight)
    console.log('total package count ->', packageCount)
    const baseCost = basePrice.fb + basePrice.sb * (packageCount - 1)
    console.log('base rate ->', baseCost)
    console.log('base total price ->', baseCost)

    const total = baseCost * basePrice.fuel * basePrice.gst
    console.log(total)
    setTotalCost(total)
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
        ...zoneRates[value]
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
    <div>
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
        totalCost={totalCost}
        calculateShippingCost={calculateShippingCost}
      />
    </div>
  )
}

export default Calculator
