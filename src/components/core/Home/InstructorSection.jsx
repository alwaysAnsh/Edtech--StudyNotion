import React from 'react'
import HighlightText from './HighlightText'
import CTAButton from "./Button"
import Instructor from "../../../assets/Images/Instructor.png"

const InstructorSection = () => {
  return (
    <div className='flex flex-row gap-10 items-center justify-center mt-10' >
        <img src={Instructor} alt="a woman holding a book in her hand" className='shadow-white'/>

        <div className='flex flex-col w-[50%] gap-10' >

            <div className='flex flex-col gap-2' >
                <h2 className='font-bold text-4xl' >Become an  </h2>
                <h2 className='font-bold text-4xl' ><HighlightText text={"instructor"} /></h2>
                <p className='font-md text-[16px] text-richblack-300' >Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love</p>
            </div>

            <div className='w-fit' >
                <CTAButton active={true} linkto={"/signup"} >
                    Start Teaching Today
                </CTAButton>
            </div>

        </div>

    </div>
  )
}

export default InstructorSection