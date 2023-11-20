import React, { useState, useEffect } from "react"

const VenueTile = (props) => {

    const {id, name, location, capacity, category} = props.venue

    return (
        <div key={id}>
            <h3>{name}</h3>
            <h5>{location}</h5>
            <ul>
                <li>{capacity}</li>
                <li>{category}</li>
            </ul>
        </div>
    )
}

export default VenueTile