import axios from 'axios'

export const getEgoRate = async (argsForApi = {}, dataToCsv = {}) => {
  const { postcode, suburb } = dataToCsv
  const DPostcode = postcode < 1000 ? '0' + postcode : postcode

  const { width, height, depth, weight } = argsForApi
  return new Promise(async (resolve, reject) => {
    const endpoing = `https://www.e-go.com.au/calculatorAPI2?pickuppostcode=2036&pickupsuburb=Matraville&deliverypostcode=${DPostcode}&deliverysuburb=${suburb}&width=${width}&height=${height}&depth=${depth}&weight=${weight}`
    let price = 'na'

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
      console.log(error.message)
      resolve(price)
    }
  })
}

// export const getSandleRate = async (argsForApi = {}, dataToCsv = {}, cbm) => {
//   const { width, height, depth, weight } = argsForApi
//   const volumn = (width * height * depth) / 1000000

//   const { postcode, suburb } = dataToCsv
//   const DPostcode = postcode < 1000 ? '0' + postcode : postcode

//   const endpoing_with_cbm = `https://api.sendle.com/api/quote?pickup_suburb=matraville&pickup_postcode=2036&pickup_country=AU&delivery_suburb=${suburb}&delivery_postcode=${DPostcode}&delivery_country=AU&weight_value=${weight}&weight_units=kg&volume_value=${volumn}&volume_units=m3&plan_name=Easy`

//   const endpoing_without_cbm = `https://api.sendle.com/api/quote?pickup_suburb=matraville&pickup_postcode=2036&pickup_country=AU&delivery_suburb=${suburb}&delivery_postcode=${DPostcode}&delivery_country=AU&weight_value=${weight}&weight_units=kg&volume_value=0.001&volume_units=m3&plan_name=Easy`

//   const endpoing = cbm ? endpoing_with_cbm : endpoing_without_cbm
//   return new Promise(async (resolve, reject) => {
//     let price = 0
//     if (weight <= 0) {
//       resolve(price)
//     }

//     try {
//       console.log('before fetching')
//       axios
//         .get(endpoing, {
//           headers: {
//             'Content-Type': 'application/json; charset=utf-8',
//             Connection: 'keep-alive'
//           }
//         })
//         .then(result => {
//           console.log('after fetching', result)
//           if (result && result.status === 200 && result.data.length) {
//             price = result.data[0].quote.gross.amount
//           }
//           resolve(price)
//         })
//     } catch (error) {
//       console.error(error)
//       resolve(price)
//     }
//   })
// }

export const getSandleRateFromApi = async (
  argsForApi = {},
  dataToCsv = {},
  cbm
) => {
  const { width, height, depth, weight } = argsForApi
  const volumn = (width * height * depth) / 1000000

  const { postcode, suburb } = dataToCsv
  const DPostcode = postcode < 1000 ? '0' + postcode : postcode

  // const endpoing = 'http://localhost:8001/api/sendle'
  // const endpoing = 'https://sendle-shipping-cost-api.bigdiscount.now.sh/'
  const endpoing = '/api/get-sendle'
  return new Promise(async (resolve, reject) => {
    let price = 0
    if (weight <= 0) {
      resolve(price)
    }

    try {
      const result = await axios.post(endpoing, {
        info: {
          DPostcode,
          suburb,
          weight,
          volumn: cbm ? volumn : 0.01
        }
      })

      if (result && result.status === 200 && result.data.status === 'success') {
        price = result.data.price
      }
      resolve(price)
    } catch (error) {
      console.error(error)
      resolve(price)
    }
  })
}
export const getAuspostEparcelRate = async (
  argsForApi = {},
  dataToCsv = {}
) => {
  const { postcode } = dataToCsv
  const DPostcode = postcode < 1000 ? '0' + postcode : postcode

  const { width, height, depth, weight } = argsForApi

  const endpoing = `https://digitalapi.auspost.com.au/postage/parcel/domestic/calculate.json?length=${depth}&width=${width}&height=${height}&weight=${weight}&from_postcode=2036&to_postcode=${DPostcode}&service_code=AUS_PARCEL_REGULAR`

  return new Promise(async (resolve, reject) => {
    let price = 'na'

    try {
      const result = await axios.get(endpoing, {
        headers: {
          'AUTH-KEY': 'ae1ad480-d2c3-476a-8cba-15bc16cbbfbf'
        }
      })

      if (result && result.status === 200 && result.data) {
        price = result.data.postage_result.total_cost
      }
      resolve(price)
    } catch (error) {
      console.log(error.message)
      resolve(price)
    }
  })
}
