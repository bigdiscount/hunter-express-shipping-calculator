import React, { useState, useEffect } from 'react'
import CustomeForm from '../custome-Form/Custome-form.component'
import { products } from '../../assets/products'

const initialProduct = {
  sku: 'test',
  title: 'tilte',
  weight: '5.5',
  type: 'fixed',
  postcode: '2000',
  suburb: 'sydney',
  zone: '26'
}
const initialBasePrice = {
  fPrice: '',
  bPrice: '',
  fuel: 1.18, //18% fule charge added
  gst: 1.1 // 10% GST charge added
}
const initialShowList = { product: true }
const Calculator = () => {
  const [productInfo, setProductInfo] = useState(initialProduct)
  const [totalCost, setTotalCost] = useState()
  const [basePrice, setBasePrice] = useState(initialBasePrice)
  const [prodList, setProdList] = useState(initialBasePrice)
  const [showList, setShowList] = useState(initialShowList)

  useEffect(() => {}, [productInfo, showList, totalCost])

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

    setProductInfo({
      ...productInfo,
      [name]: value
    })
    calculateShippingCost()
  }

  const calculateShippingCost = () => {
    const { l, w, h, weight } = productInfo
    const cubicWeight = l * w * h
    const chargableWeith = weight > cubicWeight ? weight : cubicWeight
    const baseAllowWeight = 25
    const packageCount = Math.ceil(chargableWeith / baseAllowWeight)

    const baseCost = basePrice.fPrice + basePrice.nPrice * (packageCount - 1)
    const total =
      baseCost * basePrice.fuel + baseCost * basePrice.fuel * basePrice.gst
    setTotalCost(total)
  }

  const handleSelectProd = row => {
    setShowList({
      ...showList,
      product: false
    })
    setProductInfo({
      ...productInfo,
      ...row
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
        totalCost={totalCost}
        showList={showList}
      />
    </div>
  )
}

export default Calculator
