import { HolidayComponent } from './holidayComponent';

export class StateHolidayComponent extends HolidayComponent {
  constructor() {
    super('state');
  }

  getHolidays(year, state) {
    if (!state) {
      return [];
    }

    const stateHolidaysMap = {
      AC: [{ monthDay: '01-23', name: 'Dia do Evangélico' }],
      AL: [{ monthDay: '06-24', name: 'São João' }],
      AM: [
        {
          monthDay: '09-05',
          name: 'Elevação do Amazonas à Categoria de Província',
        },
      ],
      AP: [
        {
          monthDay: '09-13',
          name: 'Criação do Território Federal do Amapá',
        },
      ],
      BA: [{ monthDay: '07-02', name: 'Independência da Bahia' }],
      CE: [{ monthDay: '03-19', name: 'Dia de São José (Padroeiro do Ceará)' }],
      DF: [{ monthDay: '04-21', name: 'Aniversário de Brasília' }],
      ES: [{ monthDay: '10-28', name: 'Dia do Servidor Público' }],
      GO: [{ monthDay: '07-26', name: 'Fundação da Cidade de Goiás' }],
      MA: [{ monthDay: '07-28', name: 'Adesão do Maranhão à Independência' }],
      MG: [
        { monthDay: '04-21', name: 'Execução de Tiradentes (feriado em MG)' },
      ],
      MS: [
        {
          monthDay: '10-11',
          name: 'Criação do Estado do Mato Grosso do Sul',
        },
      ],
      MT: [
        {
          monthDay: '11-29',
          name: 'Consciência Negra (feriado estadual)',
        },
      ],
      PA: [{ monthDay: '08-15', name: 'Adesão do Pará à Independência' }],
      PB: [{ monthDay: '08-05', name: 'Fundação da Paraíba' }],
      PE: [{ monthDay: '03-06', name: 'Revolução Pernambucana' }],
      PI: [{ monthDay: '10-19', name: 'Dia do Piauí' }],
      PR: [{ monthDay: '12-19', name: 'Emancipação Política do Paraná' }],
      RJ: [{ monthDay: '01-20', name: 'São Sebastião (padroeiro do RJ)' }],
      RN: [{ monthDay: '10-03', name: 'Mártires de Cunhaú e Uruaçu' }],
      RO: [{ monthDay: '01-04', name: 'Criação do Estado de Rondônia' }],
      RR: [{ monthDay: '10-05', name: 'Criação do Estado de Roraima' }],
      RS: [{ monthDay: '09-20', name: 'Revolução Farroupilha' }],
      SC: [{ monthDay: '08-11', name: 'Dia do Estado de Santa Catarina' }],
      SE: [{ monthDay: '07-08', name: 'Emancipação Política de Sergipe' }],
      SP: [{ monthDay: '01-25', name: 'Aniversário da Cidade de São Paulo' }],
      TO: [{ monthDay: '01-01', name: 'Instalação do Estado do Tocantins' }],
    };

    const definition = stateHolidaysMap[state];

    if (!definition) {
      throw new Error('Estado inválido');
    }

    return definition.map((holiday) => ({
      date: `${year}-${holiday.monthDay}`,
      name: holiday.name,
      type: this.type,
      state,
    }));
  }
}
