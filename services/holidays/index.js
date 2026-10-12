import { EasterHolidayComponent } from './components/easterHolidayComponent';
import { HolidayComposite } from './components/holidayComposite';
import { NationalHolidayComponent } from './components/nationalHolidayComponent';
import { StateHolidayComponent } from './components/stateHolidayComponent';

const easterHolidayComponent = new EasterHolidayComponent();
const nationalHolidayComponent = new NationalHolidayComponent();
const stateHolidayComponent = new StateHolidayComponent();

const holidayComposite = new HolidayComposite([
  easterHolidayComponent,
  nationalHolidayComponent,
  stateHolidayComponent,
]);

export { getWeekdayName } from './components/holidayUtils';

/**
 * Cálculo de feriados móveis baseados na Páscoa
 *
 * @see https://en.wikipedia.org/wiki/Computus
 */
export function getEasterHolidays(year) {
  return easterHolidayComponent.getHolidays(year);
}

/**
 * Combina feriados móveis e fixos.
 *
 * Lei n° 6.802 de 30/06/1980
 * - Nossa Senhora Aparecida
 * Lei n° 662 de 06/04/1949
 * - Confraternização mundial
 * - Tiradentes
 * - Dia do trabalho
 * - Independência do Brasil
 * - Finados
 * - Proclamação da República
 * - Natal
 *
 * Referência de https://github.com/pagarme/business-calendar/tree/master/src/brazil
 */
export function getNationalHolidays(year) {
  return nationalHolidayComponent.getHolidays(year);
}

function sortByDate(holidays) {
  return holidays.sort((a, b) => {
    if (a.date > b.date) {
      return 1;
    }
    if (a.date < b.date) {
      return -1;
    }
    return 0;
  });
}

export default function getHolidays(year, state) {
  return sortByDate(holidayComposite.getHolidays(year, state));
}
