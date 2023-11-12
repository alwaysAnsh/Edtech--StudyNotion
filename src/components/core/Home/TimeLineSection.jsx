import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timelineimage from "../../../assets/Images/TimelineImage.png"

const timestamp = [
    {
        logo: Logo1,
        heading: "Leadership",
        description: "Fully commited to the success company",
    },
    {
        logo: Logo2,
        heading: "Responsibility",
        description: "Students will always be our priority",
    },
    {
        logo: Logo3,
        heading: "Flexibility",
        description: "The ability to switch is an important skill",
    },
    {
        logo: Logo4,
        heading: "Solve the problem",
        description: "Code your way to a solution",
    }
]

const TimeLineSection = () => {
  return (
    <div className='flex flex-row gap-6 items-center mt-10 ' >

        <div className='flex flex-col w-[45%] gap-4' >

            {
                timestamp.map((element, index) => {
                    return (
                        <div className='flex flex-row gap-6 ' key={index} >
                            <div className='w-[50px] h-[50px] bg-white flex items-center' >
                                <img src= {element.logo} />
                            </div>

                            <div>
                                <h2 className='font-semibold text-[18px]' >{element.heading}</h2>
                                <div className='text-base'>{element.description}</div>
                            </div>


                        </div>
                    )
                })
            }

        </div>

        {/* Right wala part */}
        <div className='relative shadow-blue-200 '>

            <img src={timelineimage} className='shadow-white object-cover h-fit'/>

            <div className='absolute bg-caribbeangreen-700 translate-x-[37px] translate-y-[-30px] flex flex-row text-white uppercase py-8' >

                <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7' >
                    <h1 className='text-4xl font-bold'>10</h1>
                    <p  className='text-caribbeangreen-300 text-sm' >Years of experience</p>
                </div>

                <div className='flex flex-row gap-5 items-center px-7' >
                <h1 className='text-4xl font-bold'>250</h1>
                    <p  className='text-caribbeangreen-300 text-sm' >Type of courses</p>
                </div>

            </div>

        </div>

    </div>
  )
}

export default TimeLineSection
