export const Event = {
    name: 'interactionCreate',
    run: async (client: any, interaction: { isChatInputCommand: () => boolean, commandName: string }) => {
        try {
            if (!interaction.isChatInputCommand()) return;
            const command = client.slashCommands.get(interaction.commandName);
            if (!command) return;
            await command.run(client, interaction);
        } catch (error) {
            console.error(error);
        }
    }
};
