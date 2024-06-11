export default (time: string) => {
  const timestamp = new Date(time);
  const hours = timestamp.getUTCHours();
  const minutes = timestamp.getUTCMinutes();

  let hoursClockwise = hours % 12;
  hoursClockwise = hoursClockwise === 0 ? 12 : hoursClockwise;

  return `${hoursClockwise} h ago`;
};
