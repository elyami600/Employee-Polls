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
    it("should render the component", () => {
        const component = render(
            <MemoryRouter>
                <Provider store={store}>
                    <Login />
                </Provider>
            </MemoryRouter>
        );
        expect(component).toBeDefined();
        expect(component).toMatchSnapshot();
      });
    it("username, password, and submit are successful in page", () => {
        render(
            <MemoryRouter>
                <Provider store={store}>
                    <Login />
                </Provider>
            </MemoryRouter>
        );
        expect(screen.getByTestId('username-input')).toBeInTheDocument();
        expect(screen.getByTestId('password-input')).toBeInTheDocument();
        expect(screen.getByTestId('submit-button')).toBeInTheDocument();
        expect(screen.queryByTestId('error-header')).not.toBeInTheDocument();
       
        // navagate to home page 
        const button = screen.getByTestId('submit-button')
        expect(button).toBeInTheDocument();
        fireEvent.click(button);

        fireEvent.change(screen.getByTestId('username-input'), 'mtsamis');
        fireEvent.change(screen.getByTestId('password-input'), 'xyz123');
        fireEvent.click(screen.getByTestId("submit-button", { name: "Submit" }));


      
    }); 
    it('username and password are correct  or exist in datebase', () => {
         render(
            <MemoryRouter>
                <Provider store={store}>
                    <Login />
                </Provider>
            </MemoryRouter>
        );
        const username = screen.getByTestId('username-input')
        const password = screen.getByTestId('password-input')
        const button   = screen.getByTestId('submit-button')

        fireEvent.change(username, { target: { value: 'tylermcginnis' } });
        fireEvent.change(password, { target: { value: 'abc321' } });
        fireEvent.click(button);

        expect(screen.queryByTestId('error-header')).not.toBe("Error: Please ensure all fields are filled out.")
    })
    it('disables input when username and password are empty', () => {
        render(
           <MemoryRouter>
               <Provider store={store}>
                   <Login />
               </Provider>
           </MemoryRouter>
       );
       const username = screen.getByTestId('username-input')
       const password = screen.getByTestId('password-input')
       const button   = screen.getByTestId('submit-button')

       fireEvent.change(username, { target: { value: '' } });
       fireEvent.change(password, { target: { value: '' } });

       expect(button).toBeDisabled();

   })
    // it('display an error messange if password is incorrect', () => {
    // render(
    //     <MemoryRouter>
    //         <Provider store={store}>
    //             <Login />
    //         </Provider>
    //     </MemoryRouter>
    // );
    // const username = screen.getByTestId('username-input')
    // const password = screen.getByTestId('password-input')
    // const button   = screen.getByTestId('submit-button')

    // fireEvent.change(username, { target: { value: 'tylermcginnis' } });
    // fireEvent.change(password, { target: { value: 'password' } });
    // fireEvent.click(button);

    // expect(screen.queryByTestId('error-header')).not.toBe("Error: Please ensure all fields are filled out.")

    // })

    
    
})





