import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="container">
      <nav class="navbar navbar-expand-lg navbar-light bg-primary text-light">
        <a class="navbar-brand" href="#!">
          HEC
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <Link class="nav-link" to="/">
                Home <span class="sr-only">(current)</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}
export default Header
