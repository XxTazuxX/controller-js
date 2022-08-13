const { Client, Collection } = require("discord.js");
const logs = require("discord-logs");
const toBool = require("to-bool");
const { promisify } = require("util");
const { glob } = require("glob");
const Ascii = require("ascii-table");
const PG = promisify(glob);
const dotenv = require("dotenv").config();

const client = new Client({ intents: 65535 });
logs(client);

const DEV = process.env.DEV;
const TOKEN = eval("process.env.DISCORD_TOKEN" + (toBool(DEV) ? "DEV" : ""));

client.commands = new Collection();

["Events", "Commands"].map((v) =>
  require(`./Handlers/${v}`)(client, Ascii, PG)
);

client.login(TOKEN);
