const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('A help command, obvs!'),
	async execute(interaction) {
		if (!interaction.inGuild()) return;

		let helpText = 'I have commands to clear Discord channels of messages!';
		helpText += '\nMy commands are as follows';
		helpText += '\n/help - shows this help command';
		helpText += '\n/clear - Clears messages';
		helpText += '\n/spam - Spam system for testing';

		await interaction.reply(helpText);
	},
};