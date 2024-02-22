
import { useEffect, useLayoutEffect, useState } from 'react';
import './App.css'
import Container from './components/Container/Container';
import DetailsPopup from './components/DetailsPopup/DetailsPopup';
import FAB from './components/FAB/FAB';
import NavBar from './components/NavBar/NavBar'
import Overlay from './components/Overlay/Overlay';
import TopBar from './components/TopBar/TopBar'
import { getAllPost } from './service/server';
import LostCard from './components/LostCard/LostCard';
import { Route, Routes } from 'react-router-dom';
import Page from './components/Pages/Page';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [cardData, setCardData] = useState([]);

  async function getData() {
    const data = await getAllPost();
    if(data){
      setIsLoading(false);
      setCardData(() => {
        return data;
      });
    }else{
      setIsLoading(false);
      alert('Something fucked up!');
    }
  }

  useEffect(() => {
    getData();
  }, []);
  
  let user_rollno = "220701317";

  return (
    <>
      <TopBar />
      <NavBar />
      <Routes>
        <Route path='/' element={<Page card={cardData.map(card => <LostCard key={card._id} cardData={card} isProfile={false}/>)} isLoading={isLoading}/>}/>
        <Route path='/profile' element={<Page card={cardData.filter(card => card.rollno == user_rollno).map(card => <LostCard key={card._id} cardData={card} isProfile={true}/>)} isLoading={isLoading}/>}/>
      </Routes>
      <FAB />
    </>
  )
}

export default App;
