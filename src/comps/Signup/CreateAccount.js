import { useState, useEffect } from 'react';
import { FaAngleLeft } from 'react-icons/fa';
import AccountCreated from './AccountCreated';
import ConfirmEmail from './ConfirmEmail';
import CreateCampaign from './CreateCampaign';
import CreatePassword from './CreatePassword';
import EmailAddress from './EmailAddress';
import PersonalDetails from './PersonalDetails';
import PaymentDetails from './PaymentDetails';
import ShareCampaign from './ShareCampaign';

const CreateAccount = (props) => {
    const [step, setStep] = useState(null);

    useEffect(() => {
        if(props.active){
            setStep(1); // 6
        }
    }, [props.active])
    return (
        <div className="animate__animated animate__fadeInUp animate__faster bg-white rounded-t-md absolute z-10 w-full md:w-7/12 lg:w-5/12 h-[85%] top-[15%] left-0 right-0 mx-auto">
            <div className={ props.active ? 'transition-all duration-300 flex flex-row justify-between relative -top-20 px-5' : 'transition-all duration-300 flex flex-row justify-between relative top-20 px-5' }>
                <div className='flex flex-row items-center text-white'
                    onClick={() => {
                        props.closeCreateAcc();
                        setStep(1);
                      }
                    }>
                    <FaAngleLeft className='text-xl' /> <span>exit</span>
                </div>
                <div className='text-2xl text-white'>
                    Let's get started
                </div>
            </div>

            { step === 1 &&<EmailAddress db={props.db} nextStep={() => setStep(2)} /> }
            { step === 2 && <ConfirmEmail nextStep={() => setStep(3)} /> }
            { step === 3 && <CreatePassword nextStep={() => setStep(4)} /> }
            { step === 4 && <PersonalDetails db={props.db} nextStep={() => setStep(5)} /> }
            { step === 5 && <AccountCreated nextStep={() => setStep(6)} /> }
            { step === 6 && <CreateCampaign db={props.db} nextStep={() => setStep(7)} /> }
            { step === 7 && <PaymentDetails db={props.db} nextStep={() => setStep(8)} /> }
            { step === 8 && <ShareCampaign /> }
        </div>
    );
}
 
export default CreateAccount