import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithProviders } from '../utils/test-utils'

describe('App', () => {
    
    it('renders page title global!', () => {
        renderWithProviders(<App />)
        const linkElement = screen.getByText(/Global/i);
        expect(linkElement).toBeInTheDocument();
    });

});
