import style from './Loader.module.css';

const Loader = () => {
    return (
        // <div className={ style.loaderContainer }>
        //     <div className={ style.box1 }></div>
        //     <div className={ style.box2 }></div>
        //     <div className={ style.box3 }></div>
        // </div>
        <div className={style.circularLoaderContainer}>
            <div className={style.circularLoader}></div>
        </div>
    );
}
 
export default Loader;