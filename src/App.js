import React from 'react';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import 'animate.css';
import CreateAccount from './comps/Signup/CreateAccount';
import Splash from './comps/Splash';
import Payment from './comps/Payment/Payment';

function App() {
  const [isCreateAccount, setIsCreateAccount] = useState(false);

  return (
    <div className='container mx-auto h-full overflow-hidden'>
      <Routes>
        <Route
          path="/"
          element={ <>
          <Splash triggerCreateAcc={ () => setIsCreateAccount(true) }/>
          { isCreateAccount && <CreateAccount active={isCreateAccount} closeCreateAcc={ () => setIsCreateAccount(false) } /> }
          </>}
        />

        <Route path='/payment' element={ <Payment /> } />
      </Routes>
    </div>
  );
}

export default App;
