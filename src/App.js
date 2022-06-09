import { useSelector } from "react-redux";
import "./App.scss"
import Blog from "./Components/BlogPage/Blog";
import LandingPage from './Components/LandingPage/LandingPage';
import NavBar from "./Components/NavBar/NavBar";
import { selectSignedIn } from "./features/userSlice";

function App() {
  const isSignedIn = useSelector(selectSignedIn)
  return (
    <div className="App">
      <NavBar/>
      <LandingPage/>
      {isSignedIn &&
       <Blog />}
    </div>
  );
}

export default App;
