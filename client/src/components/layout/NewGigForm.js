import React, { useState } from "react"
import FormError from "./FormError"
import ErrorList from "./ErrorList"
import translateServerErrors from "../../services/translateServerErrors"

const NewGigForm = (props) => {
    const [formInput, setFormInput] = useState({
        name: "",
        date: "",
        type: "",
        size: "",
        rate: "",
    })

    const [errors, setErrors] = useState({})
    const [serverErrors, setServerErrors] = useState({})
    const [shouldRedirect, setShouldRedirect] = useState(false)

    const handleInputChange = (event) => {
        setFormInput({
            ...formInput,
            [event.currentTarget.name]: event.currentTarget.value
        })
    } 

    const addGig = async (event) => {
        event.preventDefault()
        formInput.venueId = props.computedMatch.params.venueId
        if (validateInput(formInput)) {
            try {
                const response = await fetch("/api/v1/gigs", {
                    method: "POST",
                    headers: new Headers({"Content-Type": "application/json"}),
                    body: JSON.stringify({formInput})
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
                setShouldRedirect(true)
            } catch (err) {
                console.log("Error in fetch", err)
            }
        }
    }

    if (shouldRedirect) {
        location.href=`/venues/${props.computedMatch.params.venueId}`
    }

    const validateInput= (payload) => {
        setErrors({})
        const {name, date, rate, type} = payload
        let newErrors = {}

        if (name.trim() == "") {
            newErrors = {
                ...newErrors,
                name: "is required"
            }
        }
        if (date.trim() == "") {
            newErrors = {
                ...newErrors,
                date: "is required"
            }
        }
        if (type.trim() == "") {
            newErrors = {
                ...newErrors,
                type: "is required"
            }
        }
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            return true
        }
        return false
    }
    

    return (
        <div className="form">
            <h2 className="text-center page-header">Add a new gig</h2>
            <ErrorList errors={serverErrors} />
            <form onSubmit={addGig}>
                <label>Name:
                    <input type="text" name="name" onChange={handleInputChange} value={formInput.name}/>
                    <FormError error={errors.name} />
                </label>
                <label>Date:
                    <input type="date" name="date" onChange={handleInputChange} value={formInput.date}/>
                    <FormError error={errors.date} />
                </label>
                <label>Is this event public or private?
                    <select type="text" name="type" onChange={handleInputChange} value={formInput.type}>
                        <option></option>
                        <option>Public event</option>
                        <option>Private event</option>
                    </select>
                    <FormError error={errors.type} />
                </label>
                <label> How many anticipated attendees?
                    <input type="number" name="size" onChange={handleInputChange} value={formInput.size}/>
                </label>
                <label>Rate:
                    <input type="number" name="rate" onChange={handleInputChange} value={formInput.rate}/>
                </label>
                <input type="submit" value="Add gig" className="button-79 button-smaller"/>
            </form>
        </div>
    )
}

export default NewGigForm