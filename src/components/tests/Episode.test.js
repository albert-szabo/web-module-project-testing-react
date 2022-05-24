import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Episode from './../Episode';

const testEpisode = {
    id: 9801,
    name: 'Test Episode',
    image: 'http://static.tvmaze.com/uploads/images/medium_landscape/67/168918.jpg',
    season: 9801,
    number: 9801,
    summary: 'This is a test summary.',
    runtime: 9801
}

test("renders without error", () => { });

test("renders the summary test passed as prop", () => { });

test("renders default image when image is not defined", () => { });
