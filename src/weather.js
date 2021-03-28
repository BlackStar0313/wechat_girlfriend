const axios = require('axios')
const cheerio = require('cheerio')

// 墨迹天气地址
const url = `https://tianqi.moji.com/today/china/beijing/beijing`

async function spider() {
    const { data } = await axios.get(url)
    const $ = cheerio.load(data)

    const target = $('.wea_list li.active').next()
    const week = target
        .find('.week')
        .eq(1)
        .text()
    const weather = target
        .find('.wea')
        .eq(1)
        .text()
    const temperature = `${target.find('.tree strong').text()}-${target
        .find('.tree b')
        .text()}`
    const text = $('.detail_ware_title span').text()
    return `明天 ${week} ${weather} ${temperature} \n${text}`
}

module.exports = spider
