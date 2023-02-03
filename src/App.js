import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import Search from './components/search/search';
import Item from './components/item/item';
import { categories } from '../src/data/mockData.js'
import { Container } from 'react-bootstrap';


const App = () => {

  
  const [searchTerm, setSearchTerm] = useState("");
  const [business, setBusiness] = useState([]);

  console.log("App " + searchTerm);
  
  return (
   <div className='App'>
      <Search title={searchTerm} />
      <Container className='categories'>
        {categories.map((categorie) => (
          <Item 
           key={categorie.id}
           img={categorie.img}
           name={categorie.name}
          //  nextFuncName={categorie.Categories.nextFuncName} 
          />
        ))}      
      </Container>
   </div>
  );
}

export default App;
