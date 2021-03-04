require('dotenv').config();
const API = require('call-of-duty-api')();

module.exports = {
  name: 'wzcheck',
  description: 'Check players Warzone stats',
  async execute(client, message, args, Discord){
    if(!args[0]) return message.channel.send('Please enter a players username');
    if(!args[1]) return message.channel.send('Please enter a players platform');

    let username = process.env.COD_USERNAME;
    let password = process.env.COD_PASSWORD;

    try{
      await API.login(username, password);
      let data = await API.MWBattleData(args[0], args[1]);

      const embed = new Discord.MessageEmbed()
      .setColor('F6FF33')
      .setThumbnail('https://static-cdn.jtvnw.net/jtv_user_pictures/a16524db-522f-4737-adf0-022e7b1489fa-profile_image-70x70.png')
      .setTitle('COD Warzone Stats')
      .setDescription('COD Stats')
      .addFields(
        {name: 'Games Played', value: data.br.gamesPlayed, inline: true},
        {name: 'K/D ratio', value: (data.br.kdRatio).toFixed(2), inline:true},
        {name: 'Wins', value: data.br.wins, inline:true},
        {name: 'Downs', value: data.br.downs, inline:true},
        {name: 'SPM', value:(data.br.scorePerMinute).toFixed(2), inline: true},
        {name: 'Deaths', value: data.br.deaths},
        {name: 'Total Time Played', value: (parseFloat(data.br.timePlayed) / 3600).toFixed(2) + 'hrs'}
      )
      .setFooter('COD stats by Apendii')

      message.channel.send(embed);

      console.log(data.br);

    }catch(error){
      message.channel.send('There was a problem fetching this player!');
      throw error;
    }
  }
}