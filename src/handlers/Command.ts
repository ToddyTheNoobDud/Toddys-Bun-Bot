import { REST, Routes } from "discord.js";
import { token, id } from "../../config.ts";
import { pathToFileURL } from "url";
import { Filereader } from "./filereader.ts";

export const CommandHandler = async (client: { slashCommands: { set: (arg0: any, arg1: any) => void; }; }, rootPath: any) => {

    const AllFiles = await Filereader(`${rootPath}/src/commands`)

    const rest = new REST({ version: "10" }).setToken(token);
    const commands = await Promise.all(AllFiles.map(async (CommandFile) => {
        const { Command } = await import(pathToFileURL(CommandFile).toString());
        if (Command && !Command.ignore && Command.name && Command.description) {
            client.slashCommands?.set(Command.name, Command);
            return {
                name: Command.name,
                nsfw: Command.nsfw ?? false,
                description: Command.description,
                type: 1,
                options: Command.options ?? []
            };
        }
        return null;
    }));

    const CommandsArray = commands.filter(Boolean);

    try {
        console.log("Started refreshing application (/) commands.");
        
        await rest.put(
            Routes.applicationCommands(id),
            { body: CommandsArray.flat() }
        );
        console.log("Successfully reloaded application (/) commands.");

    } catch (error) {
        console.error(error);
    }
};
