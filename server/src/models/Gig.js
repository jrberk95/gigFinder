const Model = require("./Model.js")

class Gig extends Model {
    static get tableName() {
        return 'gigs'
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["name", "date"],
            properties: {
                name: { type: "string" },
                date: { type: "string" },
                rate: { type: ["string", "integer"] },
                type: { type: "string" }
            }
        }
    }

    static get relationMappings() {
        const { Venue, Application, User } = require("./index.js")
        return {
            venue: {
                relation: Model.BelongsToOneRelation,
                modelClass: Venue,
                join: {
                    from: "gigs.venueId",
                    to: "venues.id"
                }
            },
            applications: {
                relation: Model.HasManyRelation,
                modelClass: Application,
                join: {
                    from: "gigs.id",
                    to: "applications.gigId"
                }
            },
            users: {
                relation: Model.ManyToManyRelation,
                modelClass: User,
                join: {
                    from: "gigs.id",
                    through: {
                        from: "applications.gigId",
                        to: "applications.userId"
                    },
                    to: "users.id"
                }
            }
        }
    }
}

module.exports = Gig