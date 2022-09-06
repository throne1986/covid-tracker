import { screen } from '@testing-library/react'

// We're using our own custom render function and not RTL's render.
import { renderWithProviders } from '../utils/test-utils'
import Header from '../components/Header';

describe("logo", () =>{

    test('logo must have src="covid.png', ()=>{
        renderWithProviders(<Header />)
        const logo = screen.getByRole('img');
        expect(logo).toHaveAttribute('src', 'covid.png');
        expect(logo).toHaveAttribute('alt', 'logo');
        
    })
})