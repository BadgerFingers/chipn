import { useState, useEffect } from "react";
import { FaAngleLeft, FaPlus } from "react-icons/fa";
import Link from "next/link";
import { getAuth } from 'firebase/auth';
import { doc, getDocs, updateDoc, collection, getFirestore } from "firebase/firestore";

import Loader from "../Loader/Loader";


// /campaign?id=yBeJ5tVDlL&userid=79Ivx6RSiVMBgABgVme4lMAUKCr1

const Dashboard = (props) => {
  const [campaigns, setCampaigns] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const auth = getAuth();
  const uid = props.uid;
  const db = getFirestore(props.cfg);

  const toCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {}).format(amount);
  };

  const addToObject = (obj, key, value) => {
    return { ...obj, [key]: value }
  }

  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("en-GB");
  }

  const sortArrayByDescendingCompletionDate = (array) => {
    const sortedArray = array.sort((a, b) => {
      const dateA = new Date(a.completionDate);
      const dateB = new Date(b.completionDate);
      return dateB - dateA;
    });
    return sortedArray;
  }

  const signOutOfAccount = async () => {
    await auth.signOut();
    localStorage.clear();
    props.closeDashboard();
  }
  const calculateDaysLeft = (date) => {
    const today = new Date();
    const endDate = new Date(date);
    const daysLeft = Math.floor((endDate - today) / (1000 * 60 * 60 * 24));
    return daysLeft;
  }

  useEffect(() => {
    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, "chippin", uid, "campaigns"));
      const fetchedCampaigns = [];
      querySnapshot.forEach((doc) => {
        const item = addToObject(doc.data(), "id", doc.id);
        fetchedCampaigns.push(item);
      });
      const descendingCampaigns = sortArrayByDescendingCompletionDate(fetchedCampaigns);
      setCampaigns(descendingCampaigns);
    };

    fetchData().then(() => {
      setIsLoading(false);
    });

    campaigns.forEach((campaign) => {
      const today = new Date();
      const endDate = new Date(campaign.completionDate);
      const daysLeft = Math.floor((endDate - today) / (1000 * 60 * 60 * 24));
      if (daysLeft <= 0) {
        const statusUpdater = async () => {
          const campaignRef = doc(db, "chippin", `${uid}/campaigns/${campaign.id}`);
          await updateDoc(campaignRef, {
            status: 'expired'
          });
        }
        statusUpdater();
      }
    })
  }, [db, uid]);



  return (
    <div className="fixed animate__animated animate__fadeInUp animate__faster bg-white rounded-t-md z-10 w-full md:w-7/12 max-w-[768px] h-[85%] top-[15%] left-0 right-0 mx-auto">
      <div
        className={
          props.active
            ? "transition-all duration-300 flex flex-row justify-between relative -top-20 px-5"
            : "transition-all duration-300 flex flex-row justify-between relative top-20 px-5"
        }
      >
        <div
          className="flex flex-row items-center text-white cursor-pointer"
          onClick={() => {
            props.closeDashboard();
          }}
        >
          <FaAngleLeft className="text-xl" /> <span onClick={() => signOutOfAccount()}>exit</span>
        </div>
        <div className="text-2xl text-white">&nbsp;</div>
      </div>

      <div className="px-4">
        <div>
          <h1 className="text-center md:text-left font-black leading-tight text-[2.8rem] mb-5">
            My Campaigns
          </h1>

          <div className="relative h-[50vh] md:h-[60vh] overflow-scroll">
            {
              isLoading && (
                <div className="flex flex-row justify-center">
                  <Loader />
                </div>
              )
            }



            {!isLoading && campaigns.map((campaign, index) => (

              <div key={index} className={index === 0 ? "my-4 text-white" : "my-4 text-black"}>
                <Link
                  href={`/campaign?id=${campaign.id}&userid=${uid}`}
                  className="cursor-pointer"
                >
                  <div className={index === 0 ? "bg-gradient-to-r from-pink to-purple p-4 border border-grey-superlight rounded-xl shadow-lg" : "bg-white p-4 border border-grey-superlight rounded-xl shadow-lg"}>
                    <div>
                      <h1 className="font-bold leading-tight text-xl">
                        {campaign.name}
                      </h1>
                    </div>

                    <div className="flex flex-row gap-2 text-left items-center justify-between">
                      <div className="w-1/2 text-center border-r-2 border-grey-light">
                        <p className="font-bold text-[1.3rem]">
                          R<span className="text-[2rem] ml-1">{toCurrency(campaign.amountContributed)}</span>
                          {/* {toCurrency(campaign.campaignAmount)} */}
                        </p>
                        <p>Amount raised</p>
                      </div>

                      <div className="w-1/2 text-center">
                        <p className="font-bold"><span className="text-[2rem] mr-1">{calculateDaysLeft(campaign.completionDate) <= 0 ? 0 : calculateDaysLeft(campaign.completionDate)}</span>days</p>
                        <p>Time left</p>
                        {/* <p className="text-sm md:mt-6">Completion date: {formatDate(campaign.completionDate)}</p> */}
                        {/* <p className="text-sm">Status: <span className={campaign.status === "active" ? "text-success-400 font-bold" : " text-gray-400 font-bold"}>{campaign.status}</span></p> */}
                      </div>
                    </div>

                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="relative top-[-49px] h-[50px] bg-gradient-to-b from-transparent to-white">&nbsp;</div>

          <div className="fixed left-0 w-full px-4 flex flex-row justify-end items-center gap-2 mt-3">
            <span className="text-black mr-2">Add Campaign</span>
              <Link href="/create-campaign">
                <div className="flex items-center bg-gradient-to-r from-pink to-purple text-white p-4 rounded-full cursor-pointer">
                  <FaPlus />
                </div>
              </Link>
            </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
