import NavBar from "./component/NavBar";
import Sidebar from "./component/Sidebar"; // Para Bootstrap 5


function Home() {
    return (
        <div className="App">
            <NavBar />
            <Sidebar/>
        </div>
    );
}

export default Home;
