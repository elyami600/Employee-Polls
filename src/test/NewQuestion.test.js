import * as React from 'react';
import { render, screen, fireEvent, userEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../reducers'; 
import middleware from "../middleware"
import { MemoryRouter } from "react-router";
import NewQuestion from '../components/NewQuestion';

const store = createStore(reducers, middleware);
const component =  render(
    <MemoryRouter>
        <Provider store={store}>
            <NewQuestion />
        </Provider>
    </MemoryRouter>
);

describe('NewQuestion' , () => {
    it("username, password, and submit are successful in page", () => {
        expect(screen.getByTestId('optionOne-input')).toBeInTheDocument();
        expect(screen.getByTestId('optionTwo-input')).toBeInTheDocument();
        expect(component.getByTestId('submit-button')).toBeInTheDocument();
        
       
        // navagate to home page 
        const button = component.getByTestId('submit-button')
        expect(button).toBeInTheDocument();
        fireEvent.click(button);

        


      
    }); 
    
})





