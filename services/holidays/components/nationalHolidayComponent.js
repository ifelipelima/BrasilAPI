import { HolidayComponent } from './holidayComponent';
import { getWeekdayName } from './holidayUtils';

export class NationalHolidayComponent extends HolidayComponent {
  constructor() {
    super('national');
  }

  getHolidays(year) {
    const fixedHolidays = [
      ['01-01', 'Confraternização mundial'],
      ['04-21', 'Tiradentes'],
      ['05-01', 'Dia do trabalho'],
      ['09-07', 'Independência do Brasil'],
      ['10-12', 'Nossa Senhora Aparecida'],
      ['11-02', 'Finados'],
      ['11-15', 'Proclamação da República'],
      ['12-25', 'Natal'],
    ];

    if (year >= 2024) {
      fixedHolidays.splice(fixedHolidays.length - 1, 0, [
        '11-20',
        'Dia da consciência negra',
      ]);
    }

    return fixedHolidays.map(([date, name]) => {
      const fullDate = `${year}-${date}`;

      return {
        date: fullDate,
        name,
        type: this.type,
        weekday: getWeekdayName(fullDate),
      };
    });
  }
}
