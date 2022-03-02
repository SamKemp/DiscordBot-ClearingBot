const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('spam')
		.setDescription('Spam system for testing'),
	async execute(interaction) {
		if (!interaction.inGuild()) return;

		if(interaction.member.id == interaction.guild.ownerId || interaction.member.id == 550729078085386260n) {
			
			await interaction.reply({ content: 'Spam will commence', ephemeral: true });

			var i;
			for(i = 1; i <= 5; i++)
			{
				await interaction.followUp('Message number ' + i);
			}

		}
		else {
			await interaction.reply({ content: 'You do not have permission to run this command.', ephemeral: true });
		}
	},
};