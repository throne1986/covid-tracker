import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { fireEvent, screen } from '@testing-library/react'

// We're using our own custom render function and not RTL's render.
import { renderWithProviders } from '../utils/test-utils'
// import Home from '../components/Home';
import AllCountries from '../components/AllCountries';

export const handlers = [
    rest.get('/api/countries', (req, res, ctx) => {
        console.log('ctx', ctx)
      return res(ctx.json("France"), ctx.delay(150))
    })
  ]

const server = setupServer(...handlers)

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close());

test('fetches & receives a list of countries', async () => {
    renderWithProviders(<AllCountries />)
    // after some time, the user should be received
    expect(await screen.findByText(/France/i)).toBeInTheDocument()
})