

require('dotenv').config();


const {Client,GatewayIntentBits} = require('discord.js');
const client = new Client({intents:[
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent
]})

const {Configuration,OpenAIApi} = require('openai');
const configuration = new Configuration({
	organization:process.env.OPENAI_ORG,
	apiKey:process.env.OPENAI_KEY
})

const openai = new OpenAIApi(configuration);

client.on('messageCreate',async function (message,channelID){
	try{
		if(message.author.bot || !message.content.toLowerCase().includes('thejas') ) return;
		
		// message.channel.startTyping();
	
		const response = await openai.createCompletion({
		  model: "text-davinci-003",
		  prompt: `Thejas is a chatbot that reluctantly answers questions with sarcastic responses:\n\n
		  ${message.author.username}:${message.content}\n
		  Thejas:
		  `,
		  temperature: 1,
		  max_tokens: 200,
		  top_p: 0.3,
		  frequency_penalty: 0.5,
		  presence_penalty: 0,
		});
		// message.channel.stopTyping();
		message.reply(response.data.choices[0].text)

		
	}catch(err){
		console.log(err)
		message.reply(`${err.message}`)
	}
})

client.login(process.env.DISCORD_TOKEN);
console.log("ChatGpt Bot is Now Online");