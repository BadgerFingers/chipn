import { useState } from "react";
import LearnMore from "./LearnMore";

const AccountCreated = (props) => {
  const [showLearnMore, setShowLearnMore] = useState(null);

  return (
    <div className="relative px-4 animate__animated animate__fadeInUp animate__faster">
      { showLearnMore && <LearnMore triggerCreateCampaign={() => props.nextStep()} /> }
      <div>
        <h1 className="font-black leading-tight text-[2.8rem] mb-5">Your account has been created!</h1>
        <p className="font-light">
        Now that your account has been created, let’s help friends and family chip in by creating your first campaign. 
        </p>
      </div>

        <div>
        <div className="btn btn-gradient mt-16" onClick={() => props.nextStep()}>Create Campaign</div>
        <div className="btn btn-white mt-4" onClick={() => setShowLearnMore(true)}><span>Learn More</span></div>
      </div>
    </div>
  );
};

export default AccountCreated;
