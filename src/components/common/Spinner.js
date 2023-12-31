import style from "../../assets/style/spinner.module.css";
import { BeatLoader } from "react-spinners";
import { LazyLoadImage } from "react-lazy-load-image-component";
function Spinner({ logo }) {
  return (
    <>
      <div className={`spinner ${style.spinner}`}>
        {logo ? (
          <LazyLoadImage src={logo} alt="spinner" />
        ) : (
          <BeatLoader color={"#123abc"} loading={true} />
        )}
      </div>
    </>
  );
}

export default Spinner;
