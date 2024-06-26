import moment from 'moment';

const TimeDifference = ({ timestamp }: any) => {
  // Obtiene la fecha actual
  const now = moment();

  // Crea un objeto moment a partir del timestamp
  const time = moment.unix(timestamp.seconds);

  // Calcula la diferencia de tiempo en segundos, minutos, horas y días
  const secondsDifference = now.diff(time, 'seconds');
  const minutesDifference = now.diff(time, 'minutes');
  const hoursDifference = now.diff(time, 'hours');
  const daysDifference = now.diff(time, 'days');

  // Crea la cadena de tiempo para mostrar
  let timeString;
  if (secondsDifference < 60) {
    timeString = `Hace ${secondsDifference} segundo${secondsDifference !== 1 ? 's' : ''}`;
  } else if (minutesDifference < 60) {
    timeString = `Hace ${minutesDifference} minuto${minutesDifference !== 1 ? 's' : ''}`;
  } else if (hoursDifference < 24) {
    timeString = `Hace ${hoursDifference} hora${hoursDifference !== 1 ? 's' : ''}`;
  } else if (daysDifference < 7) {
    timeString = `Hace ${daysDifference} día${daysDifference !== 1 ? 's' : ''}`;
  } else {
    const weeksDifference = Math.floor(daysDifference / 7);
    timeString = `Hace ${weeksDifference} semana${weeksDifference !== 1 ? 's' : ''}`;
  }

  return <p>{timeString}</p>;
};

export default TimeDifference;
