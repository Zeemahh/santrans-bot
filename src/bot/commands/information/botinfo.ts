import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { MessageEmbed } from 'discord.js';
import { stripIndents } from 'common-tags';
import * as ms from 'pretty-ms';

export default class extends Command {
    constructor(client: CommandoClient) {
        super(client, {
            name: 'botinfo',
            aliases: ['stats'],
            group: 'misc',
            memberName: 'botinfo',
            description: 'Returns information about the bot.',
            clientPermissions: ['EMBED_LINKS']
        });
    }

    public run(message: CommandoMessage) {
        const member = message.member ?? message.guild.members.fetch(message.author);
        const embed_color = member.roles.color?.color ?? '#23E25D';

        const embed = new MessageEmbed()
            .setTitle(`${message.guild.me?.user.username}#${message.guild.me?.user.discriminator} Information`)
            .addField('❯ Connectivity', stripIndents`Ping: ${Math.floor(this.client.ws.ping)}ms
                        \nUptime: ${ms(this.client.uptime!, { verbose: true })}`)
            .setColor(embed_color);

        return message.reply(embed);
    }
}