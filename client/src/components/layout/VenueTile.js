import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const VenueTile = (props) => {
    const {id, name, location, capacity, category} = props.venue
    return (
        <div key={id} className="artist-tile cell medium-4 auto">
            <Link to={`/venues/${id}`} className='tile-header'>{name}</Link>
            <h5>{location}</h5>
            <p>Capacity: {capacity}</p>
            <p>Category: {category}</p>
        </div>
    )
}

export default VenueTile