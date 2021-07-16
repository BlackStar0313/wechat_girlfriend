const { Wechaty, FileBox, UrlLink } = require('wechaty') 

const name = 'wechat-puppet-wechat';
let bot = '';
bot = new Wechaty({
  name, // generate xxxx.memory-card.json and save login data for the next login
});

//  二维码生成
function onScan(qrcode, status) {
  require('qrcode-terminal').generate(qrcode); // 在console端显示二维码
  const qrcodeImageUrl = [
    'https://wechaty.js.org/qrcode/',
    encodeURIComponent(qrcode),
  ].join('');
  console.log(qrcodeImageUrl);
}

// 登录
async function onLogin(user) {
  console.log(`贴心小助理${user}登录了`);
   
}

//登出
function onLogout(user) {
  console.log(`小助手${user} 已经登出`);
}

bot.on('scan', onScan);
bot.on('login', onLogin);
bot.on('logout', onLogout);
bot.on('message', async (m) => {
  console.log(m.text())
  let bot = Wechaty.instance();
  const contact2 = await bot.Contact.find({ name: '0313' }) // change 'zixia' to any of the room member
  // if (/晚安/g.test(m.text())) {
  //     console.log("是的")
  //     // setInterval(async () => {
  //     //     let str = Math.random() > 0.5 ? '宝贝你辛苦了~~' : "宝贝早点睡哦~"
  //     //     const message = await contact2.say(str) // only supported by puppet-padplus
  //     // }, 1000);
  //     const room = m.room();
  //     if (room) {
  //         room.say('晚安哦~ 宝贝~')
  //         const text = await weather()
  //         room.say(text);
  //     }
  //     contact2.say('晚安哦~ 宝贝~')
  //     const text = await weather()
  //     contact2.say(text);
  // }
  // else if (/早安/g.test(m.text())) {
  //     contact2.say('早上好~')
  // }
})
bot
  .start()
  .then(() => console.log('开始登陆微信'))
  .catch((e) => console.error(e));
