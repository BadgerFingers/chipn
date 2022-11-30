import style from './Loader.module.css';

const Loader = () => {
    return (
        <div className={ style.loaderContainer }>
  <div className={ style.box1 }></div>
  <div className={ style.box2 }></div>
  <div className={ style.box3 }></div>
</div>
    );
}
 
export default Loader;