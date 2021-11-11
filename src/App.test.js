import { addFunction, deleteFunction, favFunction } from './helperfunctions';

test('Add Function Test', () => {
  expect(addFunction('Ironman', [{
    name: 'Superman',
    favourite: false
  }
])).toEqual([{
  name: 'Superman',
  favourite: false
},
{
  name: 'Ironman',
  favourite: false
}]);
});

test('Delete Function Test', () => {
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

test('Favourite Function Test', () => {
  expect(favFunction({
    name: 'Superman',
    favourite: false
  }, [{
    name: 'Superman',
    favourite: false
  }])).toEqual([{
    name: 'Superman',
    favourite: true
  }]);
});