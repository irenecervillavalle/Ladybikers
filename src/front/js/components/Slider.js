import React from 'react'
import "./Slider.css";
const Slider = ({imageSrc,title, subtitle, flipped}) => {

const renderContent=() => {
    if (!flipped){
    return (
     <>
     <img src={imageSrc} alt="test" className="slider_image"/>
     <div className='slider_content'>
        <h1 className='slider_title'>{title}</h1>
        <p>{subtitle}</p>
    </div>
    </>
    );
    }else{
     return (
     <>
     <div className='slider_content'>
        <h1></h1>


     </div>
     
     
     </>
    }

}
  return (
    <div className='slider'>{renderContent()}</div>
  )
}

export default Slider