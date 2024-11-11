import * as React from 'react';
import { render, screen, fireEvent, userEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../reducers'; 
import middleware from "../middleware"
import { MemoryRouter } from "react-router";
import NewQuestion from '../components/NewQuestion';

const store = createStore(reducers, middleware);

describe('NewQuestion' , () => {
    it("should render the component", () => {
        const component = render(
            <MemoryRouter>
                <Provider store={store}>
                <NewQuestion/>
                </Provider>
            </MemoryRouter>
        );
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
      });
      
    it("optionOne , optioneTwo and submit are successful in page", () => {
        render(
            <MemoryRouter>
                <Provider store={store}>
                    <NewQuestion />
                </Provider>
            </MemoryRouter> 
        );
        expect(screen.getByTestId('optionOne-input')).toBeInTheDocument();
        expect(screen.getByTestId('optionTwo-input')).toBeInTheDocument();
        expect(screen.getByTestId('submit-button')).toBeInTheDocument();
        
       
        // navagate to home page 
        const button = screen.getByTestId('submit-button')
        expect(button).toBeInTheDocument();
        fireEvent.click(button); 
    }); 
    
})





