import mockData from './mockData';
import { getCurrencies, getExchangeRates } from '../../services/api';

describe('Testa as funções que conectam com a API', () => {
  it('Teste se o retorno do array de moedas da API está correto', async () => {
    const filteredMockData = Object.keys(mockData).filter((item) => item !== 'USDT');
    const response = await getCurrencies();
    expect(filteredMockData.sort()).toEqual(response.sort());
  });

  it('Teste se o retorno das cotações das moedas da API está correto', async () => {
    const currencies = Object.keys(mockData).filter((item) => item !== 'USDT');
    const currenciesKeys = Object.keys(mockData[currencies[0]]);
    const response = await getExchangeRates();
    currencies.forEach((currency) => {
      expect(response).toHaveProperty(currency);
      currenciesKeys.forEach(
        (currencyKey) => expect(response[currency]).toHaveProperty(currencyKey),
      );
    });
  });
});
