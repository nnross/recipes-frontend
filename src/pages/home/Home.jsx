import React from 'react';
import Filter from '../../components/Filter';

const Home = () => {
  const meals = ['breakfast', 'lunch', 'dinner'];
  const diet = ['vegan', 'vegetarian', 'lactose free', 'gluten free'];
  const selectFilter = (item) => {
    console.log(item);
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
      <Filter title="meals" filters={meals} selectFilter={selectFilter} />
      <Filter title="diet" filters={diet} selectFilter={selectFilter} />
    </div>
  );
};

export default Home;
