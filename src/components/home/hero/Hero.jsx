import style from "./hero.module.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
function Hero({ data }) {
  return (
    <div>
      {data?.map((data , index) => (
      <div className={style.heroDiv}>
      {data?.type === "video" ? (
        <video
          className={style.hero}
          loop
          autoPlay
          muted
          disableRemotePlayback
          playsInline=""
          data-wf-ignore="true"
          data-object-fit="cover"
        >
          <source src={data?.media} type="video/mp4" />
        </video>
      ) : (
        <LazyLoadImage src={data?.media} alt={data?.title} />
        
        )}
      </div>
      ))}
      </div>
  );
}
export default Hero;
