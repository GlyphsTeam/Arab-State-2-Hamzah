import { useState, useEffect } from "react";
import axios from 'axios';
import { useTranslation } from "react-i18next";
import { useDispatch } from 'react-redux';
import { setLoading } from '../redux/slices/login';
function useAxios(url) {
  const [t, i18n] = useTranslation();
  const [Data, setData] = useState([]);
  const token = localStorage.getItem('arab_user_token');
  const dispatch = useDispatch();

  const cityId = localStorage.getItem("cityId");
  let cityIdUrl = '/0';
  useEffect(() => {
    if (cityId) {
      cityIdUrl = `/${cityId}`;
    } else {
      cityIdUrl = '/0';
    }
  }, [cityId]);

  const baseURL = token
    ? `https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City}/${t("en")}${cityIdUrl}`
    : `https://${process.env.REACT_APP_domain}/api/${process.env.REACT_APP_City}/${t("en")}${cityIdUrl}`;

  useEffect(() => {
    dispatch(setLoading(true));
    try {
      axios
        .get(`${baseURL}/${url}`, {
          headers: { "Authorization": `Bearer ${token}` }

        })
        .then((response) => {
          dispatch(setLoading(false));
          setData(response.data)
        })
    }
    catch (error) {
      console.log(error);
    }
  }, [url, i18n.language]);

  return [Data, setData];
}


export default useAxios;
