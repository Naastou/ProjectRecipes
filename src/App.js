import Pages from "./pages/Pages";
import Category from "./components/Category";
import { BrowserRouter } from "react-router-dom";
import Search from "./components/Search";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="section">
          <Search />
          <Category />
          <Pages />
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
