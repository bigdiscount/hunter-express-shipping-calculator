import { wizMeZoneBusinessRate } from '../assets/wizMeZoneRate'
import { wizMeZone } from '../assets/wizMeZoneGuide'

const getWizMeZone = postcodeSuburb =>
  new Promise(resolve => {
    if (!postcodeSuburb) {
      return false
    }
    const zone = wizMeZone[postcodeSuburb]
    resolve(zone)
  })

const getWizMeZoneBusienssRate = cubWeight =>
  new Promise(resolve => {
    if (!cubWeight) {
      resolve(false)
    }
    const rates = wizMeZoneBusinessRate[cubWeight]
    resolve(rates)
  })

const setZoneCode = zoneCode => {
  if (!zoneCode) return false

  const destinationCode = zoneCode.split('-')[1] || 'Nothing'

  if (destinationCode.includes('XX')) return false

  if (destinationCode.includes('X')) return 'OC'

  if (destinationCode.includes('C')) return 'C2C'

  if (destinationCode.includes('D')) return 'C2C'

  return 'SC'
}

const getWizMeWeightCategory = ({ weight, cubicLiter }) => {
  if (weight <= 0.5 && cubicLiter <= 2) {
    return '50g/2L'
  }

  if (weight <= 1 && cubicLiter <= 4) {
    return '1kg/4L'
  }

  if (weight <= 2 && cubicLiter <= 8) {
    return '2kg/8L'
  }

  if (weight <= 3 && cubicLiter <= 12) {
    return '3kg/12L'
  }

  if (weight <= 5 && cubicLiter <= 20) {
    return '5g/20L'
  }

  if (weight <= 13 && cubicLiter <= 52) {
    return '13kg/52L'
  }

  return '25kg/100L'
}

export const calculateWizMeBusinessRate = ({
  postcode,
  suburb,
  weight,
  cubicLiter
}) =>
  new Promise(async resolve => {
    let price = 0
    if (!postcode || !suburb) {
      resolve(price)
    }
    const weightCategory = getWizMeWeightCategory({ weight, cubicLiter })
    const rates = await getWizMeZoneBusienssRate(weightCategory)

    const zone = await getWizMeZone(`${postcode}-${suburb}`)
    const priceCode = await setZoneCode(zone)

    price = !priceCode ? 'No Delivery' : rates[priceCode] || 0
    resolve(price)
  })

export const calculateHunterExpress = ({ weight, cubicWeight, basePrice }) => {
  return new Promise(resolve => {
    let chargableWeigth = weight > cubicWeight ? weight : cubicWeight
    chargableWeigth = Math.ceil(chargableWeigth)
    const baseAllowWeight = 25
    const packageCount = Math.ceil(chargableWeigth / baseAllowWeight)
    const baseCost = basePrice.fb + basePrice.sb * (packageCount - 1)

    const total = baseCost * basePrice.fuel * basePrice.gst
    resolve(total.toFixed(2))
  })
}
