const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('Clears messages')
		.addIntegerOption(option =>
			option.setName('amount')
				.setDescription('How many messages would you like to delete (default 100)')
				.setRequired(false)),
	async execute(interaction) {
		if (!interaction.inGuild()) return;

		if(!interaction.memberPermissions.has('MANAGE_MESSAGES') || interaction.member.id != interaction.guild.ownerId)
		{
			await interaction.reply({ content: 'You don\'t have permission to run this command.', ephemeral: true });
		}

		const permissions = interaction.channel.permissionsFor(interaction.client.user);
		if (!permissions.has('MANAGE_MESSAGES')) {
			await interaction.reply({ content: 'I do not have the `MANAGE_MESSAGES` permission.', ephemeral: true });
		}

		let amount = interaction.options.getInteger('amount', false);
		if(amount == null) { amount = 100; }

		if (amount > 100) return interaction.reply({ content: 'I am unable to delete more than 100 messages at once!', ephemeral: true });
		if (amount < 1) return interaction.reply({ content: 'I am unable to delete less than 1 message!', ephemeral: true });

		interaction.channel.messages.fetch({ limit: amount }).then(messages => {

			error = false;

			interaction.channel.bulkDelete(messages).catch( error = true);

			if(error) {
				messages.forEach(element => interaction.channel.messages.fetch(element.id).then(message => message.delete().catch(console.error)).catch(console.error));
			}

		});

		await interaction.reply({ content: 'Finished deleting', ephemeral: true });
	},
};