
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
        await bot.say(linkPayload)
    })
    .on('message', async (m) => {
        console.log(`Message: ${m}`)
        // console.log(`Message: ${m.text()}`)
        let bot = Wechaty.instance();
        const contact2 = await bot.Contact.find({ name: '0313' }) // change 'zixia' to any of the room member
        if (/^dong$/i.test(m.text())) {
            console.log("是的")
            setInterval(async () => {
                let str = Math.random() > 0.5 ? '宝贝你辛苦了~~' : "宝贝早点睡哦~"
                const message = await contact2.say(str) // only supported by puppet-padplus
            }, 1000);
        }
    })
    .start();