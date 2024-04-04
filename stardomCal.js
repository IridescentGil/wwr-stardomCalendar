const getEvents = async function(year, month, events) {
    const axios = require('axios');
    const cheerio = require('cheerio');
    const { data } = await axios.get(
        `https://wwr-stardom.com/schedule/?yr=${year}&month=${month}`,
    );
    const $ = cheerio.load(data);
    $('td.has-events:not(.nextmonth)').each((_idx, el) => {
        if ($('.tagwarp', el).css('background') == '#e91e63') {
            const date = $('.mc-date .screen-reader-text', el).text().split(' ')[0]
                .split('.').map((s) => parseInt(s));
            const time = $(
                '.screen-reader-text [style="background:#e91e63;"] .mc_grid_in_time',
                el,
            ).text().split(':').map((s) => parseInt(s));
            const start = date.concat(time);
            let title = $('.screen-reader-text .mc_grid_in_tit', el).html().trim();
            const s = title.indexOf('\uff3b');
            const e = title.indexOf('\uff3d');
            if (s != -1 && e > s) {
                title = title.substring(0, s) + title.substring(e + 1);
            }
            const categories = [
                'スターダム',
                $('.screen-reader-text .mc_grid_in_tag', el).text(),
            ];
            const url = $('a.url', el).attr('href');
            const event = {
                startOutputType: 'local',
                start: start,
                duration: { hours: 3 },
                title: title,
                url: url,
                categories: categories,
            };
            events.push(event);
        }
    });

    return events;
};
const generateIcalFile = function(filename, events) {
    const { writeFileSync } = require('fs');
    const ics = require('ics');
    const icstime = require('timezones-ical-library');
    let { error, value } = ics.createEvents(events);
    if (error) {
        console.error(error);
    }
    console.log(events);
    const time = icstime.tzlib_get_ical_block('Asia/Tokyo');
    value = value.replace(/DTSTART/g, 'DTSTART;' + time[1]);
    value = value.slice(0, 112) + time[0] + '\n' + value.slice(112);

    writeFileSync(`${__dirname}/${filename}`, value);
};

const date = new Date();
const currentYear = date.getFullYear();
const currentMonth = date.getMonth() + 1;
let nextYear = 0;
let nextMonth = 0;
if (currentMonth == 12) {
    nextYear = date.getFullYear() + 1;
    nextMonth = 1;
} else {
    nextYear = currentYear;
    nextMonth = currentMonth + 1;
}
const events = [];

getEvents(currentYear, currentMonth, events).then((e) =>
    getEvents(nextYear, nextMonth, e).then((x) =>
        generateIcalFile('stardom.ics', x),
    ),
);
