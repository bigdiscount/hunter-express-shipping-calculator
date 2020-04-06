import React from 'react'
import Layout from '../layout/layout.component'
import Calculator from '../calculator/calculator.component'
import { grey } from 'color-name'

const Home = () => {
  return (
    <Layout>
      <div className="jumbotron bg-secondary mt-5" style={{ background: grey }}>
        <Calculator />
      </div>
    </Layout>
  )
}

export default Home
