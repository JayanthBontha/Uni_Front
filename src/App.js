import React from 'react';
import Reset from "./components/Reset"
import Login from "./components/Log"
import Home from "./components/Home"
import Sign from "./components/SignUp"
import Search from './components/Search';
import Prof2 from './components/Prof2';
import Mix from './components/Mix_Nav';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { useState, useEffect } from 'react';
import Terminator from './components/terminage';
import Change from './components/Change';
import M from './components/modify';



function App() {

  if (sessionStorage.getItem("NavbarVar") == null) {
    sessionStorage.setItem('NavbarVar', 'NonUser');
    sessionStorage.setItem('dis','loading')
  }
  const [NavbarVar, SetNavbarVar] = useState(sessionStorage.getItem('NavbarVar'));
  const [Nm,SetNm] = useState(sessionStorage.getItem('dis'))

  useEffect(() => {
    window.addEventListener('change-nav', (e) => {
      SetNavbarVar(e.detail.type);
      sessionStorage.setItem('NavbarVar', e.detail.type);
      SetNm(e.detail.nme);
      sessionStorage.setItem('dis',e.detail.nme)
    });
  });


  return (<>
    <BrowserRouter>
      <Mix Var={NavbarVar} UsrNam={Nm} />
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route path="/view-data" element={<div className='back-white fitmax'><Search/></div>}/>
        <Route exact path='/login' element={<Login />}/>
        <Route exact path='/resetPassword' element={<Reset />}/>
        <Route exact path='/signUp' element={<Sign />}/>
        <Route exact path='/profile' element={<Prof2/>}/>
        <Route exact path='/terminate' element = {<Terminator/>}/>
        <Route exact path='/changePass' element = {<Change/>}/>
        <Route exact path='/modify' element={<M/>}/>
        {/* <Route exact path="/as" element={<As/>}/> */}
      </Routes>
    </BrowserRouter>
  </>
  );

};
export default App;