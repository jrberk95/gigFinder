import React, { useState } from "react"
import FormError from "./FormError"
import translateServerErrors from "../../services/translateServerErrors"
import ErrorList from "./ErrorList"

const NewVenueForm = (props) => {
    const [formInput, setFormInput] = useState({
        name: "",
        location: "",
        capacity: "",
        category: ""
    })
    const [errors, setErrors] = useState({})
    const [serverErrors, setServerErrors] = useState({})
    const [shouldRedirect, setShouldRedirect] = useState(false)
    const [newVenue, setNewVenue] = useState({})

    const validateInput = (payload) => {
        setErrors({})
        const { name, location, capacity, category } = payload
        let newErrors = {}

        if (name.trim() == "") {
            newErrors = {
                ...newErrors,
                name: "is required"
            }
        }
        if (location.trim() == "") {
            newErrors = {
                ...newErrors,
                location: "is required"
            }
        }
        if (capacity.trim() == "") {
            newErrors = {
                ...newErrors,
                capacity: "is required"
            }
        }
        if (category.trim() == "") {
            newErrors = {
                ...newErrors,
                category: "is required"
            }
        }
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
        return true
        }
        return false
    }

    const handleInputChange = (event) => {
        setFormInput({
            ...formInput,
            [event.currentTarget.name]: event.currentTarget.value
        })
    }

    const addVenue = async (event) => {
        event.preventDefault()
        if(validateInput(formInput)) {
            try {
                if (Object.keys(errors).length === 0) {
                    const response = await fetch("/api/v1/venues", {
                        method: "POST",
                        headers: new Headers({"Content-Type": "application/json"}),
                        body: JSON.stringify(formInput)
                    })
                    if (!response.ok) {
                        if (response.status === 422) {
                            const body = await response.json();
                            const newServerErrors = translateServerErrors(body.errors)
                            return setServerErrors(newServerErrors)
                        }
                        const errorMessage = `${response.status} (${response.statusText})`;
                        const error = new Error(errorMessage);
                        throw error;
                    }
                    const venueData = await response.json();
                    setNewVenue(venueData.venue)
                    setShouldRedirect(true)
                }
            } catch (err) {
                console.log("Error in fetch:", err.message)
            }
        }
    }

    if (shouldRedirect) {
        location.href = `/venues/${newVenue.id}`
    }

    return (
        <div className="grid-xy form">
            <h1 className="text-center cell">Create a new venue</h1>
            <ErrorList errors={serverErrors} />
            <form onSubmit={addVenue}>
                <div className="cell">
                    <div className="cell large-12 columns">
                    <label>Venue name:
                        <input type="text" name="name" value={formInput.name} onChange={handleInputChange}></input>
                        <FormError error={errors.name} />
                    </label>
                    </div>
                </div>
                <label>Location:
                    <input type="text" name="location" value={formInput.location} onChange={handleInputChange}></input>
                    <FormError error={errors.location} />
                </label>
                <label>Capacity:
                    <input type="number" name="capacity" value={formInput.capacity} onChange={handleInputChange}></input>
                    <FormError error={errors.capacity} />
                </label>
                <label>Category
                    <select name="category" value={formInput.category} onChange={handleInputChange}>
                        <option></option>
                        <option>Indoor Concert Venue</option>
                        <option>Outdoor Concert Venue</option>
                        <option>Wedding Venue</option>
                        <option>Restaurant/Bar</option>
                    </select>
                    <FormError error={errors.category} />
                </label>
                <input type="submit" value="Add new venue" className="button-smaller button-79 button-smaller"></input>
            </form>
        </div>
    )
}

export default NewVenueForm