import React from 'react'
import BookCatalog from './components/BookCatalog'
import './App.css'

function App() {
  const handleNewButtonClick = () => {
    alert('Coming Soon!');
  };

  return (
    <div className="App">
      <BookCatalog />
      <button className="new-button" onClick={handleNewButtonClick}>
        New
      </button>
    </div>
  )
}

  export default App
