const Model = require ("./Model.js")

class Application extends Model {
    static get tableName() {
        return "applications"
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: [ "userId", "gigId", "hired" ],
            properties: {
                userId: { type: "integer" },
                gigId: { type: "integer" },
                hired: { type: "boolean" }
            }
        }
    }

    static get relationMappings() {
        const { User, Gig } = require("./index.js")
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "applications.userId",
                    to: "users.id"
                }
            },
            gig: {
                relation: Model.BelongsToOneRelation,
                modelClass: Gig,
                join: {
                    from: "applications.gigId",
                    to: "gigs.id"
                }
            }
        }
    }
}

module.exports = Application