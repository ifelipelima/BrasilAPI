/**
 * Converte uma data em string para o nome do dia da semana em português
 * @param {string} dateString - Data no formato YYYY-MM-DD
 * @returns {string} Nome do dia da semana
 */
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
