export const convertToHoursAndMins = (time) => {
  let hours = Math.floor(time / 60);
  let minutes = time % 60;

  if (hours === 0) return minutes + 'min';
  if (minutes === 0) return hours + 'h';

  return hours + 'h ' + minutes + 'min';
};
