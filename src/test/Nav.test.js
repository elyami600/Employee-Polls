import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../reducers'; 
import middleware from "../middleware"
import { MemoryRouter } from "react-router";
import Nav from '../components/Nav';

const store = createStore(reducers, middleware);


describe('Nav' , () => {
    it("should render the component", () => {
        const component = render(
            <MemoryRouter>
                <Provider store={store}>
                <Nav/>
                </Provider>
            </MemoryRouter>
        );
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
      });

    it("/home, leaderboard, add and login should redirect and update dom ", () => {
        render(
            <MemoryRouter>
                <Provider store={store}>
                <Nav/>
                </Provider>
            </MemoryRouter>
        );
        fireEvent.click(screen.getByTestId('home'));
        expect(screen.getByTestId('home')).toBeInTheDocument();

        fireEvent.click(screen.getByTestId('leaderboard'));
        expect(screen.getByTestId('leaderboard')).toBeInTheDocument();

        fireEvent.click(screen.getByTestId('newQuestion'));
        expect(screen.getByTestId('newQuestion')).toBeInTheDocument(); 

        
    }); 

})


