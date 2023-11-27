import express from "express"
import { Gig } from "../../../models/index.js"
import { ValidationError } from "objection"

const gigsRouter = new express.Router()

gigsRouter.post("/", async (req, res) => {
    try {
        const newGig = await Gig.query().insertAndFetch(req.body.formInput)
        return res.status(200).json({ gig: newGig })
    } catch (err) {
        if (err instanceof ValidationError) {
            return res.status(422).json({ errors: err.data });
        } else {
            return res.status(500).json({ errors: err })
        }
    }
})

export default gigsRouter