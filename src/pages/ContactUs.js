import { Helmet } from "react-helmet";
import { lazy, Suspense, useEffect } from "react";
import { setContactData } from '../redux/Contact/contact';
import { useSelector, useDispatch } from 'react-redux';
import { setLoading } from '../redux/slices/login';
import axios from 'axios';

const MainContact = lazy(() => import("../components/contactUs/MainContact"));
const HeroBanner = lazy(() => import("../components/common/banner/HeroBanner"));
const SpinnerStatic = lazy(() => import("../components/common/Spinner"));
function ContactUs({ baseURL }) {
  let contactUrl = "contact-page";

  const titlePage = "Contact Us Page"
  const dispatch = useDispatch();
  const contactState = useSelector((state) => state.contact.contactData);

  const getContactData = async () => {
    const token = localStorage.getItem("arab_user_token");
    let cityIdUrl = '/0';
    const baseURL = `https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City}/en${cityIdUrl}`;

    if (contactState === null) {
      dispatch(setLoading(true));

      await axios.get(`${baseURL}/${contactUrl}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }).then((res) => {
        dispatch(setContactData(res.data?.data));
        dispatch(setLoading(false));

      }).catch((err) => {
        console.log(err);
        dispatch(setLoading(false));
      })
    }
  }
  useEffect(() => {
    getContactData();
  }, []);
  
  return (
    <>
      <Helmet>
        <title>{titlePage}</title>
        <meta name="description" content={contactState?.description} />
      </Helmet>
      <Suspense fallback={<SpinnerStatic />}>
        <HeroBanner data={contactState?.slider} />
        <MainContact data={contactState} baseURL={baseURL} />
      </Suspense>
    </>
  );
}

export default ContactUs;
