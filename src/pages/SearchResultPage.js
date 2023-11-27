import React from "react";
import { useParams } from "react-router-dom";
import style from "../assets/style/searchResult/searchResultPage.module.css";
import SearchResultCard from "../components/searchResult/SearchResultsCard";
import useAxios from "../hooks/useAxiosGet";
import { useTranslation } from "react-i18next";

function SearchResultPage() {
  const { keyword } = useParams();
  const { type } = useParams();  
  const [t, i18n] = useTranslation();

  const url_search = type
    ? `search?keyword=${keyword}&type=${type}`
    : `search?keyword=${keyword}`;

  const [Data] = useAxios(url_search);
  const cardsData = Data?.data;
  
  return (
    <div className="container pt-4">
      <p>
      {t("Search Result")}
        <span className={style.searchResultPageSpan}>"{keyword}"</span>{" "}
        <span> {t("property found")}</span>{" "}
      </p>

      <SearchResultCard url_search={url_search} cardsData={cardsData} type={type}/>
    </div>
  );
}

export default SearchResultPage;
