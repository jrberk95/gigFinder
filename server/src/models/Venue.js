const Model = require ("./Model.js")
const unique = require("objection-unique");

const uniqueFunc = unique({
  fields: ["name"],
  identifiers: ["id"],
});

class Venue extends uniqueFunc(Model) {
    static get tableName() {
        return "venues"
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["name", "location", "capacity", "category"],
            properties: {
                name: { type: "string" },
                location: { type: "string" },
                capacity: { type: ["integer", "string"] },
                category: { type: "string" }
            }
        }
    }

    static get relationMappings() {
        const User = require ("./index.js")
        return {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: "venues.userId",
                to: "users.id"
            }
        }
    }
}

module.exports = Venue