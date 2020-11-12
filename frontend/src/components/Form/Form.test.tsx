import React from 'react';

import { act, render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Form } from './Form';

describe('Form Test Suite', () => {
    let container: any = null;

    const setData = () => {};
    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });
    afterEach(() => {
        container.remove();
        container = null;
    });

    test('Form should render without crashing', async () => {
        await act(async () => {
            render(<Form setData={setData} />, container);
        });
    });
    test('Each input should have a label', async () => {
        await act(async () => {
            render(<Form setData={setData}/>, container);
        });
        const name_label = screen.getByLabelText(/Name/i);
        expect(name_label).toBeInTheDocument();
        const email_label = screen.getByLabelText(/Email/i);
        expect(email_label).toBeInTheDocument();
        const children_label = screen.getByLabelText(/Number of children/i);
        expect(children_label).toBeInTheDocument();
        const birthday_label = screen.getByLabelText(/Birthday/i);
        expect(birthday_label).toBeInTheDocument();
    });

    test('Form tree should match snapshot one', () => {
        const table = renderer.create(<Form setData={setData}/>)
        const tree = table.toJSON();
        expect(tree).toMatchSnapshot();
    });
})