// import React from 'react'
// import HighlightText from '../components/core/Home/HighlightText'
// import banner1 from "../../src/assets/Images/aboutus1.webp"
// import banner2 from "../../src/assets/Images/aboutus2.webp"
// import banner3 from "../../src/assets/Images/aboutus3.webp"

// const About = () => {
//   return (
//     <div>
//         {/* section 1 */}
//         <section>
//             <div className='text-white' >
//                 <header className=' text-center text-3xl' >

//                     Driving innovation in online education for a 
//                     <div>
//                         <HighlightText text={"brighter future"}  />
//                     </div>

//                 </header>
//                 <p>StudyNotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offerting cutting edge courses, leveraging emerging technologies and nurturing a vibrant learning community</p>

//                 <div className='flex mx-auto items-center justify-center gap-4' >
//                     <img src={banner1} alt="image 1" />
//                     <img src={banner2} alt="image 2" />
//                     <img src={banner3} alt="image 3" />

//                 </div>
//             </div>
//         </section>

//         {/* section2 */}
//         <div>

//             We are passionate about revolutionizing the way we learn. Our innovative platform combines technology, expertise and community to create an unparalleled educational experience.

//         </div>

//     </div>
//   )
// }

// export default About



import React from 'react'
import HighlightText from "../components/core/Home/HighlightText"
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import Quote from '../components/core/AboutPage/Quote'
import FoundingStory from "../assets/Images/FoundingStory.png"
import StatsComponent from '../components/core/AboutPage/StatsComponent'
import LearningGrid from '../components/core/AboutPage/LearningGrid'
import ContactFormSection from '../components/core/AboutPage/ContactFormSection'
import Footer from '../components/common/Footer'

const About = () => {
  return (
    <div className='mx-auto mt-[100px] w-11/12 text-white flex flex-col gap-32'>
        
      {/* section 1 */}
      <section>
        <div className='flex flex-col gap-8 w-full' >
        <div className='text-center text-richblack-200 text-lg' >About us</div>
            <header className='text-center mt-14 flex flex-col gap-6 w-full' >
                <div className='text-4xl font-bold flex flex-col' >Driving Innovation in Online Education for a
                <div className='text-4xl font-bold bg-gradient-to-r from-pink-100 to-indigo-600 inline-block text-transparent bg-clip-text' >Brighter Future </div>
                </div> 
                
                <p className='w-[55%] mx-auto text-md text-richblack-200 ' >Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
            </header>
            <div className='flex gap-x-8 items-center justify-center'>
                <img src={BannerImage1} className='shadow-md shadow-white/70 '/>
                <img src={BannerImage2} className='shadow-md shadow-white/70'/>
                <img src={BannerImage3} className='shadow-md shadow-white/70'/>
            </div>
        </div>
      </section>

      {/* section 2 */}

      <section className=' w-full' >
        <div className='w-[80%] text-center mx-auto text-4xl font-semibold' >
            <Quote  />
        </div>
      </section>


      {/* section 3 */}

      <section>
        <div className='flex flex-col p-10 gap-32'>
            {/* foudning story wala div */}
            <div className='flex w-full gap-32'>
                {/* founding story left box */}
                <div className='flex flex-col gap-8 w-[40%]'>
                    <h1 className='text-4xl font-inter font-bold bg-gradient-to-r from-red-300 via-pink-600 to-red-500 bg-clip-text text-transparent' >Our Founding Story</h1>

                    <p className='text-richblack-300 text-md font-inter' >Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>

                    <p className='text-richblack-300 text-md font-inter' >As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                </div>
                {/* foudning story right box */}
                <div className='translate-y-[60px] translate-x-16' >
                    <img  src={FoundingStory} className='w-[450px]'/>
                </div>
            </div>

            {/* vision and mission wala parent div */}
            <div className='flex flex-row w-full justify-between'>
                {/* left box */}
                <div className='max-w-[36%] flex flex-col gap-4' >
                    <h1 className='text-4xl font-inter font-bold bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500 bg-clip-text text-transparent' >Our Vision</h1>
                    <p className='text-richblack-300' >With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                </div>

                {/* right box */}
                <div className='max-w-[36%] flex flex-col gap-4 -translate-x-24'   >
                    <h1 className='text-4xl font-inter font-bold bg-gradient-to-r from-cyan-50 via-cyan-100 to-cyan-200 bg-clip-text text-transparent' >
                        Our Mission
                    </h1>
                    <p className='text-richblack-300' >Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                </div>
            </div>
        </div>
      </section>  

      {/* section 4 */}
      <StatsComponent/>  
      
      {/* section 5 */}
      <section className='mx-auto flex flex-col items-center justify-between gap-5 mb-[140px]'>
        <LearningGrid />
        <ContactFormSection />
      </section>



        {/* ******************************REVIEW SECTION PENDING******************************** */}

      {/* <section>
        <div>
            Reviews from other learners
            <ReviewSlider />
        </div>
      </section> */}



      <section className='' >
        <Footer/>
      </section>

    </div>
  )
}

export default About
