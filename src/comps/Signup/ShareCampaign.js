import { useState } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { FaCopy } from 'react-icons/fa';

const ShareCampaign = () => {
    const [copyValue, setCopyValue] = useState('chippin.netlify.app/campaign?id=' + localStorage.getItem('campaignID') + '&userid=' + localStorage.getItem('uid'));
    const [copied, setCopied] = useState(false);

    const copyHandler = () => {
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    }
    return (
        <div className="animate__animated animate__fadeInUp animate__faster bg-white rounded-t-md absolute z-10 w-full md:w-7/12 lg:w-5/12 h-[85%] top-[15%] left-0 right-0 mx-auto">
            <h1>SHARE CAMPAIGN</h1>
            {/* <input
                className="w-full p-2 border border-x-transparent border-t-transparent border-b-gray-light"
                disabled
                value={'chippin.netlify.app/campaign?id=' + localStorage.getItem('campaignID')}
            /> */}

<div className="w-full mx-auto mt-5">
            <CopyToClipboard
                className="relative flex flex-row justify-between p-3 rounded border bg-white border-gray cursor-pointer transition duration-200 ease-in hover:border-success"
                text={copyValue}
                onCopy={copyHandler}>
            <div>
                <div className='text-grey-light'>Click to copy your campaign URL</div>
                <div><FaCopy className='text-success-500 text-2xl' /></div>
                {copied && (
                    <div className="flex flex-row justify-center items-center absolute w-full h-full bg-success-500 bg-opacity-90 rounded top-0 left-0 text-white font-bold">Copied!</div>
                )}
            </div>
            </CopyToClipboard>
        </div>

        </div>
    );
}
 
export default ShareCampaign;