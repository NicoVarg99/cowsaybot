const fs = require("fs");
const TelegramBot = require('node-telegram-bot-api');
const escape = require('escape-html');
var exec = require('child_process').exec;
const token =  process.env.TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

function cowsay(text, callback){
  var child = exec("cowsay -W22", function(error, stdout, stderr){ callback("<code>" + escape(stdout) + "</code>"); });
  child.stdin.write(text);
  child.stdin.end();
};

function cowthink(text, callback){
  var child = exec("cowthink -W22", function(error, stdout, stderr){ callback("<code>" + escape(stdout) + "</code>"); });
  child.stdin.write(text);
  child.stdin.end();
};

bot.onText(/\/cowsay (.+)/, (msg, match) => { // Matches "/cowsay [whatever]"
  cowsay(match[1], function(text) {
    bot.sendMessage(msg.chat.id, text, {parse_mode : "HTML"});
  });
});

bot.onText(/\/cowthink (.+)/, (msg, match) => { // Matches "/cowthink [whatever]"
  cowthink(match[1], function(text) {
    bot.sendMessage(msg.chat.id, text, {parse_mode : "HTML"});
  });
});

// Listen for any kind of message. There are different kinds of messages.
bot.on('message', (msg) => {
  if (!msg.text.startsWith("/")) //Ignore commands
    if (msg.text.toLowerCase().includes("mirco")) {
      //Easter egg message
      cowsay("Mirco non va in America!", function(text) {
        bot.sendMessage(msg.chat.id, text, {parse_mode : "HTML"});
      });
    } else {
      //Normal message
      if (msg.chat.type === "private") {
        //Private chat: Reply
        cowsay(msg.text, function(text) {
          bot.sendMessage(msg.chat.id, text, {parse_mode : "HTML"});
        });
      } else {
        //Group: Ignore
      }
    }
});

bot.on('inline_query', (query) => {
  console.log(query);
});
