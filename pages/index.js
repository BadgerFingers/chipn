// import { Inter } from 'next/font/google';
import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import CreateAccount from '../comps/Signup/CreateAccount';
import Login from '../comps/Login/Login';
import Dashboard from '../comps/Dashboard/Dashboard';

import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { cfg } from '../utils/firebaseConfig';

// Import the functions you need from the SDKs you need
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const app = initializeApp(cfg);
const db = getFirestore(app);
const auth = getAuth();

// const inter = Inter({ subsets: ['latin'] })


export default function Home() {
  const router = useRouter();
  const [isCreateAccount, setIsCreateAccount] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [step, setStep] = useState(1);
  

  const loginSuccessHandler = () => {
    setIsLogin(false);
    setShowDashboard(true);
  }

  const openDashboardHandler = () => {
    setIsCreateAccount(false);
    setShowDashboard(true);
  }


  useEffect(() => {
    const userCheck = auth.onAuthStateChanged((user) => {
      if(user && user.emailVerified){
        console.log(user)
        localStorage.setItem('uid', user.uid);
        setShowDashboard(true);
      }

      if(user && !user.emailVerified){
        setShowDashboard(false);
        setStep(3);
        setIsCreateAccount(true);
      }
      
      if(!user) {
        setShowDashboard(false);
      }
    });
    return () => userCheck();
  }, [])
  return (
    <div className='container mx-auto h-[100vh]'>
      <div className='flex flex-col justify-between py-4 md:py-40 px-10 h-[100vh]'>
            <Image src="/img/chipn-logo.png" alt='chippin logo' className='w-10/12 max-w-[167px] max-h-[67px] mx-auto' width="167" height="67" priority />
            {/* <p className='text-white'>YOKO PUBLIC KEY: {process.env.REACT_APP_YOKO_PK}</p> */}
            
            <div className='w-full md:w-3/12 mx-auto mb-14'>
                <div className='btn btn-gradient mb-4' onClick={() => setIsLogin(true)}>Log in</div>
                <div className='btn btn-white' onClick={() => setIsCreateAccount(true)}><span>Create Account</span></div>
            </div>

            <Image
                src="/img/Background-splash.png"
                alt="background image"
                className='fixed -z-[1] inset-0 h-full w-full object-cover'
                width="650"
                height="812"
            />
        </div>

        { isCreateAccount && <CreateAccount step={step} db={db} app={app} auth={auth} active={isCreateAccount} closeCreateAcc={ () => setIsCreateAccount(false) } openDashboard={() => openDashboardHandler()} /> }
        { isLogin && <Login db={db} app={app} active={isLogin} closeLogin={ () => setIsLogin(false) } success={() => loginSuccessHandler()} /> }
        { showDashboard && !isCreateAccount && <Dashboard db={db} config={cfg} active={showDashboard} uid={auth.currentUser.uid} closeDashboard={ () => setShowDashboard(false)} /> }
        
    </div>
  )
}
