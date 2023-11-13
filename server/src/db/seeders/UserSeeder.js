import { User } from "../../models/index.js"

class UserSeeder {
    static async seed() {
        const userData = [
            {
                email: "beane@gmail.com",
                name: "Beane",
                password: "Sympathy",
                primaryLocation: "Los Angeles",
                spotifyLink: "https://open.spotify.com/artist/6OPhoP9klTrNJm9EF0FnRt?si=71hE6OHiRiCSvkAA4Kcv9g",
                role: "artist"
            },
            {
                email: "blb@gmail.com",
                name: "Blue Light Bandits",
                password: "Sarah",
                primaryLocation: "Boston",
                spotifyLink: "https://open.spotify.com/artist/3TqbfOB7nVsw47k3vkL1h6?si=tqT9JyE4SKuj6bcngoDzUQ",
                role: "artist"
            },
            {
                email: "goLo@gmail.com",
                name: "Lowell Oakley",
                password: "#GoLo",
                primaryLocation: "Los Angeles",
                spotifyLink: "https://open.spotify.com/artist/2DMzW9mjVpFXGMK4Ll6Sjq?si=t4E4jEJCTwiEQqSS1TCKBA",
                role: "artist"
            }
        ]
        
        for (const user of userData) {
            const currentUser = await User.query().findOne({ email: user.email })
            if (!currentUser) {
                await User.query().insert(user)
            }
        }
    }
}

export default UserSeeder