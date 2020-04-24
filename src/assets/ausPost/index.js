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
