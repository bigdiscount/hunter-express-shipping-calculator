import React from 'react'

const CustomeForm = ({ totalCost }) => {
  return (
    <div width="50%">
      <form>
        <div className="form-row">
          <div className="form-group col-md-5">
            <label for="sku">SKU</label>
            <input type="text" className="form-control" name="sku" required />
          </div>
          <div className="form-group col-md-5">
            <label for="weight">Chargable Weight</label>
            <input
              type="text"
              className="form-control"
              name="weight"
              readOnly
              disabled
              required
            />
          </div>
          <div className="form-group col-md-2">
            <label for="type">Type</label>

            <select className="form-control" name="type" required>
              <option value=""></option>
              <option value="fixed">Fixed</option>
              <option value="weight">Weight</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-5">
            <label for="postcode">Postcode</label>
            <input
              type="number"
              className="form-control"
              id="postcode"
              placeholder="i.e. 2000"
              required
            />
          </div>
          <div className="form-group col-md-5">
            <label for="suburb">Suburb</label>
            <input
              type="text"
              className="form-control"
              name="suburb"
              required
            />
          </div>
          <div className="form-group col-md-2">
            <label for="zone">Zone</label>
            <input
              type="number"
              className="form-control"
              name="zone"
              readOnly
              disabled
              required
            />
          </div>
        </div>
        <div className="result text-white">
          Total shipping cost = ${totalCost}
        </div>
      </form>
    </div>
  )
}

export default CustomeForm
