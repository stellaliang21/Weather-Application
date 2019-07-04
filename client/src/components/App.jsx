import React from 'react';
import SearchBar from './SearchBar.jsx';
import '../styles/App.css';

const App = () => {
  return (
    <div className='parentComponent'>
      <div className='heading'>6 Day Weather Forecast</div>
      <SearchBar/>
    </div>
  );
}
    
export default App