/* eslint-disable no-console */
import { connection } from "../boot.js"
import UserSeeder from "./seeders/UserSeeder.js"
import VenueSeeder from "./seeders/VenueSeeder.js"
import GigSeeder from "./seeders/GigSeeder.js"

class Seeder {
  static async seed() {
    console.log("seeding users...")
    await UserSeeder.seed()

    console.log("seeding venues...")
    await VenueSeeder.seed()

    console.log("seeding gigs...")
    await GigSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder