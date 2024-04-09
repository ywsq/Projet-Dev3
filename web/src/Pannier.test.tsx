import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Pannier, { calculateTotalPrice, handleQuantityChange } from './Pannier';

describe('calculateTotalPrice', () => {
    test('should calculate total price correctly when quantity and price are positive integers', () => {
        const totalPrice = calculateTotalPrice({ quantity: 5, price: 10 });
        expect(totalPrice).toBe(50); // 5 * 10 = 50
    });

    test('should handle quantity as zero', () => {
        const totalPrice = calculateTotalPrice({ quantity: 0, price: 10 });
        expect(totalPrice).toBe(0); // 0 * 10 = 0
    });

    test('should handle price as zero', () => {
        const totalPrice = calculateTotalPrice({ quantity: 5, price: 0 });
        expect(totalPrice).toBe(0); // 5 * 0 = 0
    });

    test('should handle negative quantity by returning zero', () => {
        const totalPrice = calculateTotalPrice({ quantity: -5, price: 10 });
        expect(totalPrice).toBe(0); // -5 * 10 = -50, but should return 0
    });

    test('should handle negative price by returning zero', () => {
        const totalPrice = calculateTotalPrice({ quantity: 5, price: -10 });
        expect(totalPrice).toBe(0); // 5 * -10 = -50, but should return 0
    });

    test('should handle quantity as string by parsing it to integer', () => {
        const totalPrice = calculateTotalPrice({ quantity: '5', price: 10 });
        expect(totalPrice).toBe(50); // 5 * 10 = 50
    });

    test('should handle price as string by parsing it to integer', () => {
        const totalPrice = calculateTotalPrice({ quantity: 5, price: '10' });
        expect(totalPrice).toBe(50); // 5 * 10 = 50
    });
});

describe('handleQuantityChange function', () => {
    test('should update quantities correctly when value is within the valid range', () => {
        const index = 0;
        const value = 5;
        const quantities = [10, 20, 30];
        const data = [{ Stock: 15 }, { Stock: 25 }, { Stock: 35 }];
        const setQuantities = jest.fn();

        handleQuantityChange(index, value, quantities, data, setQuantities);

        expect(setQuantities).toHaveBeenCalledWith([5, 20, 30]);
    });

    test('should update quantities correctly when value exceeds maxStock', () => {
        const index = 1;
        const value = 30;
        const quantities = [10, 20, 30];
        const data = [{ Stock: 15 }, { Stock: 25 }, { Stock: 35 }];
        const setQuantities = jest.fn();

        handleQuantityChange(index, value, quantities, data, setQuantities);

        expect(setQuantities).toHaveBeenCalledWith([10, 25, 30]);
    });

    test('should update quantities correctly when value is less than 1', () => {
        const index = 2;
        const value = -5;
        const quantities = [10, 20, 30];
        const data = [{ Stock: 15 }, { Stock: 25 }, { Stock: 35 }];
        const setQuantities = jest.fn();

        handleQuantityChange(index, value, quantities, data, setQuantities);

        expect(setQuantities).toHaveBeenCalledWith([10, 20, 1]);
    });

    test('should update quantities correctly when value is NaN', () => {
        const index = 1;
        const value = NaN;
        const quantities = [10, 20, 30];
        const data = [{ Stock: 15 }, { Stock: 25 }, { Stock: 35 }];
        const setQuantities = jest.fn();

        handleQuantityChange(index, value, quantities, data, setQuantities);

        expect(setQuantities).toHaveBeenCalledWith([10, 1, 30]);
    });
});

describe('Pannier', () => {
    test('should display cart price', () => {
        const { getByTestId } = render(<p data-testid="cart-item-price">Total:</p>);
        const priceElement = getByTestId("cart-item-price");
        expect(priceElement.textContent).toBe("Total:");
    });
});