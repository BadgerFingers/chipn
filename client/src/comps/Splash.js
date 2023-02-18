import React from 'react';
import bgSplash from '../img/Background-splash.png';
import logoWht from '../img/logo-white.svg';

const Splash = (props) => {
    return (
        <div className='flex flex-col justify-between py-4 md:py-40 px-10 h-[100vh]'>
            <img src={ logoWht } alt='chippin logo' className='w-10/12 max-w-[180px] mx-auto' />
            {/* <p className='text-white'>YOKO PUBLIC KEY: {process.env.REACT_APP_YOKO_PK}</p> */}
            
            <div className='w-full md:w-3/12 mx-auto'>
                <div className='btn btn-gradient mb-4' onClick={() => props.triggerLogin()}>Log in</div>
                <div className='btn btn-white' onClick={() => props.triggerCreateAcc()}><span>Create Account</span></div>
            </div>

            <img
                src={ bgSplash }
                alt=""
                className='absolute -z-[1] inset-0 h-full w-full object-cover'
            />
        </div>
    );
}
 
export default Splash;