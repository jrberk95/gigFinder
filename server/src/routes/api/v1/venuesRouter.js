import express from "express"
import { Venue } from "../../../models/index.js"
import { ValidationError } from "objection"

const venuesRouter = new express.Router()

venuesRouter.post("/", async (req, res) => {
    const userId = req.user.id
    try {
        const formInput = req.body
        formInput.userId = userId
        const newVenue = await Venue.query().insertAndFetch(formInput)
        return res.status(200).json({ venue: newVenue })
    } catch (err) {
        if (err instanceof ValidationError) {
            res.status(422).json({ errors: err.data })
        } else {
            return res.status(500).json({ errors: err })
        }
    }
})

venuesRouter.get("/:id", async (req, res) => {
    const venueId= req.params.id
    try {
        const venue = await Venue.query().findOne({id: venueId})
        return res.status(200).json({ venue: venue })
    } catch (err) {
        return res.status(500).json({ errors: err })
    }
})

venuesRouter.get("/", async (req, res) => {
    const currentUser = req.user.id
    try {
        const allVenues = await Venue.query().where({ userId: currentUser })
        return res.status(200).json({ venues: allVenues })
    } catch (err) {
        return res.status(500).json({ errors: err })
    }
})

export default venuesRouter