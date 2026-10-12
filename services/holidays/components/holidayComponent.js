export class HolidayComponent {
  constructor(type) {
    this.type = type;
  }

  getHolidays() {
    throw new Error(`${this.constructor.name} deve implementar getHolidays()`);
  }
}
