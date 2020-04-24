const auspostZone = [
  {
    N1:
      '1000-1935, 2000-2079, 2085-2107, 2109-2156, 2158, 2160-2172, 2174-2229, 2232-2249, 2557-2559, 2564-2567, 2740-2744, 2747-2751, 2759-2764, 2766-2774, 2776-2777, 2890-2897'
  },
  {
    V1: '3000-3062, 3064-3098, 3101-3138, 3140-3210, 3800-3801, 8000-8999, 9999'
  },
  {
    Q1:
      '4000-4018, 4029-4068, 4072-4123, 4127-4129, 4131-4132, 4151-4164, 4169-4182, 4205-4206, 9000-9725'
  },
  { S1: '5000-5113, 5115-5117, 5125-5130, 5158-5169, 5800-5999' },
  {
    W1:
      '6000-6030, 6036, 6050-6066, 6069, 6076, 6090-6110, 6112-6120, 6147-6160, 6162-6175, 6180, 6182-6206, 6210, 6800-6990, 6992-6996'
  },
  {
    T1: '7000-7019, 7050-7053, 7055-7108, 7172, 7248-7254, 7258-7329, 7800-7999'
  },
  {
    N1:
      '2080-2084, 2108, 2157, 2159, 2173, 2230-2231, 2508-2514, 2555-2556, 2560-2563, 2568-2574, 2745-2746, 2752-2758, 2765, 2775, 2778-2786'
  },
  { GF: '2250-2263' },
  { WG: '2500-2507, 2515-2532' },
  { NC: '2282-2310' },
  { CB: '200-299, 2600-2620, 2900-2920' },
  {
    N2:
      '2264-2281, 2311-2484, 2487-2499, 2533-2554, 2575-2599, 2621-2639, 2642-2647, 2649-2707, 2710-2714, 2716, 2720-2730, 2787-2879'
  },
  {
    V1:
      '3063, 3099-3100, 3139, 3335-3341, 3427-3443, 3750-3799, 3802-3811, 3910-3920, 3926-3944, 3975-3978, 3980-3983'
  },
  { GL: '3211-3220' },
  { BR: '3350, 3353-3356' },
  {
    V2:
      '2648, 2715, 2717-2719, 2731-2739, 3221-3334, 3342-3349, 3351-3352, 3357-3426, 3444-3688, 3691-3749, 3812-3909, 3921-3925, 3945-3974, 3979, 3984-3999'
  },
  {
    Q1:
      '4019-4028, 4069-4071, 4124-4126, 4130, 4133-4150, 4165-4168, 4183-4204, 4207-4209, 4270-4299, 4500-4549'
  },
  { GC: '4210-4224, 4226-4269, 9726-9919' },
  { SC: '4550-4579' },
  { IP: '4300-4308' },
  { Q2: '4309-4453, 4580-4693' },
  { Q3: '4454-4499, 4694-4802, 4804-4805, 9920-9960' },
  { Q4: '4803, 4806-4999, 9961-9998' },
  { S1: '5114, 5118-5124, 5131-5157, 5170-5200' },
  { S2: '2880-2889, 5201-5749' },
  {
    W1:
      '6031-6035, 6037-6049, 6067-6068, 6070-6075, 6077-6089, 6111, 6121-6146, 6161, 6176-6179, 6181, 6207-6209, 6211-6214, 6991, 6997-6999'
  },
  { W2: '6215-6700' },
  { W3: '6701-6797' },
  { W4: '6798-6799' },
  {
    T1: '7020-7049, 7054, 7109-7150, 7155-7171, 7173-7247, 7255-7257, 7330-7799'
  },
  {
    NT1:
      '800-802, 804-821, 828-851, 853-853, 860-861, 870-871, 873-879, 906-999'
  },
  { NT2: '803-803, 822-827, 852-852, 854-859, 862-869, 872-872, 880-905' },
  { NF: '2898-2899' },
  { AAT: '7151-7154' },
  { N3: '1936-1999, 2640-2641, 2708-2709' },
  { V3: '3689-3690' },
  { N4: '2485-2486' },
  { Q5: '4225' }
]

const makeStr = () => {
  return new Promise(reslove => {
    let str = ''
    for (let i = 0; i < auspostZone.length; i++) {
      const row = auspostZone[i]
      const key = Object.keys(row)
      const val = row[key].split(',')

      for (let j = 0; j < val.length; j++) {
        const postcodeRang = val[j].split('-')
        const start = +postcodeRang[0]
        const end = +postcodeRang[1]

        if (isNaN(end)) {
          str += `${start.toString()}: "${key}",`
          continue
        }

        for (let k = start; k <= end; k++) {
          str += `${k}: "${key}",`
        }
      }
      if (i === auspostZone.length - 1) {
        reslove(str)
      }
    }
  })
}

makeStr()
  // .then(data => console.log(data))
  .then(data => {
    console.log(data)
  })
  .catch(error => console.log(error))
