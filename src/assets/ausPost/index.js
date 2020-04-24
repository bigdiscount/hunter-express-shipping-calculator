import { auspostZone } from './postcodeZone'
import { auspostPrice } from './priceGuid'

export const calculateEparcel = (postcode, weight) => {
  return new Promise(resolve => {
    let zone = auspostZone[+postcode]

    const rateInfo = auspostPrice[zone]

    const { baseSmall = 0, base1 = 0, base2 = 0, perKg = 0 } = rateInfo
    if (weight < 0.5) {
      resolve(baseSmall)
    }
    const totalCost = base1 + weight * perKg
    resolve(totalCost)
  })
}

const afterDiscount = 0.85 //15% didscount

const smallSatchelCost = 8.95 * afterDiscount
const cubicWeightSmall = 0.616

const mediumSatchelCost = 12.2 * afterDiscount
const cubicWeightMedium = 1.368

const largeSatchelCost = 15.35 * afterDiscount
const cubicWeightLarge = 3.822

const xlargeSatchelCost = 18.5 * afterDiscount
const cubicWeightXLarge = 5.12

const maxWeight = 5 //kg
const smallWeight = 0.5

export const calculateSatchel = (deadWeight, cubicWeight) => {
  return new Promise(resolve => {
    if (deadWeight <= smallWeight && cubicWeight <= cubicWeightSmall) {
      resolve(smallSatchelCost)
    } else if (deadWeight <= maxWeight) {
      let cost = 'Invalid Size'
      cost = cubicWeight <= cubicWeightXLarge && xlargeSatchelCost
      cost = cubicWeight <= cubicWeightLarge && largeSatchelCost
      cost = cubicWeight <= cubicWeightMedium && mediumSatchelCost
      resolve(cost)
    } else {
      resolve('Invalid Size')
    }
  })
}
