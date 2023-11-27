import style from "../../assets/style/show_blog.module.css";
import ReactHtmlParser from 'html-react-parser';
import { LazyLoadImage } from "react-lazy-load-image-component";
function ShowBlogParagraph({ Data, showBlogData }) {
  const showBlogParagraph = Data?.data?.blog?.paragraphs;
  return (
    <>
      { showBlogParagraph?.map((item, index) => (
          <div key={index} >
           <p className={style.showBlogMainTitle}>{item?.title} </p>
            {
               item?.image &&
            <div >
              <LazyLoadImage key={item.id} className={style.showBlogImage} src={item?.image} alt="showBlog"/>
            </div>
  }
            <div className={style.showBlogParagraphDiv}>
              <p className={` ${style.showBlogParagraphTitle}`} key={item?.id} style={{marginBottom:'0px'}}>
                {item?.web_description && ReactHtmlParser(`${item?.web_description}`)}
                </p>
            </div>
        </div>
      ))}
    </>
  );
}
export default ShowBlogParagraph;
