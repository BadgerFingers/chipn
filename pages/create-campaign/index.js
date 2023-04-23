import React, {useState, useEffect} from 'react';

import Image from "next/image";
import Create from '../../comps/Signup/CreateCampaign';
import Share from '../../comps/Signup/ShareCampaign';

import { cfg } from '../../utils/firebaseConfig';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from 'firebase/app';


const CreateCampaign = () => {
    const [step, setStep] = useState(1); // 1 = create, 2 = share
    const [uid, setUid] = useState(null);
    
    const app = initializeApp(cfg);
    const db = getFirestore(app);
    const auth = getAuth();

    useEffect(() => {
        if (!uid) {
          if (auth.currentUser) {
            setUid(auth.currentUser.uid);
            localStorage.setItem('uid', auth.currentUser.uid);
          } else {
            // Redirect the user to the login page or handle the error
          }
        }
      }, [auth, uid]);

    return (
        <div className='flex flex-col justify-between py-10 px-10 h-[100vh]'>
            <Image src="/img/logo-white.svg" alt='chippin logo' className='w-10/12 max-w-[180px] max-h-[47px] mx-auto' width="180" height="47" priority />

            <div className="animate__animated animate__fadeInUp animate__faster bg-white rounded-t-md absolute z-10 w-full md:w-7/12 lg:w-5/12 max-w-[600px] h-[85%] top-[15%] left-0 right-0 mx-auto">
                <div>
                    {step === 1 && <Create db={db} nextStep={() => setStep(2)} />}
                    {step === 2 &&
                    <>
                        <Share exit={() =>{}} campaignurl={`/campaign?id=${localStorage.getItem('campaignID')}&userid=${uid}`} openDashboard={() => window.location.assign('/')} />
                    </>
                    }
                </div>
            </div>

            <Image
                src="/img/Background-splash.png"
                alt="background image"
                className='absolute -z-[1] inset-0 h-full w-full object-cover'
                width="650"
                height="812"
            />
        </div>
    );
}
 
export default CreateCampaign;