import React from 'react';
import { render } from '@testing-library/react';
import Products from './Products';

// Mock the Products component
jest.mock('./Products', () => {
    return jest.fn().mockReturnValue(
        <div>
            {/* Mocked Products component content */}
        </div>
    );
});

describe('App', () => {
    it('renders the entire page with Products component', () => {
        // Render the entire page
        const { getByText, getByTestId } = render(<App />);

        // Assert presence of components or text within the page
        expect(getByTestId('headerProducts')).toBeInTheDocument();
        expect(getByText('Star Mobile.')).toBeInTheDocument();
        // You can add more assertions as needed
    });
});
