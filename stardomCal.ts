import axios from 'axios';
import * as cheerio from 'cheerio';
import { writeFileSync } from 'fs';
import * as ics from 'ics';
import * as icstime from 'timezones-ical-library';

function toIcsDateTime(dateArray: number[] | undefined): ics.DateArray | undefined {
    if (Array.isArray(dateArray) && !dateArray.some((item) => item == undefined)) {
        if (dateArray.length == 3) {
            return [dateArray[0]!, dateArray[1]!, dateArray[2]!];
        }
        if (dateArray.length == 4) {
            return [dateArray[0]!, dateArray[1]!, dateArray[2]!, dateArray[3]!];
        }
        if (dateArray.length == 5) {
            return [dateArray[0]!, dateArray[1]!, dateArray[2]!, dateArray[3]!, dateArray[4]!];
        }
    }
    return undefined;
}

async function getEvents(year: number, month: number, events: ics.EventAttributes[]): Promise<ics.EventAttributes[]> {
    const { data } = await axios.get(
        `https://wwr-stardom.com/schedule/?yr=${year}&month=${month}`,
    );
    const $ = cheerio.load(data);

    $('td.has-events:not(.nextmonth)').each((_idx, el) => {
        if ($('.tagwarp', el).css('background') == '#e91e63') {
            const date = $('.mc-date .screen-reader-text', el).text().split(' ')[0]
                ?.split('.').map((s) => parseInt(s));

            const time = $(
                '.screen-reader-text [style="background:#e91e63;"] .mc_grid_in_time',
                el,
            ).text().split(':').map((s) => parseInt(s));

            const start = toIcsDateTime(date?.concat(time));

            let title = $('.screen-reader-text .mc_grid_in_tit', el).html()?.trim();
            if (title) {
                const s = title.indexOf('\uff3b');
                const e = title.indexOf('\uff3d');
                if (s != -1 && e > s) {
                    title = title.substring(0, s) + title.substring(e + 1);
                }
            } else {
                title = '';
            }

            const categories = [
                'スターダム',
                $('.screen-reader-text .mc_grid_in_tag', el).text(),
            ];
            const url = $('a.url', el).attr('href');

            if (start != undefined) {
                const event: ics.EventAttributes = {
                    startOutputType: 'local',
                    start: start,
                    duration: { hours: 3 },
                    title: title,
                    url: url,
                    categories: categories,
                };
                events.push(event);
            }
        }
    });

    return events;
};
function generateIcalFile(filename: string, events: ics.EventAttributes[]): void {
    let { error, value } = ics.createEvents(events);

    if (error) {
        console.error(error);
    }

    console.log(events);
    const time = icstime.tzlib_get_ical_block('Asia/Tokyo');

    if (value) {
        value = value.replace(/DTSTART/g, 'DTSTART;' + time[1]);
        value = value.slice(0, 112) + time[0] + '\n' + value.slice(112);
        writeFileSync(`${__dirname}/${filename}`, value);
    }
};

const __dirname = import.meta.dirname;
const date = new Date();
const currentYear: number = date.getFullYear();
const currentMonth: number = date.getMonth() + 1;
let nextYear: number = 0;
let nextMonth: number = 0;

if (currentMonth == 12) {
    nextYear = date.getFullYear() + 1;
    nextMonth = 1;
} else {
    nextYear = currentYear;
    nextMonth = currentMonth + 1;
}

const events: ics.EventAttributes[] = [];

getEvents(currentYear, currentMonth, events).then((e) =>
    getEvents(nextYear, nextMonth, e).then((x) =>
        generateIcalFile('stardom.ics', x),
    ),
);
