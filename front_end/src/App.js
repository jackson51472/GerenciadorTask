import logo from './logo.svg';
import './App.css';
import NavBar from "./pages/component/NavBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Sidebar from "./pages/component/Sidebar";
import Home from "./pages/Home"; // Para Bootstrap 5


function App() {
  return (
    <div className="App">
        <Home/>
    </div>
  );
}

export default App;
