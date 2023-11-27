/* eslint-disable import/no-extraneous-dependencies */
const Bcrypt = require("bcrypt");
const unique = require("objection-unique");
const Model = require("./Model");

const saltRounds = 10;

const uniqueFunc = unique({
  fields: ["email"],
  identifiers: ["id"],
});

class User extends uniqueFunc(Model) {
  static get tableName() {
    return "users";
  }

  set password(newPassword) {
    this.cryptedPassword = Bcrypt.hashSync(newPassword, saltRounds);
  }

  authenticate(password) {
    return Bcrypt.compareSync(password, this.cryptedPassword);
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["email", "name", "primaryLocation"],
      properties: {
        email: { type: "string", pattern: "^\\S+@\\S+\\.\\S+$" },
        cryptedPassword: { type: "string" },
        name: { type: "string" },
        role: { type: "string" },
        primaryLocation: { type: "string" },
        spotifyLink: { type: "string" }
      },
    };
  }

  static get relationMappings() {
    const { Venue, Application, Gig }= require("./index.js")
    return {
      venues: {
        relation: Model.HasManyRelation,
        modelClass: Venue,
        join: {
          from: "users.id",
          to: "venues.userId"
        }
      },
      applications: {
        relation: Model.HasManyRelation,
        modelClass: Application,
        join: {
          from: "users.id",
          to: "applications.userId"
        }
      },
      gigs: {
        relation: Model.ManyToManyRelation,
        modelClass: Gig,
        join: {
          from: "users.id",
          through: {
            from: "applications.userId",
            to: "applications.gigId",
          },
          to: "gigs.id"
        }
      }
    }
  }

  $formatJson(json) {
    const serializedJson = super.$formatJson(json);

    if (serializedJson.cryptedPassword) {
      delete serializedJson.cryptedPassword;
    }

    return serializedJson;
  }
}

module.exports = User;
