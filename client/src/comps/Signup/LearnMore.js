const LearnMore = (props) => {
  return (
    <div className="absolute w-full top-0 left-0 bg-white px-4 animate__animated animate__slideInUp animate__faster">
      <h1 className="font-black leading-tight text-[2.8rem] mb-5">How it works</h1>
      <div className="h-[50vh] overflow-scroll mb-8">
      <p className="mb-5">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Vestibulum lorem sed
        risus ultricies tristique nulla aliquet. Tristique senectus et netus et
        malesuada fames ac turpis egestas. Elit ullamcorper
      </p>
      <p className="mb-5">
        dignissim cras tincidunt lobortis. Et odio pellentesque diam volutpat
        commodo sed egestas egestas fringilla. Mi eget mauris pharetra et.
        Tellus orci ac auctor augue mauris augue neque gravida in. Hendrerit
        gravida rutrum quisque non tellus orci ac auctor. Consectetur a erat nam
        at lectus. Non quam lacus suspendisse faucibus interdum po
      </p>
      <p className="mb-5">
        suere lorem ipsum. Porttitor leo a diam sollicitudin. Dui sapien eget mi
        proin sed libero enim sed. Rutrum quisque non tellus orci ac auctor
        augue. Amet luctus venenatis lectus magna fringilla. Ut tellus elementum
        sagittis vitae. Elit at imperdiet dui accumsan sit amet.
      </p>
      </div>

      <div className="btn btn-gradient" onClick={() => props.triggerCreateCampaign()}>Create Campaign</div>
    </div>
  );
};

export default LearnMore;
