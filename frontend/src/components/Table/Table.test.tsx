import React from 'react';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { MyTable, Data } from './Table';

function createData(
    id: number | string,
    name: string,
    email: string,
    kids: number,
    date: Date,
): Data {
    if (typeof id === 'number') {
        id = id.toString();
    }
    return { id, name, email, kids, date: date.toISOString().split('T')[0] };
}

const rows = [
    createData(1, 'Adam Smith', 'adamsmith@gmail.com', 1, new Date()),
    createData(2, 'John Smith', 'johnsmith@gmail.com', 2, new Date('1975-01-01')),
    createData(3, 'Jake Smith', 'jakesmith@gmail.com', 3, new Date()),
    createData(4, 'Jack Smith', 'jacksmith@gmail.com', 4, new Date()),
    createData(5, 'Jill Smith', 'jillsmith@gmail.com', 151, new Date()),
    createData(6, 'John Smith', 'johnsmith@gmail.com', 15, new Date()),
    createData(7, 'John Smith', 'johnsmith@gmail.com', 10, new Date()),
    createData(8, 'John Smith', 'johnsmith@gmail.com', 5, new Date()),
    createData(9, 'John Smith', 'johnsmith@gmail.com', 1, new Date()),
    createData(10, 'John Smith', 'johnsmith@gmail.com', 1, new Date())
];

describe('Table Test Suite', () => {
    let container: any = null;
    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
    });
    afterEach(() => {
        container.remove();
        container = null;
    });
    test('Table should render without crashing', () => {
        render(<MyTable rows={rows} />);
    });

    test('Table tree should match snapshot one', () => {
        const table = renderer.create(<MyTable rows={rows} />)
        const tree = table.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
