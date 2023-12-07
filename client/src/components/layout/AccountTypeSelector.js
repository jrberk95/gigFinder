import React, { useState } from "react"
import { Link } from "react-router-dom"

const AccountTypeSelector = (props) => {
    if (props.user.role) {
        location.href = "/profile"
    }

    return (
        <div className="grid-x grid-margin-x">
            <h1 className="cell page-header">What type of account would you like to create?</h1>
            <div className="cell centered">
                <Link to="/artist-profile/edit" className="button-79 profile-button">Artist Account</Link>
                <Link to="/venue-profile/edit" className="button-79 profile-button">Venue Owner/Manager Account</Link>
            </div>
        </div>
    )
}

export default AccountTypeSelector