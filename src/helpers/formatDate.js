export const formatDate = (date) => {
  const options = {
    timeZone: 'UTC', // EEST time zone
    hour12: false, // Use 24-hour format
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  const formatedDate = date.toLocaleString('en-US', options);

  return formatedDate;
};
