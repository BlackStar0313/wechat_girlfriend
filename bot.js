
console.log("hello")
const { Wechaty, FileBox, UrlLink } = require('wechaty') // import { Wechaty } from 'wechaty'

Wechaty.instance() // Global Instance
    .on('scan', (qrcode, status) => console.log(`Scan QR Code to login: ${status}\nhttps://wechaty.js.org/qrcode/${encodeURIComponent(qrcode)}`))
    .on('login', async (user) => {
        console.log(`User ${user} logged in`)
        let bot = Wechaty.instance();
        await bot.say('hello!')
        const contact = await bot.Contact.find()
        await bot.say(contact)


        const fileBox = FileBox.fromUrl('https://wechaty.github.io/wechaty/images/bot-qr-code.png')
        await bot.say(fileBox)

        const linkPayload = new UrlLink({
            description: 'WeChat Bot SDK for Individual Account, Powered by TypeScript, Docker, and Love',
            thumbnailUrl: 'https://avatars0.githubusercontent.com/u/25162437?s=200&v=4',
            title: 'Welcome to Wechaty',
            url: 'https://github.com/wechaty/wechaty',
        })
        await bot.say(linkPayload);


        const contact2 = await bot.Contact.find({ name: '0313' }) // change 'zixia' to any of the room member
        startBadmintonTimeLoop(contact2)
    })
    .on('message', async (m) => {
        console.log(`Message: ${m}`)
        // console.log(`Message: ${m.text()}`)
        let bot = Wechaty.instance();
        const contact2 = await bot.Contact.find({ name: '0313' }) // change 'zixia' to any of the room member
        if (/^晚安$/i.test(m.text())) {
            console.log("是的")
            // setInterval(async () => {
            //     let str = Math.random() > 0.5 ? '宝贝你辛苦了~~' : "宝贝早点睡哦~"
            //     const message = await contact2.say(str) // only supported by puppet-padplus
            // }, 1000);
            contact2.say('晚安哦~ 宝贝~')
        }
    })
    .start();

function startBadmintonTimeLoop(con) {
    con.say("开始倒计时了哦");
    let nextRemindTime = getNextBadmintonTime();
    setTimeout(() => {
        con.say("明天晚上有球儿哦~");
        startBadmintonTimeLoop(con);
    }, nextRemindTime);
}

function getNextBadmintonTime() {
    let timeNow = new Date();
    let day = timeNow.getUTCDay() - 1;
    let weekStartTime = Math.floor(timeNow.getTime() / 3600 / 24 / 1000 - day) * 3600 * 24 * 1000;

    //周二晚19点
    let targetDay = 1;
    let targetHour = 19;
    let targetMin = 0;
    let remindTime = weekStartTime + targetDay * 3600 * 24 * 1000 + targetHour * 3600 * 1000 + targetMin * 60 * 1000 + timeNow.getTimezoneOffset() * 60 * 1000
    let remindDate = new Date(remindTime);
    console.log(" time now  ", timeNow, " remind time is  ", remindDate);
    if (timeNow.getTime() < remindDate.getTime()) {
        console.log('remin time ', remindDate.getTime() - timeNow.getTime())
        return remindDate.getTime() - timeNow.getTime();
    }
    else {
        console.log('next play day is ', new Date(remindDate.getTime() + 7 * 24 * 3600 * 1000))
        return remindDate.getTime() + 7 * 24 * 3600 * 1000 - timeNow.getTime();
    }
}