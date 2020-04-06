import React from 'react'
import Header from './_header.coponent'

const Layout = ({ children }) => {
  return (
    <>
      <div className="bg-primary">
        <Header />
      </div>
      <div className="container">{children}</div>
    </>
  )
}

export default Layout
