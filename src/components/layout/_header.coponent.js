import Head from 'next/head'
import Link from 'next/link'

const Header = () => {
  return (
    <header className="container">
      <Head>
        <title>Shipping calculator</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
          crossOrigin="anonymous"
        />
      </Head>
      <nav className="navbar navbar-expand-lg navbar-light bg-primary text-light">
        <a className="navbar-brand" href="#!">
          HEC
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              {/* <Link className="nav-link" to="/">
                Home <span className="sr-only">(current)</span>
              </Link> */}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}
export default Header
