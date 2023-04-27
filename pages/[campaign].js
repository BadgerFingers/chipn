import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Payment from "../comps/Payment/Payment";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";
import { IoIosArrowBack } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Script from "next/script";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaCopy } from "react-icons/fa";
import { GiCheckMark } from "react-icons/gi";
import Confetti from "react-confetti";

import { doc, getDoc, updateDoc, getFirestore } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import { getApps, getApp } from 'firebase/app';
import { cfg } from '../utils/firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


const Campaign = (props) => {
  
  // Initialize Firebase
  const app = !getApps().length ? initializeApp(cfg) : getApp();
  const db = getFirestore(app);

  const [user, setUser] = useState(null);
  const [validCampaign, setValidCampaign] = useState(null);
  const [campaignInfo, setCampaignInfo] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [dots, setDots] = useState('');
  const [copyValue, setCopyValue] = useState(null);
  const [copied, setCopied] = useState(false);
  const [showSuccess, setShowSuccess] = useState(true);

  const dismissSuccess = () => {
    setShowSuccess(false)
    refreshCampaign()
  }

  const copyHandler = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const router = useRouter();
  const { id, userid } = router.query;
  
  const showPaymentHandler = () => {
    setShowPayment(!showPayment);
  };

  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("en-GB");
  };

  const notify = (category, message) => {
    if (category === "info") {
      toast.info(message);
    }
    if (category === "warn") {
      toast.warn(message);
    }
    if (category === "success") {
      toast.success(message);
    }
    if (category === "error") {
      toast.error(message);
    }
  };

  const updateAmountContributed = async (amount, email, name) => {
    setIsProcessing(true);
    setShowSuccess(true)
    console.log(`UID:` + userid)
    console.log(`campaign ID:` + id)
    const campaignRef = doc(db, "chippin", `${userid}/campaigns/${id}`);
    const campaignSnap = await getDoc(campaignRef);
    const campaignData = campaignSnap.data();
    console.log(`campaign data:` + campaignData.amountContributed)
    
    const newContributor = {
      name,
      email,
      amount,
    };
    const newContributors = campaignData.contributors
    ? [...campaignData.contributors, newContributor]
    : [newContributor]
    
    const newAmount = Number(campaignData.amountContributed) + Number(amount);
    console.log(newAmount);

    // Update the campaign document with the new amount and contributors array
    await updateDoc(campaignRef, {
      amountContributed: newAmount,
      contributors: newContributors,
    });

    setCampaignInfo(campaignSnap.data());
    setIsProcessing(false);
    notify("success", "Payment successful");
    console.log(campaignRef);
  }

  const refreshCampaign = async () => {
    const campaignRef = doc(db, "chippin", `${userid}/campaigns/${id}`);
    const campaignSnap = await getDoc(campaignRef);
    setCampaignInfo(campaignSnap.data());
    console.log(campaignSnap.data());
  }

  // check if authed user
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    // console.log(router.query)
    const paramID = router.query.id
    const paramUID = router.query.userid
    async function getCampaign(){
      if(router.isReady){
        // get campaign details from frirebase
        const campaignRef = doc(db, "chippin", `${paramUID}/campaigns/${paramID}`);
        const userRef = doc(db, "chippin", paramUID);
        const campaignSnap = await getDoc(campaignRef);
        const userSnap = await getDoc(userRef);

        if (campaignSnap.exists() && userSnap.exists()) {
          setCampaignInfo(campaignSnap.data());
          setUserInfo(userSnap.data());
          setValidCampaign(true);
          setCopyValue("https://chipn.netlify.app/campaign?id=" + id + "&userid=" + userid)
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          setValidCampaign(false);
          setIsError(true);
        }
      }
    };

    getCampaign();
  }, [router, db]);

  useEffect(() => {
      const interval = setInterval(() => {
        setDots((dots) => (dots.length === 3 ? '' : `${dots}.`));
      }, 500);
      return () => clearInterval(interval);
    
  }, []);

  useEffect(() => {
    if (campaignInfo) {
      console.log(campaignInfo.completionDate);
      const checkIfPastDate = (dateString) => {
        const inputDate = new Date(dateString);
        const today = new Date();
        
        if (inputDate <= today) {
          if (inputDate.toDateString() === today.toDateString()) {
            return "Today";
          } else {
            return "Past date";
          }
        } else {
          return "Future date";
        }
      }
      const result = checkIfPastDate(campaignInfo.completionDate);
      if (result === "Past date" && campaignInfo.status === 'active') {
          console.log('update status to expired')
          setCampaignInfo({ ...campaignInfo, 'status': 'Expired' });
          // -- update campaign status in firebase
      }
    }
    
  }, [campaignInfo]);

  return <>
    <ToastContainer />

    { showSuccess &&
        <div className="flex flex-col items-center justify-center fixed top-0 left-0 z-[100] h-full w-full bg-black bg-opacity-60">
        <div className="relative bg-white rounded-md p-10 w-11/12 md:w-5/12 text-center overflow-hidden">
          <Confetti className="w-full" />
          <div className="relative z-10">
            <h2 className="font-semibold text-xl mb-5">Successful payment!</h2>
            <p>Congratulations, you have successfully chipped in to {userInfo.personal.firstname}'s campaign.</p>
            <div className="btn btn-success mt-10" onClick={() => dismissSuccess()}>Okay</div>
          </div>
          <GiCheckMark className="absolute z-0 top-5 left-0 right-0 m-auto text-[6rem] text-slate-100" />
        </div>
      </div>
      }

    <div className="flex flex-col justify-around md:justify-between py-4 md:py-20 px-4 h-screen">
      {showPayment && (
        <div className="flex flex-col items-center justify-center fixed z-[100] h-[100%] top-0 left-0 w-full">
          <Payment
            id={router.query.id}
            cancel={() => {
              showPaymentHandler();
            }}
            success={(val, email, name) => {
              updateAmountContributed(val, email, name);
            }}
            user={userInfo}
            refresh={() => refreshCampaign()}
          />
        </div>
      )}
      <Image src="/img/logo-white.svg" alt='chippin logo' className='w-10/12 max-w-[180px] max-h-[47px] mx-auto' width="180" height="47" priority />

      <div className="w-full md:w-10/12 bg-white bg-opacity-20 rounded-lg p-5 mx-auto h-[90vh] max-h-[900px] overflow-scroll">
        {validCampaign && (
          <>
            {showPayment && (
              <div className="absolute top-0 left-0 w-full h-full bg-gray-600 bg-opacity-80 text-white rounded-lg"></div>
            )}
            <div className="flex flex-row justify-end">
              <span>
                <span
                  className={
                    campaignInfo.status === "active"
                      ? "text-green-500"
                      : "text-error-500"
                  }
                >
                  {campaignInfo.status}
                </span>
                <RiCheckboxBlankCircleFill
                  className={
                    campaignInfo.status === "active"
                      ? "text-green-500 inline pulsate"
                      : "text-error-500 inline"
                  }
                />
              </span>
            </div>
            <h1 className="text-white text-center text-2xl font-bold mb-10">
              {campaignInfo.name}
              <span className="text-sm font-normal block md:inline-block">
                {" "}
                - by: {userInfo.personal.firstname} {userInfo.personal.lastname}
              </span>
            </h1>
            
            <div className="flex flex-col md:flex-row md:gap-4">
              <div className="md:w-1/2">
              {user && (
                <Link href="/" className="w-[110px] flex flex-row items-center text-white font-semibold">
                  <IoIosArrowBack />Dashboard
                </Link>
              )}
              
                <p className="text-black bg-white rounded-lg p-5">
                  <span className="font-bold">Message</span>:{" "}
                  {campaignInfo.campaignMessage}
                  <br />
                  <br />
                  <span className="font-bold">The target amount is</span>: R
                  {campaignInfo.campaignAmount}
                </p>
              </div>

              <div className="bg-white rounded-md p-5 mt-5 md:mt-0 md:w-1/2">
                <div className="flex flex-row">
                  <p className="text-black">
                    <span className="font-bold">Contributed</span>: R
                    {campaignInfo.amountContributed}
                  </p>
                </div>
                <progress
                  id="progressbar"
                  max={campaignInfo.campaignAmount}
                  value={campaignInfo.amountContributed}
                ></progress>

                {campaignInfo.status === 'active' && (
                  <div
                  className="btn btn-success"
                  onClick={() => {
                    showPaymentHandler();
                  }}
                >
                  Chip in
                </div>
                )}

                {/* <button
                  onClick={() => updateAmountContributed(100, 'test@test.com', 'Test User')}>
                    TEST
                </button> */}

                {campaignInfo.status !== 'active' && (
                  <div
                  className="btn-disabled bg-gray-400 text-white"
                >
                  Contibutions are closed
                </div>
                )}

                { isProcessing && (
                  <p>Processing{dots}</p>
                ) }
              </div>
            </div>

            <p className="text-white text-center my-10">
              Completion date: {formatDate(campaignInfo.completionDate)}
            </p>

            {user && (
              <>
              <div className="w-full bg-black bg-opacity-50 text-white rounded-lg p-5 mx-auto">
                <h2 className="text-white mb-5 font-extrabold text-center">Contributors:</h2>
                {campaignInfo.contributors ? <ul>
                  {campaignInfo.contributors.map((contributor, index) => (
                    <li key={index} className="flex flex-row justify-between w-full p-1 border-t-2 last-of-type:border-y-2">
                      <span>{contributor.name}</span>
                      <span>R{contributor.amount}</span>
                    </li>
                  ))}
                </ul>
                : <p>No contributors yet</p>
                }
                <div>
                <h3 className="text-white mt-10 mb-2 font-extrabold">Actions</h3>
                <div className="flex flex-col md:flex-row md:w-[300px]">
                <CopyToClipboard
                  className="relative flex flex-row justify-between p-3 rounded border bg-white border-gray cursor-pointer transition duration-200 ease-in hover:border-success"
                  text={copyValue}
                  onCopy={copyHandler}
                >
                  <div>
                    <div className="text-success-500">
                      Click to copy your campaign URL
                    </div>
                    <div>
                      <FaCopy className="text-success-500 text-2xl" />
                    </div>
                    {copied && (
                      <div className="flex flex-row justify-center items-center absolute w-full h-full bg-success-500 bg-opacity-90 rounded top-0 left-0 text-white font-bold">
                        Copied!
                      </div>
                    )}
                  </div>
                </CopyToClipboard>
                </div>
                {campaignInfo.status === 'active' && (
                <div className="mt-24 flex flex-row justify-center">
                  <span className="p-3 text-center font-medium rounded-full transition-colors cursor-pointer bg-slate-200 text-slate-400 text-xs hover:text-white hover:bg-slate-500">Close Campaign</span>
                </div>
                )}
              </div>
              </div>
              </>
            )}
          </>
        )}

        {!validCampaign && (
          <>
            <h1 className="text-white text-2xl text-center mt-5">
              {isError ? "Nothing to see here..." : "Loading..."}
            </h1>
            {isError && (
              <Link
                className="btn btn-gradient my-5 flex flex-row justify-center mx-auto max-w-xs"
                href="/"
              >
                Go to home page
              </Link>
            )}
          </>
        )}
      </div>
      <Image
                src="/img/Background-splash.png"
                alt="background image"
                className='absolute -z-[1] inset-0 h-full w-full object-cover'
                width="650"
                height="812"
            />
    </div>
    <Script src="https://js.yoco.com/sdk/v1/yoco-sdk-web.js" />
    </>;
};

export default Campaign;
