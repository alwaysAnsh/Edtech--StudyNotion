import React from 'react'
import ContactUsForm from '../../ContactPage/ContactUsForm'

const ContactFormSection = () => {
  return (
    <div className='mx-auto mt-16 flex flex-col gap-6'>
      <h1 className='text-4xl font-bold font-inter text-center' >
        Get in Touch
      </h1>
      <p className='text-richblack-300 text-center ' >
        We'd love to here for you, Please fill out this form.
      </p>
      <div>
        <ContactUsForm />
      </div>
    </div>
  )
}

export default ContactFormSection
