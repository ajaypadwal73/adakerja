const { isDateValid } = require('../src/controllers/helpers');

const inputDate = [
    {
        date: '26/01/2020',
        expected: true,
    },
    {
        date: '26-01-2020',
        expected: true,
    },
    {
        date: '2020/01/26',
        expected: true,
    },
    {
        date: '2020-01-26',
        expected: true,
    },
    {
        date: '01/26/2020',
        expected: true,
    },
    {
        date: '01-26-2020',
        expected: true,
    },
    {
        date: '14/14/2021',
        expected: false,
    },
    {
        date: 'abcd',
        expected: false,
    },
    {
        date: '',
        expected: false,
    },
    {
        expected: false,
    }

]
test('testing isDateValid function', () => {
    inputDate.forEach(({ date, expected }) => {
        expect(isDateValid(date)).toBe(expected);
    });
})