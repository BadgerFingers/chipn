import React from 'react';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import 'animate.css';
import CreateAccount from './comps/Signup/CreateAccount';
import Splash from './comps/Splash';
import Payment from './comps/Payment/Payment';
import Campaign from './pages/Campaign';
import Login from './comps/Login/Login';
import Dashboard from './comps/Dashboard/Dashboard';
import CreateCampaign from './pages/CreateCampaign';
import SwUpdate from './comps/SwUpdate/SwUpdate';

import { getAuth } from 'firebase/auth';
import { app } from './firebase-config';

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBu6f-hg2N2NaYtMIVl_le-qb_yiRN3sP0",
//   authDomain: "chippin-27e57.firebaseapp.com",
//   projectId: "chippin-27e57",
//   storageBucket: "chippin-27e57.appspot.com",
//   messagingSenderId: "247766600402",
//   appId: "1:247766600402:web:c4608d8b753e9636003b0b",
//   measurementId: "G-ZRDZDNF0FM"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();



function App() {
  const [isCreateAccount, setIsCreateAccount] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  

  const loginSuccessHandler = () => {
    setIsLogin(false);
    setShowDashboard(true);
  }


  useEffect(() => {
    const userCheck = auth.onAuthStateChanged((user) => {
      if(user){
        console.log(user)
        localStorage.setItem('uid', user.uid);
        setShowDashboard(true);
      } else {
        setShowDashboard(false);
      }
    });
    return () => userCheck();
  }, [])

  return (
    <div className='container mx-auto h-full overflow-hidden'>
      
      { localStorage.getItem('swUpdate') === 'true' && <SwUpdate msg="New content is available and will be used when all cache and tabs for this page are closed." /> }
      <Routes>
        <Route
          path="/"
          element={ <>
          <Splash
            triggerCreateAcc={ () => setIsCreateAccount(true)}
            triggerLogin={ () => setIsLogin(true) }
          />
          { isCreateAccount && <CreateAccount db={db} active={isCreateAccount} closeCreateAcc={ () => setIsCreateAccount(false) } /> }
          { isLogin && <Login db={db} app={app} active={isLogin} closeLogin={ () => setIsLogin(false) } success={() => loginSuccessHandler()} /> }
          { showDashboard && !isCreateAccount && <Dashboard db={db} active={showDashboard} uid={auth.currentUser.uid} closeDashboard={ () => setShowDashboard(false)} /> }
          </>}
        />
        <Route path='/payment' element={ <Payment /> } />
        <Route path='/campaign' element={ <Campaign db={db} /> } />
        <Route path='/create-campaign' element={ <CreateCampaign db={db} /> } />
      </Routes>
    </div>
  );
}

export default App;
