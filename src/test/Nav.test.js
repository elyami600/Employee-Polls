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
        fireEvent.click(screen.getByText('Home'))
        expect(screen.getByText('Home')).toBeInTheDocument();

        fireEvent.click(screen.getByText('Leaderdboard'))
        expect(screen.getByText('Leaderdboard')).toBeInTheDocument();

        fireEvent.click(screen.getByText('New Question'))
        expect(screen.getByText('New Question')).toBeInTheDocument();

        fireEvent.click(screen.getByText('Loging'))
        expect(screen.getByText('Loging')).toBeInTheDocument();
    }); 
    
})


