
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateProjectCard from './Components/create_project';
import Projects from './Components/display_projects';
import SignupForm from './Components/Signup';
import LoginForm from './Components/Login';
import REP from './Components/rep';
import REP2 from './Components/rep2';


function App() {
  return (
        <BrowserRouter>
          <Routes>
          <Route path='/' element={<LoginForm/>}/>
          <Route path='/Signup' element={<SignupForm/>}/>
          <Route path='/createcard' element={<CreateProjectCard/>}/>
          <Route path='/request' element={<Projects/>}/>
          <Route path='/rep' element={<REP/>}/>
          <Route path='/rep/:proid/:week' element={<REP2/>}/>
          </Routes>
        </BrowserRouter>
        );
}

export default App;
