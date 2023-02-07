import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testando a página de Login', () => {
  it('Testa se a página de login tem um campo de inserção de e-mail', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByPlaceholderText('Digite aqui seu e-mail');
    expect(emailInput).toBeInTheDocument();
  });

  it('Testa se a página de login tem um campo de inserção de senha', () => {
    renderWithRouterAndRedux(<App />);
    const passwordInput = screen.getByPlaceholderText('Senha com no mínimo 6 dígitos');
    expect(passwordInput).toBeInTheDocument();
  });

  it('Testa se existe um botão escrito "Entrar" para efetuar o login', () => {
    renderWithRouterAndRedux(<App />);
    const button = screen.getByRole('button', { name: 'Entrar' });
    expect(button).toBeInTheDocument();
  });

  it('Testa se os valores digitados nos campos de inserção são salvos no estado global após o clique no botão "Entrar"', () => {
    const { history, store } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByPlaceholderText('Digite aqui seu e-mail');
    const passwordInput = screen.getByPlaceholderText('Senha com no mínimo 6 dígitos');
    const button = screen.getByRole('button', { name: 'Entrar' });
    const email = 'teste@trybe.com.br';
    const password = '123456';

    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);
    userEvent.click(button);

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');
    const storedEmail = store.getState().user.email;
    expect(storedEmail).toBe(email);
  });
});
