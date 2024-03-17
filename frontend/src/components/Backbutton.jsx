// import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Backbutton = ({destination='/'}) => {
  return (
    <Link to={destination}>
        <button>x- Back</button>
    </Link>
  )
}

Backbutton.propTypes = {
    destination: PropTypes.string,
}

export default Backbutton;