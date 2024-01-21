import React, {useState} from 'react';
import style from "../../../assets/style/job/jobCard.module.scss";
import useFetch from "../../../hooks/useFetch";
import Alert from "../alert/Alert";
import { Link } from 'react-router-dom';
import Share from "../../../Utils/Share";
import { useTranslation } from "react-i18next";
import { LazyLoadImage } from 'react-lazy-load-image-component';
function JobCard({jobData, isMyPost, baseUrl  ,urlId, page}) {
    const [t, i18n] = useTranslation();

    const [send, setSend] = useState(false);
    const [count, setCount] = useState(4);
    const [showAlert, setShowAlert] = useState(false);
    const [showAlertDelete, setShowAlertDelete] = useState(false);
    const [isFav, setIsFav] = useState(jobData?.save_job);
    const token = localStorage.getItem("arab_user_token")
    const [showShareModal, setShowShareModal] = useState(false);

    let formData = new FormData();
    formData.append('id', jobData.id);

    const [Res] = useFetch('favorite/job', formData, send);

    let favoriteIcon = isFav ? 'fas fa-bookmark' : 'far fa-bookmark';

    const handleClick = () => {
      setShowShareModal(true);
    };
  

      const addToFavorite = () => {
        if(token){
        setIsFav(!isFav);
        setSend(true);
        setTimeout(() => {
            setSend(false);
          }, 100);
        }else{
            setShowAlert(true);
            setCount(4);
        }
      }

      const deleteJob = (id) => {
        try {
          fetch(`${baseUrl}/user/jobs/delete/${id}`, { 
              headers: { 'Authorization': `Bearer ${token}` , 'Accept': 'application/json' },
              method: 'DELETE'
            }).then(() => {
              deleteDiv(id)
            })
        }
        catch (error) {
          console.log(error);
        }
        finally {
          setShowAlertDelete(true);
              setCount(4);
        }
      }
    
      const deleteDiv = (id) => {
        const element = document.getElementById(`${id}`);
        element.parentNode.removeChild(element);
      }



  return (
    <div id={jobData.id} className={`col-lg-4 col-md-6 col-sm-12 ${style.mainJobCard} ${page? style.minWidth :''}`}>

        <div className={`${style.mainJobCard}`}>
            <div className={`${style.jobCardBody}`}> 
               
                <div className='row'>
                    <div className={`col-3 ${style.imgMainDiv} ${i18n.language === 'en' ? style.imgMainDiv : style.arImgMainDiv}`}>
                    <Link to={`/show-job/${jobData.slug}`}  state={(urlId = { id: jobData?.id })} className={`col-10 ${style.houseInfo}`}>
                        <LazyLoadImage className={`${style.jobImage}  ${i18n.language === 'en' ? style.enJobImg : style.arJobImg}`} src={jobData.user_image} alt='JobImage'/>
                     </Link>
                    </div>

                    <div className='col-7'>
                  
                        <h3 className={style.jobTitle}>{jobData.title} </h3>
                        <p className={style.jobLocation}><i className="fas fa-map-marker-alt"></i> {jobData.place}</p>
                    </div>

                    <div className={`col-2 ${style.actionDiv}`}>
                    {!isMyPost && (
                      <>
                        <i className={`fas fa-share-square ${style.favIconColor}`} onClick={()=> handleClick()}></i>

                        <i className={`${favoriteIcon} ${style.favIconColor}`} onClick={()=> addToFavorite(jobData.id)}></i>
                      </>
                    )}
                    </div>
                </div>
                <Link to={`/show-job/${jobData.slug}`} state={(urlId = { id: jobData?.id })} className={`col-8 ${style.jobInfo}`}>
                <div className='row'>
                    <div className='col-12'>
                    <h5 className={style.jobUserName}><strong className={style.userJob}>{jobData.user_name.split(' ')[0] } : </strong> {' '} <p>{jobData.looking_for_text}</p> </h5>
                        <p className={style.jobDescription}>{jobData.description}</p>

                        <div className={style.jobCardFooter}>
                            <p className={style.jobType}>{jobData.type}</p>
                            <p className={style.jobCreate}>{jobData.created_at}</p>

                        </div>
                    
                    </div>
                </div>
             </Link>
             {isMyPost && (
                        <div className={style.jobCardFooter}>

                            {jobData.status ?
                            <div className={style.approvalDiv}>
                            <p className={style.waitingApproval}>{t('Waiting for approval')}</p>
                            <p>  <i onClick={() => deleteJob(jobData.id)} className={`fas fa-trash-alt ${style.deleteIcon}`}></i></p>
                            </div>
                            :
                            <div className={style.approvalDiv}>
                            <p className={style.published}>{t('Published')}</p>
                            <p>  <i onClick={() => deleteJob(jobData.id)} className={`fas fa-trash-alt ${style.deleteIcon}`}></i></p>
                            </div>
                            }

                        </div>
                        )}
            </div>
        </div>

        {showAlert && (<Alert type='warning' message='Please login first.' showAlert={showAlert} setShowAlert={setShowAlert} count={count} setCount={setCount} />)}
        {showAlertDelete && (<Alert type='success' message='Your post deleted successfully.' showAlert={showAlertDelete} setShowAlert={setShowAlertDelete} count={count} setCount={setCount} />)}
        {showShareModal && <Share url={`/job/${jobData.id}`}  setShowShareModal={setShowShareModal} />}

    
    </div>
  )
}

export default JobCard