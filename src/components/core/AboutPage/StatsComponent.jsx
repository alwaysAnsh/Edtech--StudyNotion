import React from 'react'


const Stats = [
    {count: "5K", label: "Active Students"},
    {count: "10+", label: "Mentors"},
    {count: "200+", label: "Courses"},
    {count: "50+", label: "Awards"},
];

const StatsComponent = () => {
  return (
    <section className=' text-center bg-pure-greys-700 p-10' >
        <div>
            <div className='flex gap-x-5 items-center justify-evenly'>
                {
                    Stats.map( (data, index) => {
                        return (
                            <div key={index} className='flex flex-col gap-4' >
                                <h1 className='text-4xl font-bold' >
                                    {data.count}
                                </h1>
                                <h2 className='text-sm text-richblack-300' >
                                    {data.label}
                                </h2>
                            </div>
                        )
                    } )
                }
            </div>
        </div>
    </section>
  )
}

export default StatsComponent
