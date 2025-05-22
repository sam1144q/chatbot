const { Telegraf, Markup } = require('telegraf');

// Replace with your bot token
const bot = new Telegraf('8116790353:AAEkDOs0cIomz0e2AjyDyxgLs0flUfBmPio'); // 🔒 Don’t hardcode tokens in real projects

// /start command
bot.start((ctx) => {
  ctx.reply('Welcome! 👋\nType /help to see what I can do, Sumit.');
});

// /help command
bot.help((ctx) => {
  ctx.reply('/start - Welcome message\n/help - List commands\n/continue - Let’s have a chat!\n/stopwatch - Sample link');
});

// Custom /stopwatch command
bot.command('stopwatch', (ctx) => {
  ctx.reply('🕒 Here is a useful link: https://github.com/');
});

// /continue command with image and inline buttons
bot.command('continue', async (ctx) => {
  await ctx.reply("Let's continue! How do you feel today?");
  
  // Send image with like/dislike buttons
  const imageUrl = 'https://placekitten.com/400/300';
  await ctx.replyWithPhoto(imageUrl, {
    caption: "Do you like this image?",
    ...Markup.inlineKeyboard([
      [Markup.button.callback('👍 Like', 'like')],
      [Markup.button.callback('👎 Dislike', 'dislike')]
    ])
  });
});

// Handle inline button responses
bot.action('like', async (ctx) => {
  await ctx.answerCbQuery('You liked it!');
  await ctx.reply('❤️ Thanks for the like!');
});

bot.action('dislike', async (ctx) => {
  await ctx.answerCbQuery('You disliked it!');
  await ctx.reply('😢 Sorry to hear that.');
});

// Handle user messages (global)
bot.on('text', (ctx) => {
  const text = ctx.message.text.toLowerCase();
  if (text.includes('good') || text.includes('great')) {
    ctx.reply("Awesome! 😊 Keep it up!");
  } else if (text.includes('bad') || text.includes('not good')) {
    ctx.reply("Sorry to hear that. Hope things get better soon! 💪");
  } else {
    ctx.reply("Thanks for sharing! 🤖");
  }
});

bot.launch();
console.log('🤖 Bot is running...');
