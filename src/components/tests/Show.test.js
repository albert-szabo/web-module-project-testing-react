import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';

import userEvent from '@testing-library/user-event';

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
}

test('renders without errors', () => { 
    render(<Show show={testShow} selectedSeason={'none'} />);
 });

test('renders Loading component when prop show is null', () => { 
    render(<Show show={null} />);

    const loadingContainer = screen.queryByTestId('loading-container');

    expect(loadingContainer).toBeInTheDocument();
 });

test('renders same number of options seasons are passed in', () => { 
    render(<Show show={testShow} selectedSeason={'none'} />);

    const seasonOptions = screen.queryAllByTestId('season-option');

    expect(seasonOptions).toHaveLength(3);
 });

test('handleSelect is called when an season is selected', () => { 
    const mockHandleSelect = jest.fn();
    render(<Show show={testShow} selectedSeason={'none'} handleSelect={mockHandleSelect} />);

    const selection = screen.getByLabelText(/Select a Season/i);
    userEvent.selectOptions(selection, ['9803']);

    expect(mockHandleSelect).toBeCalled();
 });

test('component renders when no seasons are selected and when rerenders with a season passed in', () => { 
    const { rerender } = render(<Show show={testShow} selectedSeason={'none'} />);
    let episodesComponent = screen.queryByTestId('episodes-container');
    expect(episodesComponent).not.toBeInTheDocument();

    rerender(<Show show={testShow} selectedSeason={1} />);
    episodesComponent = screen.queryByTestId('episodes-container');
    expect(episodesComponent).toBeInTheDocument();
 });
