//import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, useHistory,Navigate    } from "react-router-dom";
import CreateProjectCard from './Components/create_project';
import Projects from './Components/display_projects';
import HomeDashboard from './Components/homedashboard';
//import MenuAppBar from './Components/nav_bar';
import OutlinedCard from './Components/test';
import SignupForm from './Components/Signup';
import LoginForm from './Components/Login';
import REP from './Components/rep';
import REP2 from './Components/rep2';
import Chat from './Components/chat';
//import Test1 from './Components/imported';
import Comment from './Components/comment';



function App() {
  return (
        <BrowserRouter>
          <Routes>
             {/*<Route path="/" element={<Test1/>}/> */}
          <Route path='/' element={<LoginForm/>}/>
          <Route path='/Signup' element={<SignupForm/>}/>
            <Route path='/createcard' element={<CreateProjectCard/>}/>
            <Route path='/request' element={<Projects/>}/>
            <Route path='/homedashboard' element={<HomeDashboard/>}/>
            <Route path='/card' element={<OutlinedCard/>}/>
            <Route path='/rep' element={<REP/>}/>
            <Route path='/rep/:proid/:week' element={<REP2/>}/>
            <Route path='/c' element={<Chat/>}/>
            <Route path='/com' element={<Comment/>}/>
            
           
          </Routes>

        </BrowserRouter>
        );
}

export default App;
