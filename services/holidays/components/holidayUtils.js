export function getWeekdayName(dateString) {
  const weekdays = [
    'domingo',
    'segunda-feira',
    'terça-feira',
    'quarta-feira',
    'quinta-feira',
    'sexta-feira',
    'sábado',
  ];

  const date = new Date(`${dateString}T12:00:00`);
  return weekdays[date.getDay()];
}
