import { cleanup, fireEvent, queryByText, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { rest } from 'msw'
import { setupServer } from 'msw/node'

// We're using our own custom render function and not RTL's render.
import { renderWithProviders } from '../utils/test-utils'
import Users from '../components/Users';

import reducer, {getUsers, deleteUser} from "../reducers/usersReducer";
import {IUsersState} from "../interfaces/interfaces";


afterEach(cleanup);

/**
 * A redux action holds a 'type' and a 'payload'.
 * Payload is the data an action passes to the reducer so that it can be used to update the state of the app.
 * The payload constant below is therefore a mock of the exact kind of payload that our app expects to work with.
 */
const payload =[
    {
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz",
        address: {
          street: "Kulas Light",
          suite: "Apt. 556",
          city: "Gwenborough",
          zipcode: "92998-3874",
          geo: {
            lat: "-37.3159",
            lng: "81.1496"
          }
        },
        phone: "1-770-736-8031 x56442",
        website: "hildegard.org",
        company: {
          name: "Romaguera-Crona",
          catchPhrase: "Multi-layered client-server neural-net",
          bs: "harness real-time e-markets"
        }
      },
]

export const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/users', (req, res, ctx) => {
    return res(ctx.json([{id: 1, name: 'Leanne Graham'}, {id: 3, name: 'Fabrizio Romano'}]))
  })
]
  
  const server = setupServer(...handlers)
  
  // Enable API mocking before tests.
  beforeAll(() => server.listen())
  
  // Reset any runtime request handlers we may add during the tests.
  afterEach(() => server.resetHandlers())
  
  // Disable API mocking after the tests are done.
  afterAll(() => server.close())

describe("Users", ()=>{
    test('It should display a list of users from api', async()=>{
        renderWithProviders(<Users />)
        expect(screen.queryByText(/Fabrizio Romano/i)).not.toBeInTheDocument();
        expect(await screen.findByText(/Fabrizio Romano/i)).toBeInTheDocument();
    })

    // test('it should remove the item', )
})

describe('users reducer', ()=>{

    /**
   * A reducer is a funtion that accepts an initialState and an action.
   * Here, we are defining some actions (pendingAction, fulfilledAction, rejectedAction) and
   * an initialState that we can use to test our reducer:- reducer(state, action).
   * 
   * Take a look at how the action's type property have been defined.We are using the getCoins thunk
   */

    const pendingAction = {type: getUsers.pending};
    const fulfilledAction = {type: getUsers.fulfilled, payload};
    const rejectedAction = {type: getUsers.rejected};

    const initialState: IUsersState = {
        users: [],
        status: "",
    }
    
        /**
         * When the the getUsers thunk is pending, it's only the status that can be updated, in this
         * case, to 'loading'
         */
    it('returns the initial state and set status to loading', () =>{
        expect(reducer(initialState, pendingAction)).toEqual({
            users: [],
            status: 'loading'
        })

    })

    /**
   * When the the getUsers thunk is fulfilled, the status and the coins will be updated
   */

    it ("loads fulfilled state and sets status to succes", ()=>{
      expect(reducer(initialState, fulfilledAction)).toEqual({
        users: [...payload],
        status: "success"
      })
    })


    /**
   * When the the getUsers thunk is rejected, it's only the status that can be updated, in this
   * case, to 'failed'
   */
  it('handles rejected action and set status to failed', () =>{
    expect(reducer(initialState, rejectedAction)).toEqual({
      users: [],
      status: "failed"
    })
  })

  /**
   * Should handle an item being removed from list using redux individual functions
   * Action-Redux: 'delete'
   */

  it("Should handle an item being deleted from list using redux", async()=>{
    const previousState: IUsersState[] = [];

    // expect(reducer(previousState, deleteUser(1))).toEqual{[
      
    // ]}
  })

    /**
   * Should handle a an item being removed from list on user interface when button is clicked
   * Action-UI: 'delete'
   */

    it('Should remove item from list when user clicks a button delete', async()=>{

      renderWithProviders(<Users />);

      const user = await screen.findByText(/Leanne Graham/i);
      expect(user).toBeInTheDocument();
      fireEvent.click(screen.getAllByRole('delete')[0])
    
      await waitFor(() => {
        expect(screen.queryByText(/Leanne Graham/i)).not.toBeInTheDocument();
      })

     
    })
    /**
   * Should handle a an item being added to the list on user interface when button is clicked
   * Action-UI: 'Add'
   */

    it('Should add item to the list', async()=>{

      const userData = {
        id: 20,
        name: "Amanda Zellah"
      }

      renderWithProviders(<Users />);

      const user = await screen.findByText(/Leanne Graham/i);
      expect(user).toBeInTheDocument();
      fireEvent.click(screen.getAllByRole('delete')[0])
    
      await waitFor(() => {
        expect(screen.queryByText(/Leanne Graham/i)).not.toBeInTheDocument();
      })

     
    })

    test("Form submission should go through successfully", () => {
      const mockedAdd = jest.fn() // highlight-line
      renderWithProviders(<Users />);
      const input = screen.getByTestId("add-user");
      const btn = screen.getByTestId("submit-btn");
    
      fireEvent.change(input, { target: { value: "grocery" } });
      fireEvent.click(btn);
    
      expect(mockedAdd).toHaveBeenCalledTimes(1);
    });


})