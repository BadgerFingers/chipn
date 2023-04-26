import { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaCopy } from "react-icons/fa";
import Link from "next/link";

const ShareCampaign = (props) => {

  const campaignID = localStorage.getItem('campaignID');
  const uid = localStorage.getItem('uid');

  const [copyValue, setCopyValue] = useState(
    "https://chipn.netlify.app/campaign?id=" +
      localStorage.getItem("campaignID") +
      "&userid=" +
      localStorage.getItem("uid")
  );
  const [copied, setCopied] = useState(false);

  const copyHandler = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  useEffect(() => {
    localStorage.removeItem("bankName");
    localStorage.removeItem("otherBankName");
    localStorage.removeItem("accNumber");
    localStorage.removeItem("accHolder");
  }, []);
  return (
    <div className="animate__animated animate__fadeInUp animate__faster bg-white rounded-t-md absolute z-10 w-9/12 md:w-8/12 lg:w-9/12 max-w-[320px] _h-[85%] _top-[15%] left-0 right-0 mx-auto">
      <h1 className="mt-10 text-center">SHARE CAMPAIGN</h1>
      {/* <input
                className="w-full p-2 border border-x-transparent border-t-transparent border-b-gray-light"
                disabled
                value={'chipn.netlify.app/campaign?id=' + localStorage.getItem('campaignID')}
            /> */}

      <div className="w-full mx-auto mt-5">
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

        {/* props.campaignurl */}
        <Link href={`/campaign?id=${campaignID}&userid=${uid}`}>
          <div className="mt-20 btn btn-gradient">
            View Campaign
          </div>
        </Link>

        <div onClick={props.openDashboard}>
        <div className="mt-5 btn btn-white">
            <span>Go to your Dashboard</span>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ShareCampaign;
