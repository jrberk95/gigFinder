import React, { useState } from "react"
import { Link } from "react-router-dom"

const AccountTypeSelector = (props) => {
    if (props.user.role) {
        location.href = "/profile"
    }

    return (
        <>
            <h1>What type of account would you like to create?</h1>
            <Link to="/artist-profile/edit" className="button">Artist Account</Link>
            <Link to="/venue-profile/edit" className="button">Venue Owner/Manager Account</Link>
        </>
    )
}

export default AccountTypeSelector