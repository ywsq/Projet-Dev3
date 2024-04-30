import React, { isValidElement } from "react";
import { render, getByText } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import Products from './Products';

export function renderWithRouter(children, routes = []) {
    const options = isValidElement(children)
        ? { element: children, path: "/" }
        : children;

    const router = createMemoryRouter([{ ...options }, ...routes], {
        initialEntries: [options.path],
        initialIndex: 1,
    });

    return render(<RouterProvider router={router} />);
}


describe('Products component', () => {
    test('renders without errors', () => {
        const {getByTestId} = renderWithRouter(<Products />);
        // You can add more specific tests here
        const headertext = getByTestId("headerProducts").textContent
        expect(headertext).toBe("test")
    });
});
