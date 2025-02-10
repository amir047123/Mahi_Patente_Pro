
import './App.css'
import Hero from './Components/Home/Hero';
import MobileApp from './Components/Home/MobileApp';
import SuccessStory from './Components/Home/SuccessStory';
import WhatYouWillLearn from './Components/Home/WhatYouWillLearn';
import WhyChoseUs from './Components/Home/WhyChoseUs';
import Navbar from './Shared/Navbar/Navbar';

function App() {

  return (
    <div className="">
     <Navbar/>
     <Hero/>
     <WhyChoseUs/>
     <WhatYouWillLearn/>
     <MobileApp/>
     <SuccessStory/>
    </div>
  );
}

export default App
