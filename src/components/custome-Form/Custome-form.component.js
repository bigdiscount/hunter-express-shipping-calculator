import React from 'react'

const CustomeForm = ({
  productInfo,
  handleOnChange,
  handleProductSearch,
  prodList,
  handleSelectProd,
  showList,
  totalCost = 0
}) => {
  const { sku, weight, type, postcode, suburb, zone } = productInfo
  console.log(productInfo)
  return (
    <div width="50%">
      <form>
        <div className="form-row">
          <div className="form-group col-md-5">
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
            {showList.product && prodList.length && (
              <ul className="prod-list list-group" style={{ zIndex: 99 }}>
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
            )}
          </div>
          <div className="form-group col-md-5">
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
          <div className="form-group col-md-2">
            <label htmlFor="type">Type</label>

            <select
              className="form-control"
              name="type"
              onChange={handleOnChange}
              required
            >
              <option value=""></option>
              <option value="fixed">Fixed</option>
              <option value="weight">Weight</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-5">
            <label htmlFor="postcode">Postcode</label>
            <input
              type="number"
              className="form-control"
              id="postcode"
              value={postcode}
              onChange={handleOnChange}
              placeholder="i.e. 2000"
              required
            />
          </div>
          <div className="form-group col-md-5">
            <label htmlFor="suburb">Suburb</label>
            <input
              type="text"
              className="form-control"
              name="suburb"
              value={suburb}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="form-group col-md-2">
            <label htmlFor="zone">Zone</label>
            <input
              type="number"
              className="form-control"
              name="zone"
              value={zone}
              onChange={handleOnChange}
              readOnly
              disabled
              required
            />
          </div>
        </div>
        <div className="result text-white">
          Total shipping cost = ${totalCost && totalCost}
        </div>
      </form>
    </div>
  )
}

export default CustomeForm
