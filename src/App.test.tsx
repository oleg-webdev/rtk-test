import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Provider, } from 'react-redux';
import { store } from './app/store';
import App from './App';

it('renders learn react link', () => {
    const { getByText } = render(
        <Provider store={store}>
            <App />
        </Provider>
    );

    expect(getByText(/learn/i)).toBeInTheDocument();
});

it('reflect correct number value', () => {
    const { getByText } = render(
        <Provider store={store}>
            <App />
        </Provider>
    );
    fireEvent.click(getByText('Add Amount'));

    expect(store.getState().counter.value).toBeGreaterThanOrEqual(2);
});
