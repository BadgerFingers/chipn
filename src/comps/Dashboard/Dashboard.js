import { useState, useEffect } from "react";
import { FaAngleLeft } from 'react-icons/fa';

const Dashboard = (props) => {

const campaigns = [
    {
        campaign: 'Doggie charity',
        campaignMessage: 'Help me fund the doggie charity',
        target: 5000,
        raised: 500,
        date: '2022-10-10',
    },
    {
        campaign: 'Kiddy donations',
        campaignMessage: 'Help put a xmas fund together for the kiddies',
        target: 10000,
        raised: 1200,
        date: '2022-10-10',
    }
]
    return (
        <div className="animate__animated animate__fadeInUp animate__faster bg-white rounded-t-md absolute z-10 w-full md:w-7/12 lg:w-5/12 h-[85%] top-[15%] left-0 right-0 mx-auto">
            <div className={ props.active ? 'transition-all duration-300 flex flex-row justify-between relative -top-20 px-5' : 'transition-all duration-300 flex flex-row justify-between relative top-20 px-5' }>
                <div className='flex flex-row items-center text-white'
                    onClick={() => {
                        props.closeDashboard();
                      }
                    }>
                    <FaAngleLeft className='text-xl' /> <span>exit</span>
                </div>
                <div className='text-2xl text-white'>
                    &nbsp;
                </div>
            </div>

            <div className="px-4">
      <div>
        <h1 className="font-black leading-tight text-[2.8rem] mb-5">Dashboard</h1>
        <p className="font-light mb-8">
          Below is an overview of your campaigns
        </p>

        {campaigns.map((campaign, index) => (
            <div key={index} className="my-4">
                <div className="bg-gradient-to-b from-grey-superlight to-white  flex flex-row text-left justify-between p-4 border border-grey-superlight rounded-xl">
                    <div>
                        <h1 className="font-bold leading-tight text-xl">{campaign.campaign}</h1>
                        <p>This campaign achieved: {campaign.raised} of {campaign.target}</p>
                    </div>
                    <div className="flex flex-row justify-center items-center w-[100px] rounded-md text-white bg-purple hover:bg-purple-dark cursor-pointer">
                        VIEW
                    </div>
                </div>
            </div>
        ))}
      </div>
    </div>
        </div>
    );
}
 
export default Dashboard