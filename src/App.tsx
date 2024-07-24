import { useState, useEffect } from 'react';
import { PruebaData } from './models/pruebaData.model';
import { fetchPruebaCollectionData } from './services/fetchPrueba.service';


const App = () => {
  const [pruebaData, setPruebaData]: [PruebaData[], any] = useState([]);

  useEffect(() => {
    

    const resp:any = fetchPruebaCollectionData();

    setPruebaData(resp);
  }, []);

  return (
    <div>
      {pruebaData.map((prueba: PruebaData) => (
        
        <p key={prueba.id}>{prueba.id} {prueba.name} {prueba.provincias}</p>
        
      ))}
    </div>
  );
};

export default App;