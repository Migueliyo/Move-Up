import moment from 'moment';

const TimeDifferenceComment = ({ timestamp }: any) => {
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
    timeString = `${secondsDifference} s`;
  } else if (minutesDifference < 60) {
    timeString = `${minutesDifference} min`;
  } else if (hoursDifference < 24) {
    timeString = `${hoursDifference} h`;
  } else if (daysDifference < 7) {
    timeString = `${daysDifference} d`;
  } else {
    const weeksDifference = Math.floor(daysDifference / 7);
    timeString = `${weeksDifference} sem`;
  }

  return <>{timeString}</>;
};

export default TimeDifferenceComment;
