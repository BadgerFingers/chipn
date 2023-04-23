import { useState, useEffect } from "react";
import { FaAngleLeft, FaPlus } from "react-icons/fa";
import Link from "next/link";
import { getAuth } from 'firebase/auth';
// import { doc, updateDoc, collection, getDocs, getFirestore } from "firebase/firestore";
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
    return {...obj, [key]: value}
  }

  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("en-GB");
  }

  const signOutOfAccount = async() => {
    await auth.signOut();
    localStorage.clear();
    props.closeDashboard();
  }


  // useEffect(() => {
  //   async function fetchData() {
  //       const querySnapshot = await getDocs(collection(db, "chippin", uid, "campaigns"));

  //       querySnapshot.forEach((doc) => {
  //           // doc.data() is never undefined for query doc snapshots
  //           console.log(doc.id, " => ", doc.data());
  //           const item = addToObject(doc.data(), "id", doc.id)
  //           // addToArray(item)
  //           setCampaigns(campaigns => [...campaigns, item]);
  //           // console.log(item)
  //         });
  //   };

  //   fetchData().then(() => {
  //       setIsLoading(false);
  //   });
  //   console.log(campaigns);
  // }, []);

  // useEffect(() => {
  //   console.log('useEffect to set campaign status\'s');
  //   campaigns.map((campaign) => {
  //       const today = new Date();
  //       const endDate = new Date(campaign.completionDate);
  //       const daysLeft = Math.floor((endDate - today) / (1000 * 60 * 60 * 24));
  //       console.log(daysLeft);
  //       if (daysLeft <= 0) {
  //           console.log('campaign has expired');
  //           // set Campaign Status to 'expired'
  //           const statusUpdater = async () => {
  //               const campaignRef = doc(db, "chippin", `${uid}/campaigns/${campaign.id}`);
  //               await updateDoc(campaignRef, {
  //                   status: 'expired'
  //               });
  //           }
  //           statusUpdater();
  //         }
  //           //
  //       }
  //   )
  // }, [db, uid, campaigns]);

  useEffect(() => {
    async function fetchData() {
        const querySnapshot = await getDocs(collection(db, "chippin", uid, "campaigns"));
        const fetchedCampaigns = [];
        querySnapshot.forEach((doc) => {
            const item = addToObject(doc.data(), "id", doc.id);
            fetchedCampaigns.push(item);
          });
        setCampaigns(fetchedCampaigns);
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
    <div className="animate__animated animate__fadeInUp animate__faster bg-white rounded-t-md absolute z-10 w-full md:w-7/12 max-w-[768px] h-[85%] top-[15%] left-0 right-0 mx-auto">
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
            <h1 className="font-black leading-tight text-[2.8rem] mb-5">
                My Campaigns
            </h1>
            <div className="flex flex-col md:flex-row justify-between items-center gap-2 mb-10">
            <p className="font-light">
                Below is an overview of your campaigns
            </p> 
            <Link href="/create-campaign">
                <div className="flex items-center bg-gradient-to-l from-pink to-purple w-[170px] text-white p-2 rounded-full cursor-pointer">
                    <span className="text-white mr-2">Create Campaign</span>
                    <FaPlus />
                </div>
            </Link>
          </div>

          <div className="h-[50vh] md:h-[60vh] overflow-scroll">
            {
            isLoading && (
              <div className="flex flex-row justify-center">
                <Loader />
              </div>
            )
            }

            

          {!isLoading && campaigns.map((campaign, index) => (
            <div key={index} className="my-4">
              <div className="bg-gradient-to-b from-grey-superlight to-white  flex flex-col md:flex-row gap-2 text-left md:items-center justify-between p-4 border border-grey-superlight rounded-xl">
                <div>
                  <h1 className="font-bold leading-tight text-xl">
                    {campaign.name}
                  </h1>
                  <p>
                    This campaign achieved: <br />R{toCurrency(campaign.amountContributed)} of R
                    {toCurrency(campaign.campaignAmount)}
                  </p>
                </div>

                <div>
                    <p className="text-sm md:mt-6">
                        Completion date: {formatDate(campaign.completionDate)}
                    </p>
                    <p className="text-sm">Status: <span className={campaign.status === "active" ? "text-success-400 font-bold" : " text-gray-400 font-bold"}>{campaign.status}</span></p>
                </div>

                <div className="xxx">
                  <Link
                    href={`/campaign?id=${campaign.id}&userid=${uid}`}
                    className="flex flex-row justify-center items-center w-[100px] h-[2rem] rounded-md text-white text-sm bg-purple hover:bg-purple-dark cursor-pointer transition-colors"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
