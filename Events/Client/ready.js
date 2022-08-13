const { Client } = require("discord.js");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const Database = process.env.DATABASE;

module.exports = {
  name: "ready",
  once: true,
  /**
   * @param {Client} client
   */
  execute(client) {
    console.log(`Bot is online as ${client.user.tag}`);
    client.user.setActivity("/help", { type: "WATCHING" });

    if (!Database) return;
    mongoose
      .connect(Database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("The client is now connected to the database");
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
