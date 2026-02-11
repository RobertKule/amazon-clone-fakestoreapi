import './App.css';
import Header from './components/layout/Header';
import Cart from "./pages/Cart";

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
      </main>
    </div>
  );
}

export default App;