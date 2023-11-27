import { Venue, User } from "../../models/index.js"

class VenueSeeder {
    static async seed() {
        const anders = await User.query().findOne({ name: "Anders Borg" })

        const venueData = [
            {
                name: "Brighton Music Hall",
                location: "Boston, MA",
                capacity: 1500,
                category: "Indoor Music Venue",
                userId: anders.id
            }, 
            {
                name: "Lansdowne",
                location: "Boston, MA",
                capacity: 500,
                category: "Restaurant/Bar",
                userId: anders.id
            }, 
            {
                name: "House of Blues",
                location: "Boston, MA",
                capacity: 10000,
                category: "Indoor Music Venue",
                userId: anders.id
            }
        ]

        for (const venue of venueData) {
            const currentVenue = await Venue.query().findOne({ name: venue.name })
            if (!currentVenue) {
                await Venue.query().insert(venue)
            }
        }
    }
}

export default VenueSeeder