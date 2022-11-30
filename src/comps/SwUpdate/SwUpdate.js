const SwUpdate = (props) => {
    return (
        <div className="flex flex-col items-center justify-center fixed top-0 left-0 w-full h-full bg-white bg-opacity-80">
            <div className="w-10/2 md:w-1/3 lg:w-1/3 rounded-md bg-white px-4 pt-4 pb-10"> 
            <h1 className="text-xl font-bold text-gradient inline-block">Update available!</h1>
            <p className="text-grey-light">{ props.msg }</p>
            </div>
        </div>
    );
}
 
export default SwUpdate;