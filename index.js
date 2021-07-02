const Discord = require('discord.js');
const async = require('async');
const request = require('request');
const axios = require('axios');
const tyler1TitleBot = new Discord.Client();
const token = 'ODU5OTUwNTE5NjIyODI4MDUz.YN0JVA.nTVmizdi57z9nxJhHs4i9e_Ep7c';
const prefix = '!';

var info;
var streamerTitle = "";

//Twitch
const options = {
    url: 'https://id.twitch.tv/oauth2/token',
    json:true,
    body: {
    client_id: 'zmoyqn9j3xpfdivb4dj5gzpd6ccvqg',
    client_secret: 'il52rui8jm75vhqsg8803l74n2jcw4',
    grant_type: 'client_credentials'
    }
};

//DISCORD Bot
tyler1TitleBot.once('ready', () => {
    console.log('T1 Title Bot online');
})

tyler1TitleBot.on('message', async message => {
    
    if(!message.content.startsWith(prefix)){
        return;
    }
    const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);

    const command = args.shift().toLowerCase();

    if(command === "tyler1"){
        console.log("tyler1 command read");

        function streamerRequest(accessToken){

            setTimeout(() => {
            const streamerGETInfo = {
                url: 'https://api.twitch.tv/helix/streams?user_login=loltyler1',
                //url: 'https://api.twitch.tv/helix/search/channels?query=loltyler1',
                method: 'GET',
                headers:{
                    'Client-ID': 'zmoyqn9j3xpfdivb4dj5gzpd6ccvqg',
                    'Authorization': 'Bearer ' + accessToken
                }
            }
            if(!accessToken){
                console.log("No Token");
            }
            else{
            const streamerInfoResponse = request.get(streamerGETInfo,(err,res,body) => {
                if(err){
                    message.channel.send("Dogshit bot try again :(");
                    return console.log(err);
                }

                 console.log(`Get Status Code: ${res.statusCode}`);
                 info = JSON.parse(body);
                 console.log("Response from Twitch API");                
                 console.log(info);
                 try{
                    let temp = info.data[0].title;

                    streamerTitle = JSON.stringify(temp);
                    console.log("Title: ");
                    console.log(streamerTitle);
                    message.channel.send(streamerTitle.replace(/['"]+/g, '')); 
                 } catch(err){
                     console.log("Tyler1 is not live :(");
                     message.channel.send("Tyler1 is not live :(");
                 }
            });

            }; //else

            },2000) //Timeout
        }

        request.post(options, (err,res,body)=>{
            if(err){
                return console.log(err);
            }
            console.log(`Oauth2 Status Code: ${res.statusCode}`);
            streamerRequest(body.access_token)
        });
    }
});

tyler1TitleBot.login(token);