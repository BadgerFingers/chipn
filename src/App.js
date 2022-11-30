import React from 'react';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import 'animate.css';
import CreateAccount from './comps/Signup/CreateAccount';
import Splash from './comps/Splash';
import Payment from './comps/Payment/Payment';
import Campaign from './pages/Campaign';
import Login from './comps/Login/Login';
import Dashboard from './comps/Dashboard/Dashboard';
import SwUpdate from './comps/SwUpdate/SwUpdate';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBu6f-hg2N2NaYtMIVl_le-qb_yiRN3sP0",
  authDomain: "chippin-27e57.firebaseapp.com",
  projectId: "chippin-27e57",
  storageBucket: "chippin-27e57.appspot.com",
  messagingSenderId: "247766600402",
  appId: "1:247766600402:web:c4608d8b753e9636003b0b",
  measurementId: "G-ZRDZDNF0FM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


function App() {
  const [isCreateAccount, setIsCreateAccount] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [showDashboard, setShowDashboard] = useState(true);

  const loginSuccessHandler = () => {
    setIsLogin(false);
    setShowDashboard(true);
  }
  console.log('Is Latest Version')

  return (
    <div className='container mx-auto h-full overflow-hidden'>
      { localStorage.getItem('swUpdate') === 'true' && <SwUpdate msg="New content is available and will be used when all tabs for this page are closed." /> }
      <Routes>
        <Route
          path="/"
          element={ <>
          <Splash
            triggerCreateAcc={ () => setIsCreateAccount(true)}
            triggerLogin={ () => setIsLogin(true) }
          />
          { isCreateAccount && <CreateAccount db={db} active={isCreateAccount} closeCreateAcc={ () => setIsCreateAccount(false) } /> }
          { isLogin && <Login db={db} active={isLogin} closeLogin={ () => setIsLogin(false) } success={() => loginSuccessHandler()} /> }
          { showDashboard && <Dashboard db={db} active={showDashboard} closeDashboard={ () => setShowDashboard(false)} /> }
          </>}
        />
        <Route path='/payment' element={ <Payment /> } />
        <Route path='/campaign' element={ <Campaign db={db} /> } />
      </Routes>
    </div>
  );
}

export default App;
