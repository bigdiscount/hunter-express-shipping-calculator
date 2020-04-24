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

For the hunter express zone guide, use in xls file ="{sku:"&A2&",title:"&A2&" "&B2&",weight:"&C2&",l:"&D2&",w:"&E2&",h:"&F2&"},"

For the Auspost price guide ="'"&A2&"':{'<500g':"&C2&",'<25kg-1':"&D2&",'<25kg-2':"&E2&",perKg:"&F2&"},"
For the Austpost zone guide
