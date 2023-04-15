import React, {useState} from 'react';

import bgSplash from '../img/Background-splash.png';
import logoWht from '../img/logo-white.svg';
import Create from '../comps/Signup/CreateCampaign';
import Share from '../comps/Signup/ShareCampaign';

import { getAuth } from "firebase/auth";
import { app } from '../firebase-config';
import { getFirestore } from "firebase/firestore";
const db = getFirestore(app);

const CreateCampaign = () => {
    const auth = getAuth();
    const uid = auth.currentUser.uid;
    localStorage.setItem('uid', uid);

    const [step, setStep] = useState(1); // 1 = create, 2 = share



    return (
        <div className='flex flex-col justify-between py-10 px-10 h-[100vh]'>
            <img src={ logoWht } alt='chippin logo' className='w-10/12 max-w-[180px] mx-auto' />
            
            <div className="animate__animated animate__fadeInUp animate__faster bg-white rounded-t-md absolute z-10 w-full md:w-7/12 lg:w-5/12 max-w-[600px] h-[85%] top-[15%] left-0 right-0 mx-auto">
                <div>
                    {step === 1 && <Create db={db} nextStep={() => setStep(2)} />}
                    {step === 2 &&
                    <>
                        <Share exit={() =>{}} campaignurl={`/campaign?id=${localStorage.getItem('campaignID')}&userid=${uid}`} openDashboard={() => window.location.assign('/')} />
                        {/* <Link to={`/campaign?id=${localStorage.getItem('campaignID')}&userid=${uid}`}>View Campaign</Link> */}
                        {/* <Link to="/">Exit</Link> */}
                    </>
                    }
                </div>
            </div>

            <img
                src={ bgSplash }
                alt=""
                className='absolute -z-[1] inset-0 h-full w-full object-cover'
            />
        </div>
    );
}
 
export default CreateCampaign;