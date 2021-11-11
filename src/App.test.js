const deleteFunction = require('./App/deleteFunction');

test('adds 1 + 2 to equal 3', () => {
  expect(deleteFunction('Ironman', [{
    name: 'Superman',
    favourite: false
  },
  {
    name: 'Ironman',
    favourite: false
  },])).toEqual([{
    name: 'Superman',
    favourite: false
  }]);
});
