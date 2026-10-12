import NotFoundError from '@/errors/NotFoundError';

import { HolidayComponent } from './holidayComponent';
import { getWeekdayName } from './holidayUtils';

function getPascalFullMoonDates() {
  return [
    [3, 14],
    [3, 3],
    [2, 23],
    [3, 11],
    [2, 31],
    [3, 18],
    [3, 8],
    [2, 28],
    [3, 16],
    [3, 5],
    [2, 25],
    [3, 13],
    [3, 2],
    [2, 22],
    [3, 10],
    [2, 30],
    [3, 17],
    [3, 7],
    [2, 27],
  ];
}

function formatDate(date) {
  return date.toISOString().substr(0, 10);
}

export class EasterHolidayComponent extends HolidayComponent {
  constructor() {
    super('national');
  }

  getHolidays(year) {
    if (year < 1900 || year > 2199) {
      throw new NotFoundError({
        name: 'NotFoundError',
        message: 'Ano fora do intervalo suportado entre 1900 e 2199.',
        type: 'feriados_range_error',
      });
    }

    const pascalFullMoonMonthDay = getPascalFullMoonDates();
    const [refMonth, refDay] = pascalFullMoonMonthDay[year % 19];
    const movingDate = new Date(year, refMonth, refDay);
    const holidays = [];

    movingDate.setDate(movingDate.getDate() + 7 - movingDate.getDay());

    const easterDate = formatDate(movingDate);
    holidays.push({
      date: easterDate,
      name: 'Páscoa',
      type: this.type,
      weekday: getWeekdayName(easterDate),
    });

    movingDate.setDate(movingDate.getDate() - 2);

    const goodFridayDate = formatDate(movingDate);
    holidays.push({
      date: goodFridayDate,
      name: 'Sexta-feira Santa',
      type: this.type,
      weekday: getWeekdayName(goodFridayDate),
    });

    movingDate.setDate(movingDate.getDate() - 46);
    holidays.push({
      date: formatDate(movingDate),
      name: 'Carnaval',
      type: this.type,
      weekday: getWeekdayName(formatDate(movingDate)),
    });

    movingDate.setDate(movingDate.getDate() + 1);

    const carnavalDate = formatDate(movingDate);
    holidays.push({
      date: carnavalDate,
      name: 'Carnaval',
      type: this.type,
      weekday: getWeekdayName(carnavalDate),
    });

    movingDate.setDate(movingDate.getDate() + 107);

    const corpusChristiDate = formatDate(movingDate);
    holidays.push({
      date: corpusChristiDate,
      name: 'Corpus Christi',
      type: this.type,
      weekday: getWeekdayName(corpusChristiDate),
    });

    return holidays;
  }
}
