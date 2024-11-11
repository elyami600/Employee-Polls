import * as React from 'react';
import { render, screen, fireEvent, userEvent} from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../reducers'; 
import middleware from "../middleware"
import Login from '../components/Login';
import { MemoryRouter } from "react-router";

const store = createStore(reducers, middleware);

describe('Login' , () => {
    const component = () => {
        render(
            <MemoryRouter>
                <Provider store={store}>
                    <Login />
                </Provider>
            </MemoryRouter>
        );
    };
 
    it("renders the component", () => {
        const { container } = render(
            <MemoryRouter>
                <Provider store={store}>
                    <Login />
                </Provider>
            </MemoryRouter>
        );
        expect(container).toBeDefined();
        expect(container).toMatchSnapshot();
    });

    it("renders username, password inputs, and submit button", () => {
        component()

        expect(screen.getByTestId('username-input')).toBeInTheDocument();
        expect(screen.getByTestId('password-input')).toBeInTheDocument();
        expect(screen.getByTestId('submit-button')).toBeInTheDocument();
        expect(screen.queryByTestId('error-header')).not.toBeInTheDocument();
    });

    it("submits form with valid username and password", () => {
        component()
       
        const username = screen.getByTestId('username-input')
        const password = screen.getByTestId('password-input')
        const button   = screen.getByTestId('submit-button')

        fireEvent.change(username, 'mtsamis');
        fireEvent.change(password, 'xyz123');
        fireEvent.click(button, { name: "Submit" });

        expect(screen.queryByTestId('error-header')).not.toBeInTheDocument();
    }); 

    it("displays an error message if the username and password do not match", () => {
        component()

        const username = screen.getByTestId('username-input')
        const password = screen.getByTestId('password-input')
        const button   = screen.getByTestId('submit-button')

        fireEvent.change(username, { target: { value: 'tylermcginnis' } });
        fireEvent.change(password, { target: { value: 'incore' } });
        fireEvent.click(button);

        expect(screen.queryByTestId('error-header')).toBeInTheDocument();
    });

    it("disables submit button if username or password fields are empty", () => {
       component()
       const username = screen.getByTestId('username-input')
       const password = screen.getByTestId('password-input')
       const button   = screen.getByTestId('submit-button')

       fireEvent.change(username, { target: { value: '' } });
       fireEvent.change(password, { target: { value: '' } });

       expect(button).toBeDisabled();

   });
    
})





