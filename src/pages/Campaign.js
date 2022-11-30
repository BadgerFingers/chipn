import { useState, useEffect } from "react";
import bgSplash from "../img/Background-splash.png";
import logoWht from "../img/logo-white.svg";
import { Link } from "react-router-dom";
import Payment from "../comps/Payment/Payment";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";

import { doc, getDoc } from "firebase/firestore";

const Campaign = (props) => {
  const db = props.db;
  const [campaignID, setCampaignID] = useState(null);
  const [uid, setUid] = useState(null);
  const [validCampaign, setValidCampaign] = useState(false);
  const [campaignInfo, setCampaignInfo] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [showPayment, setShowPayment] = useState(false);

  const getUrlSearchParams = async (target, userid) => {
    const searchParams = new URLSearchParams(window.location.search);
    setCampaignID(searchParams.get(target));
    setUid(searchParams.get(userid));
  };

  const showPaymentHandler = () => {
    setShowPayment(!showPayment);
  };

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
    }
  };

  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("en-GB");
  }

  useEffect(() => {
    getCampaign(campaignID);
  }, [campaignID, uid]);

  return (
    <div className="flex flex-col justify-between py-40 px-10 h-[100vh]">
      {campaignID && showPayment && (
        <Payment
          id={campaignID}
          cancel={() => {
            showPaymentHandler();
          }}
        />
      )}
      <img
        src={logoWht}
        alt="chippin logo"
        className="w-10/12 max-w-[180px] mx-auto"
      />

      <div className="w-full md:w-10/12 bg-white bg-opacity-20 rounded-lg p-5 mx-auto">
        {validCampaign && !showPayment ? (
          <>
          <div className="flex flex-row justify-end">
            <span>
                    <span
                      className={
                        campaignInfo.status === "active"
                          ? "text-green-500"
                          : "text-gray-200"
                      }
                    >
                      {campaignInfo.status}
                    </span>
                    <RiCheckboxBlankCircleFill
                      className={
                        campaignInfo.status === "active"
                          ? "text-green-500 inline"
                          : "text-gray-200 inline"
                      }
                    />
            </span>
          </div>
            <h1 className="text-white text-center text-2xl font-bold mb-10">
              {campaignInfo.name}
              <span className="text-sm font-normal">
                {" "}
                - by: {userInfo.personal.firstname} {userInfo.personal.lastname}
              </span>
            </h1>
            {/* <h2 className='text-white'>CAMPAIGN ID: <span className='text-success-500'>{campaignID}</span></h2>
        <h2 className='text-white'>USER ID: <span className='text-success-500'>{uid}</span></h2> */}
            {/* <p className='text-white'>Created by: {userInfo.personal.firstname} {userInfo.personal.lastname}</p> */}
            <div>
              
                <p className="text-black bg-white rounded-lg p-5">
                  <span className="font-bold">Message</span>:{" "}
                  {campaignInfo.campaignMessage}
                  <br />
                  <br />
                  <span className="font-bold">The target amount is</span>: R{ campaignInfo.campaignAmount }
                </p>
              
            </div>
           
            <div className="bg-white rounded-md p-5 mt-5">
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
            </div>

            {/* <p className="text-white">
              Duration: {campaignInfo.campaignDuration} days
            </p> */}

            <p className="text-white text-center my-10">
              Completion date: {formatDate(campaignInfo.completionDate)}
            </p>
            
            <div
              className="btn btn-gradient"
              onClick={() => {
                showPaymentHandler();
              }}
            >
              I want to donate
            </div>
          </>
        ) : (
          <>
            <h1 className="text-white text-2xl text-center mt-5">
              Nothing to see here...
            </h1>
            <Link
              className="btn btn-gradient my-5 flex flex-row justify-center mx-auto max-w-xs"
              to="/"
            >
              Go to home page
            </Link>
          </>
        )}
      </div>
      <img
        src={bgSplash}
        alt=""
        className="absolute -z-[1] inset-0 h-full w-full object-cover"
      />
    </div>
  );
};

export default Campaign;
