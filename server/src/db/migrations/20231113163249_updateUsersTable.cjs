/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.alterTable("users", (table) => {
        table.string("name").notNullable()
        table.string("primaryLocation").notNullable()
        table.string("role").notNullable()
        table.string("spotifyUserId")
        table.string("spotifyArtistId")
        table.string("spotifyLink")
        table.string("accessToken")
        table.string("refreshToken")
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.alterTable("users", (table) => {
        table.dropColumn("name")
        table.dropColumn("primaryLocation")
        table.dropColumn("role")
        table.dropColumn("spotifyLink")
    })
}
