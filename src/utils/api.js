import axios from 'axios'

export const getEgoRate = async (argsForApi = {}, dataToCsv = {}) => {
  const { postcode, suburb } = dataToCsv
  const DPostcode = postcode < 1000 ? '0' + postcode : postcode

  const { width, height, depth, weight } = argsForApi
  return new Promise(async (resolve, reject) => {
    const endpoing = `http://www.e-go.com.au/calculatorAPI2?pickuppostcode=2036&pickupsuburb=Matraville&deliverypostcode=${DPostcode}&deliverysuburb=${suburb}&width=${width}&height=${height}&depth=${depth}&weight=${weight}`
    let price = 25

    try {
      const result = await axios.get(endpoing, {
        headers: {
          connection: 'keep-alive'
        }
      })
      if (result.status === 200 && result.data.startsWith('error=OK')) {
        const val = result.data.split('\n')
        price = Math.ceil(val[2].split('=')[1])
      }
      resolve(price)
    } catch (error) {
      // console.error(error, postcode, suburb)
      resolve(price)
    }
  })
}

export const getSandleRate = async (argsForApi = {}, dataToCsv = {}, cbm) => {
  const { postcode, suburb } = dataToCsv
  const DPostcode = postcode < 1000 ? '0' + postcode : postcode

  const { width, height, depth, weight } = argsForApi
  const volumn = (width * height * depth) / 1000000

  const endpoing_with_cbm = `https://api.sendle.com/api/quote?pickup_suburb=matraville&pickup_postcode=2036&pickup_country=AU&delivery_suburb=${suburb}&delivery_postcode=${DPostcode}&delivery_country=AU&weight_value=${weight}&weight_units=kg&volume_value=${volumn}&volume_units=m3&plan_name=Easy`

  const endpoing_without_cbm = `https://api.sendle.com/api/quote?pickup_suburb=matraville&pickup_postcode=2036&pickup_country=AU&delivery_suburb=${suburb}&delivery_postcode=${DPostcode}&delivery_country=AU&weight_value=${weight}&weight_units=kg&volume_value=0.001&volume_units=m3&plan_name=Easy`

  const endpoing = cbm ? endpoing_with_cbm : endpoing_without_cbm
  return new Promise(async (resolve, reject) => {
    let price = 25

    try {
      const result = await axios.get(endpoing, {
        headers: {
          connection: 'keep-alive',
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })

      if (result && result.status === 200 && result.data.length) {
        price = result.data[0].quote.gross.amount
      }
      resolve(price)
    } catch (error) {
      // console.error(error.message, postcode, suburb)
      resolve(price)
    }
  })
}
