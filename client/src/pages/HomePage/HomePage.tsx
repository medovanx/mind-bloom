import HeroSection from "./HomePageSections/HeroSection/HeroSection";
import CustomHead from '../../components/CustomHead/CustomHead';

import "./HomePage.css";

const HomePage = () => {
  return (
    <main>
      <CustomHead title="Home" />
      <HeroSection />
    </main>
  );
};

export default HomePage;
