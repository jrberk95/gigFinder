/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("gigs", (table) => {
        table.bigIncrements("id")
        table.string("name").notNullable()
        table.string("date").notNullable()
        table.string("rate")
        table.string("size")
        table.string("type").notNullable()
        table.bigInteger("venueId").notNullable().index().unsigned().references("venues.id")
        table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
        table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists("gigs")
}
