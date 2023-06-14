const displayCurrentDate = () => {
  const currentDateElement = document.createElement('div');
  currentDateElement.style.marginTop = '10px';
  currentDateElement.style.marginRight = '20px';
  currentDateElement.style.fontWeight = 'bold';
  currentDateElement.style.color = 'white';
  currentDateElement.style.textAlign = 'end';
  currentDateElement.style.fontSize = '15px';

  const updateMinutesSecondsCount = () => {
    // eslint-disable-next-line no-undef
    const currentDateTime = luxon.DateTime.local();
    const currentDate = currentDateTime.toLocaleString({
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });
    currentDateElement.textContent = `Current Date: ${currentDate} `;
  };

  updateMinutesSecondsCount();
  setInterval(updateMinutesSecondsCount, 1000);
  const navigationBar = document.getElementById('navigationBar');
  navigationBar.insertAdjacentElement('afterend', currentDateElement);
};

export { displayCurrentDate };
