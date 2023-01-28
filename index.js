
const express = require('express')
const app = express();
require('dotenv').config();

app.get('/',(req,res)=>{
	res.send("Hello world")
})
const {Client,GatewayIntentBits,MessageAttachment} = require('discord.js');
const client = new Client({intents:[
	GatewayIntentBits.Guilds,
	GatewayIntentBits.GuildMessages,
	GatewayIntentBits.MessageContent
]})

const {Configuration,OpenAIApi} = require('openai');
const configuration = new Configuration({
	apiKey:process.env.OPENAI_KEY
})

const openai = new OpenAIApi(configuration);

client.on('messageCreate',async function (message,channelID){
	try{
		console.log(message.content)
		if(message.content.toLowerCase().includes('#generate')){
			// const response = await openai.createImage({
			//   prompt: message.content,
			//   n: 1,
			//   size: "1024x1024",
			// });
			return ;
		}

		if(message.author.bot || !message.content.toLowerCase().includes('thejas') ) return;
		
		// message.channel.startTyping();
		
		
		const response = await openai.createCompletion({
		   model: "text-davinci-003",
		   prompt: `Thejas is a chatbot that reluctantly answers questions with technical responses:\n\n
		   ${message.author.username}:${message.content}\n
		   Thejas:
		   `,
		   temperature: 1,
		   max_tokens: 200,
		   top_p: 0.3,
		   frequency_penalty: 0.5,
		   presence_penalty: 0,
		});
		message.reply(response.data.choices[0].text)
		
		
		
		
		
		// message.channel.stopTyping();

		
	}catch(err){
		console.log(err)
		message.reply(`${err.message}`)
	}
})

client.login(process.env.DISCORD_TOKEN);
console.log("ChatGpt Bot is Now Online");
app.listen(3000,()=>{
	console.log("Port Listening and server started")
});