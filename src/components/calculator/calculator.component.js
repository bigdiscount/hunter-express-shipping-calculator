import React, { useState, useEffect } from 'react'
import CustomeForm from '../custome-Form/Custome-form.component'
import { products } from '../../assets/products'
import { zoneGuide } from '../../assets/newZoneGuide'
import { hunterExpressZoneRate } from '../../assets/hunterExpressZoneRate'
import { calculateEparcel, calculateSatchel } from '../../assets/ausPost/index'
import { getSandleRateFromApi } from '../../utils/api'
import { calculateWizMeBusinessRate, calculateHunterExpress } from '../../utils'

const initialProduct = {
  sku: '',
  title: '',
  weight: 0,
  postcode: '',
  l: '',
  w: '',
  h: ''
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
  const [wizMeTotal, setWizMeTotal] = useState(0)
  const [wizMeCostWdeadWeight, setWizMeCostWdeadWeight] = useState(0)
  const [auspostEparcelTotal, setAuspostEparcelTotal] = useState(0)
  const [auspostSatchelTotal, setAuspostSatchelTotal] = useState(0)
  const [basePrice, setBasePrice] = useState(initialBasePrice)
  const [prodList, setProdList] = useState(initialBasePrice)
  const [selectedSuburb, setSelectedSuburb] = useState(initSuburb)
  const [showManualEntryFrm, setShowManualEntryFrm] = useState(false)

  useEffect(() => {}, [
    productInfo,
    selectedSuburb,
    basePrice,
    hunterExpressTotal,
    sandleWCbmTotal,
    sandleNoCbmTotal,
    auspostEparcelTotal,
    auspostSatchelTotal,
    showManualEntryFrm,
    wizMeTotal,
    wizMeCostWdeadWeight
  ])

  const calculateShippingCost = async () => {
    const { l, w, h, weight, postcode, suburb } = productInfo
    const roundedWeight = Math.ceil(weight)

    let cbm = true
    const dataToCsv = {
      postcode,
      suburb
    }

    const argsForApi = { width: w, height: h, depth: l, weight }

    //SANDLE PRICING WITH CBM
    getSandleRateFromApi(argsForApi, dataToCsv, cbm)
      .then(price => {
        setSandleWCbmTotal(price)
      })
      .catch(error => console.log(error))

    //SENDLE PRICING WITHOUT CBM
    getSandleRateFromApi(argsForApi, dataToCsv, (cbm = false)).then(price => {
      setsandleNoCbmTotal(price)
    })

    //Get eparcel cost
    const eparcelCost = (await calculateEparcel(postcode, roundedWeight)) || 0
    setAuspostEparcelTotal(eparcelCost.toFixed(2))

    const cubicLiter = (l * w * h) / 1000 // cm to Liter
    const cubicWeight = ((l * w * h) / 1000000) * 250 //changing cm cubic to weight cubic

    //Get WizMe cost
    const wizMeCost = await calculateWizMeBusinessRate({
      postcode,
      suburb,
      weight,
      cubicLiter,
      isDeadWeightOnly: false
    })
    setWizMeTotal(wizMeCost || 0)

    //Get WizMe cost width dead weight only
    const wizMeCostWdeadWeight = await calculateWizMeBusinessRate({
      postcode,
      suburb,
      weight,
      cubicLiter,
      isDeadWeightOnly: true
    })
    setWizMeCostWdeadWeight(wizMeCostWdeadWeight || 0)

    //Get Sactchell cost
    const satchelCost = await calculateSatchel(roundedWeight, cubicWeight)
    setAuspostSatchelTotal(
      typeof satchelCost === 'number' ? satchelCost.toFixed(2) : satchelCost
    )

    const hunterExpressCost = await calculateHunterExpress({
      weight,
      cubicWeight,
      basePrice
    })
    setHunterExpressTotal(hunterExpressCost)
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

  const handleManulEntryFrm = () => {
    setShowManualEntryFrm(!showManualEntryFrm)
  }

  const handleOnChangeManualProduct = e => {
    e.preventDefault()

    const { name, value } = e.target

    setProductInfo({
      ...productInfo,
      [name]: value
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
        wizMeTotal={wizMeTotal}
        wizMeCostWdeadWeight={wizMeCostWdeadWeight}
        handleManulEntryFrm={handleManulEntryFrm}
        showManualEntryFrm={showManualEntryFrm}
        handleOnChangeManualProduct={handleOnChangeManualProduct}
      />
    </div>
  )
}

export default Calculator
