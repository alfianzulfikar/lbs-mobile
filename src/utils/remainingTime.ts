export const remainingTime = (target: string | number) => {
  const currentDate = new Date().getTime();
  const targetDate = new Date(target).getTime();
  const timeleft = targetDate - currentDate;

  let days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
  let hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));

  return days > 0
    ? `${days} hari, ${hours} jam`
    : hours > 0
    ? `${hours} jam, ${minutes} menit`
    : minutes > 0
    ? `${minutes} menit`
    : '';
};
