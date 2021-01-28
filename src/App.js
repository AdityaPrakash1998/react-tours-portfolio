import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project'
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [tours,setTours]=useState([]);

  const removeTour = (id) =>{
    const newTours = tours.filter(tour=>tour.id!==id);
    setTours(newTours);
  }

  const fetchTours = async ()=>{
    setIsLoading(true);
    try{
      const res=await fetch(url);
      const tours=await  res.json();
      setIsLoading(false);
      
      setTours(tours);
    }catch(err){
      setIsLoading(false);
      console.log(err);
    }
  };

  useEffect(()=>{
    fetchTours();
  },[]);

  
  if(isLoading){
    return <main>
      <Loading/>
    </main>
  }

  if(tours.length === 0 ){
    return (
      <main>
        <div className="title">
          <h2>No Tours</h2>
          <button className="btn" onClick={fetchTours}>Get Tours</button>
        </div>
      </main>
    );
  }

  return <main>
    <Tours tours={tours} removeTour={removeTour}/>
  </main>
}

export default App
