import { Gig, Venue } from "../../models/index.js"

class GigSeeder {
    static async seed() {
        const brightonMusicHall = await Venue.query().findOne({ name: "Brighton Music Hall" })
        const houseOfBlues = await Venue.query().findOne({ name: "House of Blues" })
        const gigData = [
            {
                name: "90s Cover Band Night",
                date: "2024-01-23",
                size: "400",
                rate: "",
                type: "public",
                venueId: brightonMusicHall.id
            },
            {
                name: "Opener Needed - All Time Low",
                date: "2024-02-15",
                size: "600",
                rate: "1000",
                type: "public",
                venueId: brightonMusicHall.id
            },
            {
                name: "Opener Needed - All Time Low",
                date: "2024-02-15",
                size: "600",
                rate: "1000",
                type: "public",
                venueId: brightonMusicHall.id
            },
            {
                name: "Sofar Sounds Concert",
                date: "2024-03-11",
                size: "25",
                rate: "500",
                type: "public",
                venueId: brightonMusicHall.id
            },
            {
                name: "Company Kickoff",
                date: "2024-02-15",
                size: "2000",
                rate: "7500",
                type: "private",
                venueId: houseOfBlues.id
            },
        ]

        for (const gig of gigData) {
            const currentGig = await Gig.query().findOne({ name: gig.name })
            if (!currentGig) {
                await Gig.query().insert(gig)
            }
        }
    }
}

export default GigSeeder