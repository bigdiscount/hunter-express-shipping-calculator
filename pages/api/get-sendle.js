// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'

export default async (req, res) => {
  const { DPostcode, suburb, weight, volumn } = req.body.info

  const endpoint = `https://api.sendle.com/api/quote?pickup_suburb=matraville&pickup_postcode=2036&pickup_country=AU&delivery_suburb=${suburb}&delivery_postcode=${DPostcode}&delivery_country=AU&weight_value=${weight}&weight_units=kg&volume_value=${volumn}&volume_units=m3&plan_name=Premium`

  try {
    const result = await axios.get(endpoint)
    if (result.data.length) {
      const price = result.data[0].quote.gross.amount
      return res.send({ status: 'success', price })
    }
    res.send({ status: 'error', message: 'No price is available!' })
  } catch (error) {
    res.send({ status: 'error', message: error.message })
  }
}
