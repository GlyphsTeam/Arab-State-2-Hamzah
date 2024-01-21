import useAxios from "../hooks/useAxiosGet";
import { Helmet } from "react-helmet";
import { lazy,Suspense } from "react";
const MainContact = lazy(()=>import("../components/contactUs/MainContact"));
const HeroBanner = lazy(()=>import("../components/common/banner/HeroBanner"));
const SpinnerStatic = lazy(()=>import("../components/common/Spinner"));
function ContactUs({baseURL}) {
  let contactUrl = "contact-page";
 let [Data] = useAxios(contactUrl);
 const titlePage = "Contact Us Page"
  return (
    <>
    <Helmet>
      <title>{titlePage}</title>
      <meta name="description" content={Data?.data?.contact?.description}/>
    </Helmet>
    <Suspense fallback={<SpinnerStatic/>}>
    <HeroBanner data={Data?.data?.slider}/>
      <MainContact data={Data?.data} baseURL ={baseURL} />
      </Suspense>
    </>
  );
}

export default ContactUs;
