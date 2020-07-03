import React from 'react';
import Table from './components/table';

const colsMetas = [
  {
    name: 'Calories',
    field: 'calories',
  },
  {
    name: 'Fat',
    field: 'fat',
  },
];

const rows = [
  {
    calories: 'Frozen yoghurt',
    fat: 159,
  },
  // {
  //   calories: 'Ice cream sandwich',
  //   fat: 237,
  // },
];

function App() {
  return (
    <div className="App">
      <Table colMetas={colsMetas} rows={rows} />
    </div>
  );
}

export default App;
