import './App.css';
import Header from './components/layout/Header';
import Cart from "./pages/Cart";
import ProductDetail from "./pages/Products"

function App() {
  return (
    <div>
      {/* Navbar */}
      <header >
        < Header />
      </header>

      {/* Page */}
      <main className="mt-6">
        <Cart />
        <ProductDetail />
      </main>
    </div>
  );
}

export default App;