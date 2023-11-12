import React from 'react'
import HighlightText from './HighlightText'
import knowyourprogress from "../../../assets/Images/Know_your_progress.png"
import comparewithothers from "../../../assets/Images/Compare_with_others.png"
import planyourlesson from "../../../assets/Images/Plan_your_lessons.png"
import CTAButton from "../Home/Button"


const LearningSection = () => {
  return (
    
        <div className='mb-36' >
            <div className='flex flex-col gap-4 w-11/12 max-w-maxContent items-center mt-36'>
        
        <div className='text-4xl font-bold '>
            Your Swiff knife for <HighlightText text={" learning any language"} />
        </div>

        <p className='text-center w-[66%] text-base text-richblack-700' >Using spin making learning multiple languages easy, with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</p>

        <div className='flex flex-row items-center justify-center mt-5' >

            <img src={knowyourprogress} alt="image with text know your progress " className='object-contain -mr-32'/>
            <img src={comparewithothers} alt="image with text compare with others " className='object-contain'/>
            <img src={planyourlesson} alt="image with text plan with lesson" className='object-contain -ml-36'/>
        </div>

        <div>
            <CTAButton active={true} linkto={"/signup"} >
                Learn more
            </CTAButton>
        </div>

</div>
        </div>
    
  )
}

export default LearningSection