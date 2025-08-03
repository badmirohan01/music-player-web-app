const getISTTime = () => {
  const now = new Date();
  // Convert to IST (UTC + 5:30)
  const istOffset = 5.5 * 60 * 60 * 1000; // 5.5 hours in milliseconds
  const istTime = new Date(now.getTime() + istOffset);
  return istTime;
};

const formatSessionTime = (milliseconds) => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  
  return {
    milliseconds,
    seconds,
    minutes,
    hours,
    formatted: `${hours}h ${minutes % 60}m ${seconds % 60}s`
  };
}

const getRandomNumber = () => {
  const random = String(Math.floor(Math.random() * 4 + 1)).padStart(2, '0');
  return random;
};

module.exports = {
  getISTTime,
  formatSessionTime,
  getRandomNumber
};