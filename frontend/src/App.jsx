import {Routes, Route} from 'react-router-dom';
// import React from 'react';
import Home from './links/Home';
import Createbook from './links/Createbook';
import DeleteBook from './links/DeleteBook';
import EditBook from './links/EditBook';
import BrowseBook from './links/BrowseBook';


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/books/create' element={<Createbook />} />
      <Route path='/books/browse/:id' element={<BrowseBook />} />
      <Route path='/books/update/:id' element={<EditBook />} />
      <Route path='/books/delete/:id' element={<DeleteBook />} />
    </Routes>
  )
}

export default App