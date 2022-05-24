import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Display from './../Display';

import userEvent from '@testing-library/user-event';

import mockFetchShow from './../../api/fetchShow';
jest.mock('./../../api/fetchShow');

const testShow = {
    name: 'Test Show',
    summary: 'This is a test summary.',
    seasons: [
        {
            id: 9801,
            name: 'Test Season 1',
            episodes: []
        },
        {
            id: 9802,
            name: 'Test Season 2',
            episodes: []
        },
        {
            id: 9803,
            name: 'Test Season 3',
            episodes: []
        }
    ]
};

test('renders without errors with no props', () => { 
    render(<Display />);
 });

test('renders Show component when the button is clicked ', async () => { 
    mockFetchShow.mockResolvedValueOnce(testShow);

    render(<Display />);
    const button = screen.getByRole('button');
    userEvent.click(button);

    const showContainer = await screen.findByTestId('show-container');
    expect(showContainer).toBeInTheDocument();
 });

test('renders show season options matching your data when the button is clicked', async () => { 
    mockFetchShow.mockResolvedValueOnce(testShow);

    render(<Display />);
    const button = screen.getByRole('button');
    userEvent.click(button);

    await waitFor(() => {
        const seasonOptions = screen.queryAllByTestId('season-option');
        expect(seasonOptions).toHaveLength(3);
    });
 });

 test('calls the function passed as an optional functional prop when the fetch button is clicked', async () => { 
    mockFetchShow.mockResolvedValueOnce(testShow);
    const mockDisplayFunction = jest.fn();

    render(<Display displayFunc={mockDisplayFunction} />);
    const button = screen.getByRole('button');
    userEvent.click(button);

    await waitFor(() => {
        expect(mockDisplayFunction).toHaveBeenCalled();
    });
});
