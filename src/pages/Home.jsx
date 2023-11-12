import React from 'react'
import { Link } from 'react-router-dom'
// import {BsArrowCounterclockwise} from "react-icons"
import HighlightText from '../components/core/Home/HighlightText'
import CTAButton from '../components/core/Home/Button'
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../components/core/Home/CodeBlocks'
import "../../src/App.css";
import TimeLineSection from '../components/core/Home/TimeLineSection'
import LearningSection from '../components/core/Home/LearningSection'
import InstructorSection from '../components/core/Home/InstructorSection'
import Footer from '../components/common/Footer'

const Home = () => {
  return (
    <div>
    {/* // section 1 */}

    <div className='relative mx-auto text-white w-11/12 flex flex-col items-center justify-between ' >

        <Link to={"/signup"} >
            <div className='group w-fit mt-16 p-1 text-center rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 shadow-md' >
                <div className='flex flex-row  items-center gap-3 px-10 py-[5px] rounded-full transition-all duration-200 group-hover:bg-richblack-900'  >
                    <p>Become an Instructor</p>
                    {/* <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z"/></svg> */}
                    
                </div>
            </div>
        
        </Link>
        <div className='text-center text-4xl mt-7 font-semibold '>Empower your future with <HighlightText text = {"Coding Skills"}/></div>

        <div className='w-[58%] text-center mt-4 text-richblack-300 ' >
            With our online coding course, you can learn at your own pace from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes and personalized feedback from instructors.
        </div>
        <div className='flex flex-row gap-3  mt-8' >
            <CTAButton active={true} linkto={"/signup"} >
                Learn More    
            </CTAButton>
                
            <CTAButton active={false} linkto={"/login"} >
            Book a Demo
            </CTAButton>
        </div>

        <div className='shadow-blue-200 mx-14 my-14 ' >
            <video
            muted 
            loop
            autoPlay className='h-[550px] w-full'>
                <source src={Banner} type='video/mp4' />

            </video>
        </div>

        {/* code section 1 */}

        <div>
            <CodeBlocks
                position={"lg:flex-row"}
                heading={
                    <div className='text-4xl font-semibold' >
                        Unlock your 
                        <HighlightText text={" Coding Potential "} />
                        with our online courses
                    </div>
                }
                subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you"}
                ctabtn1={
                    {
                        linkto:('/signup'),
                        active:(true),
                        btntext: ("Try it yourself")
                    }
                }
                ctabtn2={
                    {
                        linkto:('/login'),
                        active:(false),
                        btntext: ("Learn More")
                    }
                }
                codeblock = {`<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <body>
                    <h1>Welcome to StudyNotion</h1>
                </body>
                </html>
                `}
                codecolor={"text-yellow-25"}
            />
        </div>

        {/* code section 2 */}
        <div>
            <CodeBlocks
                position={"lg:flex-row-reverse"}
                heading={
                    <div className='text-4xl font-semibold' >
                        Start 
                        <HighlightText text={" Coding in Seconds "} />
                        
                    </div>
                }
                subheading={"Go ahead give it a try. Our hands-on learning environment means you will be writing real code from your very first lesson"}
                ctabtn1={
                    {
                        linkto:('/signup'),
                        active:(true),
                        btntext: ("Continue Learning")
                    }
                }
                ctabtn2={
                    {
                        linkto:('/login'),
                        active:(false),
                        btntext: ("Learn More")
                    }
                }
                codeblock = {`<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <body>
                    <h1>Welcome to StudyNotion</h1>
                </body>
                </html>
                `}
                codecolor={"text-yellow-25"}
            />
        </div>

    </div>
    

    {/* // section 2 */}

    <div className='bg-pure-greys-5 text-richblack-700' >
            <div className='homepage_bg h-[333px]' >
                <div className='w-11/12 max-w-maxContent flex flex-col justify-center items-center gap-5 mx-auto ' >
                    <div className='h-[150px]'></div>

                    <div className='flex flex-row gap-7 text-white' >

                        <CTAButton active={true} linkto={"/signup"} >
                            Explore full Catalogue
                        </CTAButton>

                        <CTAButton active={false} linkto={"/signup"} >
                            Learn More
                        </CTAButton>

                    </div>

                </div>
            </div>
            <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7 ' >
                <div className='flex flex-row gap-5 mt-16' >

                    <div className='w-[69%] text-4xl' >
                        Get the skills that you need for a <HighlightText text={"job that is in demand "} />
                    </div>

                    <div className='flex flex-col gap-6' >

                        <div>
                            The modern Studynotion is the dictates of its own terms. Today, to be a competitive specialist requires more that professional skills.
                        </div>

                        <div className='w-fit' >
                            <CTAButton active={true} linkto={"/signup"} >
                                Learn more
                            </CTAButton>
                        </div>

                    </div>

                </div>

                <TimeLineSection/>

                <LearningSection/>

            </div>

            

    </div>

    {/* // section 3 */}

    <div className='w-11/12 mx-auto mt-10 max-w-maxContent flex flex-col gap-8 justify-between items-center first-letter bg-richblack-900 text-white ' >

            <InstructorSection/>

            <div>
                <h2 className='text-center mt-10 font-bold text-4xl' >Reviews from other learners</h2>
            </div>


    </div>

    {/* // Footer */}
    <Footer/>
    </div>
  )
}

export default Home