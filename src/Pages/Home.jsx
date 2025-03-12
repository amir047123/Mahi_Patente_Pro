import Hero from "@/Components/Home/Hero";
import MobileApp from "@/Components/Home/MobileApp";
import SuccessStory from "@/Components/Home/SuccessStory";
import WhatYouWillLearn from "@/Components/Home/WhatYouWillLearn";
import WhyChoseUs from "@/Components/Home/WhyChoseUs";
import Footer from "@/Shared/Footer/Footer";
import Navbar from "@/Shared/Navbar/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <WhyChoseUs />
      <WhatYouWillLearn />
      <MobileApp />
      <SuccessStory />
      <Footer />
    </div>
  );
};

export default Home;
