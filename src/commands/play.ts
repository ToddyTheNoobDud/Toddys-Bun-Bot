
export const Command = {
    name: 'play',
    description: 'Plays a song',
    options: [
        {
            name: 'song',
            description: 'The name of the song',
            type: 3,
            required: true
        }
    ],
    run: async(client: any, interaction: any) => {
        const vc = interaction.member?.voice?.channel;

        if (!vc) return

        await client.distube.voices.create(vc)

        await client.distube.play(vc, interaction.options.getString('song'), {
            member: interaction.member,
            textChannel: interaction.channel
        })
    }
}