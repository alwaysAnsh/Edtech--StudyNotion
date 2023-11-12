import React from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import {NavbarLinks} from "../../data/navbar-links"
import { useSelector } from 'react-redux'
// import state from 'concurrent/lib/state'
import {AiOutlineShoppingCart} from "react-icons/ai"
import profileDropdown from '../core/Auth/profileDropdown'


const Navbar = () => {

    const {token} = useSelector( (state) => state.auth );
    const {user} = useSelector( (state) => state.profile );
    const {totalItems} = useSelector( (state) => state.cart );

    const location = useLocation();

    const matchRoute = (route)=>{
        return matchPath({path:route}, location.pathname)
    }

  return (
    <div className='flex lg:h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ' >
        <div className='flex w-11/12 max-w-maxContent items-center justify-between ' >

            {/* Image  */}

            <Link
                to={"/"}>
                <img src={logo} alt="StudyNOtion logo" width={160} height={42} loading='lazy'/>
                </Link>

            {/* Navlinks */}
            <nav>
                <ul className='flex gap-x-6 text-richblack-25' >
                    {
                        NavbarLinks.map( (link, index) =>(
                             <li key={index} >
                                {
                                    link.title === "Catalog" ? (<div></div>) : (
                                        <Link to={link?.path} >
                                            <p className= {`${matchRoute(link.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                                {link.title}
                                            </p>
                                        
                                        </Link>
                                    )
                                }

                             </li>

                        ))
                    }
                </ul>
            </nav>
                
            {/* login,signup, dashboard */}

            <div className='flex lg:gap-x-4 md:gap-x-2 items-center' >

                {
                    user && user?.accountType !== "Instructor" && user?.accountType !== "Admin" && (
                        <Link to={"/dashboard/cart"} className='relative'>
                            <AiOutlineShoppingCart/>
                            {
                                totalItems > 0 && (
                                    <span className='absolute right-1' >
                                        {totalItems}
                                    </span>
                                )
                            }

                        </Link>
                    )
                }

                {
                    token === null && (
                        <Link to={"/login"} >
                            <button className='border-richblack-700 rounded-md border text-white pt-2 pb-2 pl-4 pr-4 text-sm' >
                                Login
                            </button>
                        
                        </Link>
                    )
                }

                {
                    token === null && (
                        <Link to={"/signup"} >
                            <button className='border-richblack-700 rounded-md border text-white pt-2 pb-2 pl-4 pr-4 text-sm' >  
                                Sign Up
                            </button>
                        
                        </Link>
                    )
                }

                {
                    token !== null && <profileDropdown/>
                }

            </div>
            

        </div>
    </div>
  )
}

export default Navbar