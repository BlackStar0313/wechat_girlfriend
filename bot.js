
console.log("hello")
const { Wechaty, FileBox, UrlLink } = require('wechaty') // import { Wechaty } from 'wechaty'
const weather = require('./src/weather')

const name = 'wechat-puppet-wechat';


let bot = '';

const BadmintonType = {
    BeforeRemind: "beforeRemind",
    BeforeGameRemind: "beforeGameRemind",
    BeforeGame: "beforeGame",
    AfterGame: "afterGame"
}

async function badminton(bot) {
    const room = await bot.Room.find({ topic: '你好世界' })
    // const room = await bot.Room.find({ topic: '周三晚上羽毛球' })
    console.log(`badminton: ${room}`)
    // startBadmintonRemindLoop(BadmintonType.BeforeRemind, room, 0, 18, 0, "明天晚上有球儿哦~");
    // startBadmintonRemindLoop(BadmintonType.BeforeGameRemind, room, 1, 18, 0, "一会儿就要开始了哦，记得买点晚饭吃先，别饿肚子哈~ \n祝大家玩儿的开心~ (*^▽^*)");
    // startBadmintonRemindLoop(BadmintonType.BeforeGame, room, 1, 19, 30, "准备准备该出发了哦");
    // startBadmintonRemindLoop(BadmintonType.AfterGame, room, 1, 22, 15, "嘻嘻~ 大家运动完好好休息哈~  下周继续~~ (づ￣ 3￣)づ")

    startBadmintonRemindLoop(BadmintonType.BeforeRemind, room, 4, 21, 35, "明天晚上有球儿哦~");
    // startBadmintonRemindLoop(BadmintonType.BeforeGameRemind, room, 4, 21, 19, "一会儿就要开始了哦，记得买点晚饭吃先，别饿肚子哈~ \n祝大家玩儿的开心~ (*^▽^*)");
    // startBadmintonRemindLoop(BadmintonType.BeforeGame, room, 4, 21, 20, "准备准备该出发了哦");
    // startBadmintonRemindLoop(BadmintonType.AfterGame, room, 4, 21, 21, "嘻嘻~ 大家运动完好好休息哈~  下周继续~~ (づ￣ 3￣)づ")
}

function startBadmintonRemindLoop(type, con, day, hour, min, str) {
    let nextRemindTime = getNextTime(day, hour, min);
    setTimeout(async () => {
        // con.say(str);
        // if (type == BadmintonType.BeforeRemind) {
        //     const text = await weather()
        //     con.say(text);
        // }
        startBadmintonRemindLoop(con, day, hour, min, str);
    }, nextRemindTime);
}

function getNextTime(targetDay, targetHour, targetMin) {
    let timeNow = new Date();
    let day = timeNow.getUTCDay() - 1;
    let weekStartTime = Math.floor(timeNow.getTime() / 3600 / 24 / 1000 - day) * 3600 * 24;



    let remindTime = weekStartTime + targetDay * 3600 * 24 + targetHour * 3600 + targetMin * 60 + timeNow.getTimezoneOffset() * 60
    console.log("【test 】", remindTime)
    let remindDate = new Date(remindTime * 1000);
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

async function main() {
    bot = new Wechaty({
        name, // generate xxxx.memory-card.json and save login data for the next login
    });
    await bot.start();
    bot.on('scan', (qrcode, status) => {
        // console.log(`Scan QR Code to login: ${status}\nhttps://wechaty.js.org/qrcode/${encodeURIComponent(qrcode)}`)

        require('qrcode-terminal').generate(qrcode); // 在console端显示二维码
        const qrcodeImageUrl = [
            'https://wechaty.js.org/qrcode/',
            encodeURIComponent(qrcode),
        ].join('');
        console.log(qrcodeImageUrl);
    });
    bot.on('login', async (user) => {
        console.log(`User ${user} logged in`)
        const contact = await bot.Contact.find({ name: '0313' })
        await contact.say("你好~")


        const fileBox = FileBox.fromUrl('https://wechaty.github.io/wechaty/images/bot-qr-code.png')
        await contact.say(fileBox)

        // const linkPayload = new UrlLink({
        //     description: 'WeChat Bot SDK for Individual Account, Powered by TypeScript, Docker, and Love',
        //     thumbnailUrl: 'https://avatars0.githubusercontent.com/u/25162437?s=200&v=4',
        //     title: 'Welcome to Wechaty',
        //     url: 'https://github.com/wechaty/wechaty',
        // })
        // await contact.say(linkPayload);


        // // const contact2 = await bot.Contact.find({ name: '0313' }) // change 'zixia' to any of the room member
        // // startBadmintonTimeLoop(contact2)
        badminton(bot)
    })
    bot.on('message', async (m) => {
        console.log(`Message: ${m}`)
        console.log(`Message: ${m.text()}`)
        const contact2 = await bot.Contact.find({ name: '0313' }) // change 'zixia' to any of the room member
        if (/晚安/g.test(m.text())) {
            console.log("是的")
            // setInterval(async () => {
            //     let str = Math.random() > 0.5 ? '宝贝你辛苦了~~' : "宝贝早点睡哦~"
            //     const message = await contact2.say(str) // only supported by puppet-padplus
            // }, 1000);
            const room = m.room();
            if (room) {
                room.say('早睡哦~ 宝贝~')
                const text = await weather()
                room.say(text);
            }
            contact2.say('早睡哦~ 宝贝~')
            const text = await weather()
            contact2.say(text);
        }
        else if (/早安/g.test(m.text())) {
            contact2.say('早上好~')
        }
        else if (/懒/g.test(m.text())) {
            const room = m.room();
            if (room) {
                await room.say("这人会得脂肪肝")
            }
        }
        // else if (/哈哈/g.test(m.text())) {
        //     const room = m.room();
        //     if (room) {
        //         await room.say("哈哈哈哈哈哈哈~")
        //     }
        // }
        // else if (/最帅的人/g.test(m.text())) {
        //     const contactCard = await bot.Contact.find({ name: '0313' }) // change 'lijiarui' to any of the room member
        //     const room = m.room();
        //     await room.say(contactCard)
        // }
        else if (/你是谁/g.test(m.text())) {
            const room = m.room();
            if (room) {
                room.say("我是志伟哥哥的贴心小棉袄~");
            }
        }
    });
}

main()
    // .then(process.exit)
    // .catch(e => {
    //     console.error(e)
    //     process.exit(1)
    // })