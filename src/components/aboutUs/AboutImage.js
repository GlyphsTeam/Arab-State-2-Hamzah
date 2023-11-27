import style from "../../assets/style/about/about.module.scss";

function AboutImage({aboutData}) {
  return (
    <div className={`${style.aboutImage} col-lg-4`}>
      <img src={aboutData?.main?.image} alt="aboutImage" />
    </div>
  );
}

export default AboutImage;
