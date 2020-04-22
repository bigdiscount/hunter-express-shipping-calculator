# hunter-express-shipping-calculator

This app calculates the shipping cost for the hunter express courier.

## How to run

run `npm start`

## Deploy

Url: https://hunter-express.now.sh/
run `now --prod` to deploy app from project console.

## Price calculation

he formula to work out the cost is 1st carton rate +18% Fuel Levy+10% GST

Or 1st carton rate + (total carton Qty-1)\*2nd carton rate +18% Fuel Levy+10% GST

The weight is 25KG inclusive (dead weight or cubic weight ,whichever is higher )

If over 25KG , 2ND carton rate apply

## product file to object

use in xls file ={sku:'BD-Ankle_Weight-2kg',title:'2kg Ankle Weight Wrist Power Strap Exercise',weight:,l:,w:,h:},
