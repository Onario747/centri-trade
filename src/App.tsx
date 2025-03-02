import Hero from "./components/hero";
import Navigation from "./components/Navigation";

function App() {
  return (
    <main className="bg-black min-h-screen h-screen relative">
      <img
        src="/assets/svg/nav-ellipse.svg"
        alt="Nav ellipse"
        className="absolute top-0"
      />
      <img src="/assets/svg/star1.svg" alt="star-left" className="absolute left-0" />
      <img src="/assets/svg/star2.svg" alt="star-right" className="absolute right-0" />
      <Navigation />
      <Hero />
    </main>
  );
}

export default App;
