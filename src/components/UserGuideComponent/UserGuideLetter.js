import style from "../../assets/style/UserGuide.module.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useTranslation } from "react-i18next";
function UserGuideLetter({ userGuide }) {
  const [t] = useTranslation();


  const firstBanner = userGuide?.image;
  const isMp4File = firstBanner?.endsWith(".mp4");

  return (
    <>
      <div className={style.containerClass}>
        <div className={style.paragraph}>
          <h2>{t("User Guide")}</h2>
          {isMp4File ? (
            <video
              src={firstBanner}
              autoPlay
              loop
              muted
              playsInline
              data-wf-ignore="true"
              data-object-fit="cover"
              type="video/mp4"
            />
          ) : (
            <LazyLoadImage src={firstBanner} alt="Profile Cover" className="w-100"/>
          )}
        </div>

      </div>
    </>
  );
}
export default UserGuideLetter;
