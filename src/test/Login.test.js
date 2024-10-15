import * as React from 'react';
import { render, screen, fireEvent, userEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../reducers'; 
import middleware from "../middleware"
import Login from '../components/Login';
import { MemoryRouter } from "react-router";

const store = createStore(reducers, middleware);
const component =  render(
    <MemoryRouter>
        <Provider store={store}>
            <Login />
        </Provider>
    </MemoryRouter>
);

describe('Login' , () => {
    it("username, password, and submit are successful in page", () => {
        expect(screen.getByTestId('username-input')).toBeInTheDocument();
        expect(screen.getByTestId('password-input')).toBeInTheDocument();
        expect(component.getByTestId('submit-button')).toBeInTheDocument();
        expect(component.queryByTestId('error-header')).not.toBeInTheDocument();
       
        // navagate to home page 
        const button = component.getByTestId('submit-button')
        expect(button).toBeInTheDocument();
        fireEvent.click(button);

        fireEvent.change(screen.getByTestId('username-input'), 'mtsamis');
        fireEvent.change(screen.getByTestId('password-input'), 'xyz123');
        fireEvent.click(component.getByTestId("submit-button", { name: "Submit" }));


      
    }); 
    
})





