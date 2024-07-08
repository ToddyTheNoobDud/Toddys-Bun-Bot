export const Command = {
    name: 'ping',
    description: 'Replies with Pong!',
    run: async(client: any, interaction: { reply: (arg0: string) => any; }) => {
        await interaction.reply('Pong!');
    }
}