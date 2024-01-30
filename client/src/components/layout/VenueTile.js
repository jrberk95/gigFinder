import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const VenueTile = (props) => {
    const {id, name, location, capacity, category} = props.venue
    return (
        <div key={id} className="artist-tile cell medium-4 small-12 auto">
            <Link to={`/venues/${id}`} className='tile-header bump-down'>{name}</Link>
            <h5>{location}</h5>
            <span className="tile-pic">Capacity: {capacity}</span>
            <span>Category: {category}</span>
        </div>
    )
}

export default VenueTile