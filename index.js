require("dotenv").config();

const Discord = require("discord.js");
const client = new Discord.Client();

var prefix = '¬';
MessageTimeout = 10;

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({ activity: { name: 'with the delete key' }, status: 'online' });
})

client.on("message", msg => {

  // Ignore DM's
  if(!msg.guild) return;

  if(msg.member.hasPermission('MANAGE_MESSAGES') || msg.author.id == msg.guild.ownerID)
  {
    if(!msg.guild.me.hasPermission('MANAGE_MESSAGES')) return msg.reply('I do not have the `MANAGE_MESSAGES` permission');

    if (msg.content.startsWith(prefix + "clear"))
    {
      console.log("Received clearing request from " + msg.author.username + " in server " + msg.guild.name);

      const args = msg.content.split(' ').slice(1);
      amount = args.join(' ');

      if(!amount) amount = 100;

      if(isNaN(amount)) amount = 100;

      // if (amount > 200) return msg.reply('**TESTING** I am unable to delete more than 200 messages at once! **TESTING**');
      if (amount > 100) return msg.reply('I am unable to delete more than 100 messages at once!');
      if (amount < 1) return msg.reply('I am unable to delete less than 1 message!');

      msg.channel.messages.fetch({ limit: amount }).then(messages => 
      {
        var error = false;

        msg.channel.bulkDelete(messages).catch(error = true)

        if(error)
        {
          messages.forEach(element => msg.channel.messages.fetch(element.id).then(message => message.delete().catch(console.error)).catch(console.error) )
        }
      });

      msg.channel.send("Finished deleting");
    }

    if(msg.author.id == client.user.id)
    {
      msg.delete({ timeout: MessageTimeout*1000 }).catch(console.error);
      return;
    }

    // Spam system for testing
    if ((msg.author.id == msg.guild.ownerID || msg.author.id == 550729078085386260n) && msg.content.startsWith(prefix + "spam"))
    {
      var i;
      for(i = 1; i <= 5; i++)
      {
        msg.channel.send('Message number ' + i);
      }
    }
  }
})

client.login(process.env.BOT_TOKEN);