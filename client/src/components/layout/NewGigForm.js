import React, { useState } from "react"

const NewGigForm = (props) => {

    const [formInput, setFormInput] = useState({
        name: "",
        date: "",
        type: "",
        rate: "",
    })

    const handleInputChange = (event) => {
        setFormInput({
            ...formInput,
            [event.currentTarget.name]: event.currentTarget.value
        })
    } 

    console.log(formInput)

    return (
        <div className="form">
            <h2>Add a new gig</h2>
            <form>
                <label>Name:
                    <input type="text" onChange={handleInputChange} value={formInput.name}/>
                </label>
                <label>Date:
                    <input type="text" onChange={handleInputChange} value={formInput.date}/>
                </label>
                <label>Type:
                    <input type="text" onChange={handleInputChange} value={formInput.type}/>
                </label>
                <label>Rate:
                    <input type="text" onChange={handleInputChange} value={formInput.rate}/>
                </label>
            </form>
        </div>
    )
}

export default NewGigForm