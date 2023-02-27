import { useState, useEffect } from "react";
import bgSplash from "../img/Background-splash.png";
import logoWht from "../img/logo-white.svg";
import { Link } from "react-router-dom";
import Payment from "../comps/Payment/Payment";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";

import { doc, getDoc, updateDoc } from "firebase/firestore";

const Campaign = (props) => {
  const db = props.db;
  const [campaignID, setCampaignID] = useState(null);
  const [uid, setUid] = useState(null);
  const [validCampaign, setValidCampaign] = useState(null);
  const [campaignInfo, setCampaignInfo] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [dots, setDots] = useState('');

  const getUrlSearchParams = async (target, userid) => {
    const searchParams = new URLSearchParams(window.location.search);
    setCampaignID(searchParams.get(target));
    setUid(searchParams.get(userid));
  };

  const showPaymentHandler = () => {
    setShowPayment(!showPayment);
  };

  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("en-GB");
  };

  const updateAmountContributed = async (amount) => {
    setIsProcessing(true);
    console.log(`UID:` + uid)
    console.log(`campaign ID:` + campaignID)
    const campaignRef = doc(db, "chippin", `${uid}/campaigns/${campaignID}`);
    const campaignSnap = await getDoc(campaignRef);
    const campaignData = campaignSnap.data();
    console.log(`campaign data:` + campaignData.amountContributed)
    const newAmount = Number(campaignData.amountContributed) + Number(amount);
    console.log(newAmount);
    await updateDoc(campaignRef, {
      amountContributed: newAmount,
    });
    setCampaignInfo(campaignSnap.data());
    setIsProcessing(false);
    console.log(campaignRef);
  }

  useEffect(() => {
    const getCampaign = async (id) => {
      // gather url data
      const urlData = await getUrlSearchParams("id", "userid");
      // get campaign details from frirebase
      const campaignRef = doc(db, "chippin", `${uid}/campaigns/${id}`);
      const userRef = doc(db, "chippin", uid);
      const campaignSnap = await getDoc(campaignRef);
      const userSnap = await getDoc(userRef);

      if (campaignSnap.exists() && userSnap.exists()) {
        setCampaignInfo(campaignSnap.data());
        setUserInfo(userSnap.data());
        setValidCampaign(true);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        setValidCampaign(false);
        setIsError(true);
      }
    };

    getCampaign(campaignID);
  }, [campaignID, db, uid]);

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

  return (
    <div className="flex flex-col justify-around md:justify-between py-4 md:py-40 px-4 h-screen">
      {showPayment && (
        <div className="flex flex-col items-center justify-center fixed z-[100] h-[100%] top-0 left-0 w-full">
          <Payment
            id={campaignID}
            cancel={() => {
              showPaymentHandler();
            }}
            success={(val) => {
              updateAmountContributed(val);
            }}
          />
        </div>
      )}
      <img
        src={logoWht}
        alt="chippin logo"
        className="w-10/12 max-w-[180px] mx-auto"
      />

      <div className="w-full md:w-10/12 bg-white bg-opacity-20 rounded-lg p-5 mx-auto">
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
                      ? "text-green-500 inline"
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
            {/* <h2 className='text-white'>CAMPAIGN ID: <span className='text-success-500'>{campaignID}</span></h2>
        <h2 className='text-white'>USER ID: <span className='text-success-500'>{uid}</span></h2> */}
            {/* <p className='text-white'>Created by: {userInfo.personal.firstname} {userInfo.personal.lastname}</p> */}
            <div className="flex flex-col md:flex-row md:gap-4">
              <div className="md:w-1/2">
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
                  I want to donate
                </div>
                )}

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
                to="/"
              >
                Go to home page
              </Link>
            )}
          </>
        )}
      </div>
      <img
        src={bgSplash}
        alt=""
        className="fixed -z-[1] inset-0 h-full w-full object-cover"
      />
    </div>
  );
};

export default Campaign;
