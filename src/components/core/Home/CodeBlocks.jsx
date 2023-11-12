import React from 'react'
import CTAButton from "./Button"
import HighlightText from './HighlightText'
import { TypeAnimation } from 'react-type-animation'


const CodeBlocks = ({
    position, ctabtn1, ctabtn2, heading, subheading, highlightText,codeblock, codecolor,btntext
}) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10`} >

        <div className='flex flex-col w-[50%] gap-8 ' >
            {/* code section 1 */}
            {heading}
            <div className='text-richblack-300 font-bold' >
                {subheading}
            </div>

            {/* buttons */}
            <div className='flex m-7 gap-7' >

                <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto} >
                    {ctabtn1.btntext}
                </CTAButton>

                <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto} >
                    {ctabtn2.btntext}
                </CTAButton>

            </div>

        </div>

        {/* section2 */}
        

        <div className='h-fit flex flex-row  w-[100%] py-4 lg:w-[550px] bg-richblack-50 bg-opacity-10  border-blue-400/[.5] p-2 border-[1px]' >
            {/* bg gradient add krna hai */}
            

            <div className='w-[10%] text-richblack-300 flex flex-col ' >
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
                <p>12</p>
            </div>

            <div className={` w-[90%] flex flex-col text-[16px] font-bold font-mono opacity-70 ${codecolor} pr-2`} >
                <TypeAnimation

                    sequence={[codeblock, 5000, ""]}
                    repeat={Infinity}
                    omitDeletionAnimation={true}
                    cursor={true}
                    style={
                        {
                            whiteSpace: "pre-line",
                            display: "block"
                        }
                    }

                />
            </div>
            

        </div>

    </div>
  )
}

export default CodeBlocks