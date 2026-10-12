import { HolidayComponent } from './holidayComponent';

export class HolidayComposite extends HolidayComponent {
  constructor(children = []) {
    super('composite');
    this.children = children;
  }

  add(component) {
    this.children.push(component);
  }

  getHolidays(year, state) {
    return this.children.flatMap((component) =>
      component.getHolidays(year, state)
    );
  }
}
