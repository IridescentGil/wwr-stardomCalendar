
const getEvents = async function(currentYear, currentMonth, nextYear, nextMonth) {
    const axios = require('axios')
    const cheerio = require('cheerio')
    const events = []
    var { data } = await axios.get(
        `https://wwr-stardom.com/schedule/?yr=${currentYear}&month=${currentMonth}`   
    )
    const $ = cheerio.load(data)
    $('td.has-events:not(.nextmonth)').each((_idx, el) => {
        if ($('.tagwarp', el).css("background") == "#e91e63"){
        const date = $('.mc-date .screen-reader-text', el).text().split(' ')[0].split('.').map(s => parseInt(s))
        const time = $('.screen-reader-text [style="background:#e91e63;"] .mc_grid_in_time', el).text().split(':').map(s => parseInt(s))
        const start = date.concat(time)
        let title = $('.screen-reader-text .mc_grid_in_tit', el).html().trim()
        let s = title.indexOf('\uff3b')
        let e = title.indexOf('\uff3d')
        if (s != -1 && e > s ) {
            title = title.substring(0, s) + title.substring(e+1)
        }
        let categories = ['スターダム', $('.screen-reader-text .mc_grid_in_tag', el).text()]
        let url = $('a.url', el).attr('href')
        let event = {
                startOutputType: "local",
            start: start,
            duration: {hours: 3},
            title: title,
            url: url,
            categories: categories,
        }
        events.push(event)
        }
    })
    

    var { data } = await axios.get(
        `https://wwr-stardom.com/schedule/?yr=${nextYear}&month=${nextMonth}`   
    )    
    const S = cheerio.load(data)
    S('td.has-events:not(.nextmonth)').each((_idx, el) => {
        if ($('.tagwarp', el).css("background") == "#e91e63"){
        const date = $('.mc-date .screen-reader-text', el).text().split(' ')[0].split('.').map(s => parseInt(s))
        // FIXME: Convert from JST to UTC
        const time = $('.screen-reader-text .mc_grid_in_time', el).text().split(':').map(s => parseInt(s))
        const start = date.concat(time)
        let title = $('.screen-reader-text .mc_grid_in_tit', el).html().trim()
        let s = title.indexOf('\uff3b')
        let e = title.indexOf('\uff3d')
        if (s != -1 && e > s ) {
            title = title.substring(0, s) + title.substring(e+1)
        }
        let categories = ['スターダム', $('.screen-reader-text .mc_grid_in_tag', el).text()]
        let url = $('a.url', el).attr('href')
        let event = {
            start: start,
            duration: {hours: 3},
            title: title,
            url: url,
            categories: categories,
        }
        events.push(event)
        }
    })
    return events
}

const generateIcalFile = async function(filename, events) {
    const { writeFileSync } = require('fs')
    const ics = require('ics')
    const icstime = require('timezones-ical-library')
    var { error, value } = ics.createEvents(events)
    if (error) {
        console.error(error)
    }
    console.log(events)
    var time = icstime.tzlib_get_ical_block("Asia/Tokyo")
    value = value.replace(/DTSTART/g,"DTSTART;"+time[1])
    value = (value.slice(0, 112) + time[0]+ "\n" + value.slice(112))

    writeFileSync(`${__dirname}/${filename}`, value)
}

let date = new Date();
let currentYear = date.getFullYear();
let currentMonth = date.getMonth()+1;
let nextYear = 0;
let nextMonth = 0;
if (currentMonth == 12) {
    nextYear = date.getFullYear()+1;
    nextMonth = 1;
}
else {
    nextYear = currentYear;
    nextMonth = currentMonth + 1;
}

getEvents(currentYear, currentMonth, nextYear, nextMonth).then(e => generateIcalFile('stardom.ics', e))


