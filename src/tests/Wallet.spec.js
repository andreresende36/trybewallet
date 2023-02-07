import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';

describe('Teste da página Wallet', () => {
  it('Testa se o email que está salvo no estado global é mostrado no componente Header', () => {
    const { store } = renderWithRouterAndRedux(
      <Wallet />,
      { initialState: { user: { email: 'teste@trybe.com.br' } } },
    );
    const emailDisplay = screen.getByTestId('email-field').textContent;
    expect(emailDisplay).toContain(store.getState().user.email);
  });

  it('Testa se o total que está salvo no estado global é mostrado no componente Header', () => {
    const { store } = renderWithRouterAndRedux(<Wallet />);
    const totalDisplay = screen.getByTestId('total-field').textContent;
    const storedTotal = store.getState().wallet.total;
    expect(parseFloat(storedTotal).toFixed(2)).toBe(totalDisplay);
  });
  it('', () => {

  });
  it('', () => {

  });
  it('', () => {

  });
  it('', () => {

  });
});
