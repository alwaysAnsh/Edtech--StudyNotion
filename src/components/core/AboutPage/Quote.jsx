import React from 'react'
import HighlightText from '../Home/HighlightText'

const Quote = () => {
  return (
    <div className='text-richblack-100' >
        
        <sup className='text-5xl' >"</sup>
        <span>{ "   " }</span>
      We are passionate about revolutionizing the way we learn. Our innovative platform
      <span>{" "}</span>
      <div className='text-4xl font-bold bg-gradient-to-r from-pink-100 to-indigo-100 inline-block text-transparent bg-clip-text' > combines technology </div>

      <span >
        {" "}
        <div className='text-4xl font-bold bg-gradient-to-r from-cyan-100 via-cyan-200 to-sky-200 inline-block text-transparent bg-clip-text' >expertise </div>

      </span>
      , and community to create an 
      <span  >
      {" "}
      <div className='text-4xl font-bold bg-gradient-to-r from-yellow-50 to-yellow-500 inline-block text-transparent bg-clip-text' >unparalleled educational experience </div>

      </span>
      <span>{ "   " }</span>
      <sup className='text-5xl' >"</sup>
    </div>
  )
}

export default Quote
