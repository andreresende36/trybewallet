const BASE_URL = 'https://economia.awesomeapi.com.br/json/all';

const getCurrencies = () => {
  // const response = await fetch(BASE_URL);
  // const data = await response.json();
  // return Object.keys(data).filter((currency) => currency !== 'USDT');

  const currencies = fetch(BASE_URL)
    .then((response) => response.json())
    .then((data) => Object.keys(data).filter((currency) => currency !== 'USDT'));
  return currencies;
};

export default getCurrencies;
