import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import HowItWorks from "../components/HowItWorks";
import Nav from "../components/Nav";

function Home() {
  return (
    <div className="home-page flex flex-col min-h-screen">
      <Nav />

 
   <HeroSection />  

<HowItWorks />
      <Footer />
    </div>
  );
}

export default Home;