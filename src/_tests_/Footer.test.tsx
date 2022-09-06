import { screen } from '@testing-library/react'

// We're using our own custom render function and not RTL's render.
import { renderWithProviders } from '../utils/test-utils'
import Footer from '../components/Footer';


describe("Footer", ()=>{
    test('Footer must display 2022 Zellahs Inc', ()=>{
        renderWithProviders(<Footer />);
        const footerInfo = screen.getByRole('footer');
        console.log('footerInfo', footerInfo)
        expect(footerInfo).toBeInTheDocument();
    })
})