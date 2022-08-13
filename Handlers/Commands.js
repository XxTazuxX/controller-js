const { Perms } = require("../Validation/Permissions");

module.exports = async (client, Ascii, PG) => {
  const Table = new Ascii("Command Loaded");

  CommandsArray = [];

  (await PG(`${process.cwd()}/Commands/*/*.js`)).map(async (file) => {
    const command = require(file);

    if (!command.name)
      return Table.addRow(file.split("/")[7], "🟥 FAILED", "Missing a name");

    if (!command.description)
      return Table.addRow(command.name, "🟥 FAILED", "Missing a description");

    if (command.permission) {
      if (Perms.includes(command.permission)) command.defaultPermission = false;
      else
        return Table.addRow(command.name, "🟥 FAILED", "Permission is invalid");
    }

    client.commands.set(command.name, command);
    CommandsArray.push(command);

    await Table.addRow(command.name, "🟩 SUCCESSFUL");
  });

  console.log(Table.toString());

  // PERMISSION CHECK //

  client.on("ready", async () => {
    const mainGuild = await client.guilds.cache.get("722077418365648916");
    mainGuild.commands.set(CommandsArray);
  });
};
