import React from 'react'

const CustomeForm = ({
  productInfo,
  handleOnChange,
  handleProductSearch,
  prodList,
  handleSelectProd,
  handleOnPostcodeChange,
  selectedSuburb,
  calculateShippingCost,
  hunterExpressTotal,
  egoTotal,
  sandleWCbmTotal,
  sandleNoCbmTotal,
  auspostEparcelTotal
}) => {
  const { sku, weight, postcode } = productInfo
  const { lists, zone } = selectedSuburb

  return (
    <div width="50%">
      <form>
        <div className="form-row">
          <div className="form-group col-md-6  text-white ">
            <label htmlFor="sku">SKU</label>
            <input
              type="text"
              className="form-control"
              name="sku"
              required
              onChange={handleProductSearch}
              value={sku}
              placeholder="Search product name"
            />
            {prodList.length ? (
              <ul
                className="prod-list list-group text-dark"
                style={{ zIndex: 99 }}
              >
                {prodList.map(
                  (row, i) =>
                    i < 6 && (
                      <li
                        key={i}
                        className="list-group-item"
                        onClick={() => handleSelectProd(row)}
                        style={{ cursor: 'pointer' }}
                      >
                        {row.title}
                      </li>
                    )
                )}
              </ul>
            ) : (
              ''
            )}
          </div>
          <div className="form-group col-md-6  text-white">
            <label htmlFor="weight">Chargable Weight</label>
            <input
              type="text"
              className="form-control"
              name="weight"
              value={weight}
              onChange={handleOnChange}
              readOnly
              disabled
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-5 text-white ">
            <label htmlFor="postcode">Postcode</label>
            <input
              type="number"
              className="form-control"
              name="postcode"
              value={postcode}
              onChange={handleOnChange}
              onBlur={handleOnPostcodeChange}
              placeholder="i.e. 2000"
              max="9999"
              required
            />
          </div>
          <div className="form-group col-md-5 text-white">
            <label htmlFor="suburb">Suburb</label>
            <select
              className="form-control"
              name="suburb"
              onChange={handleOnChange}
              required
            >
              <option value=""></option>
              {Object.keys(lists).length &&
                Object.keys(lists).map((key, i) => (
                  <option key={i} value={lists[key]}>
                    {key}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group col-md-2 text-white">
            <label htmlFor="zone">Zone</label>
            <input
              type="number"
              className="form-control"
              name="zone"
              onChange={handleOnChange}
              value={zone}
              disabled
              required
            />
          </div>
        </div>
        <div
          className="btn btn-block btn-primary"
          onClick={calculateShippingCost}
        >
          Calculate
        </div>
        <hr />
        <div className="result text-white" style={{ fontSize: '20px' }}>
          Shipping cost:
          <hr />
          Auspost eParcel = ${auspostEparcelTotal} <br />
          Auspost Satchell = 0 <br />
          Courier Please = 0 <br />
          Sandle with CBM = ${sandleWCbmTotal} <br />
          Sandle without CBM = ${sandleNoCbmTotal} <br />
          Hunter express = ${hunterExpressTotal} <br />
          Ego = ${egoTotal}
        </div>
      </form>
    </div>
  )
}

export default CustomeForm
