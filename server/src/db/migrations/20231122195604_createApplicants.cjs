/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("applications", (table) => {
        table.bigIncrements("id")
        table.bigInteger("userId").notNullable().index().unsigned().references("users.id")
        table.bigInteger("gigId").notNullable().index().unsigned().references("gigs.id")
        table.boolean("hired").defaultTo(false)
        table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
        table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists("applications")
}
