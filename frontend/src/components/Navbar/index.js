import React from 'react'
import classes from './index.module.css'

const Navbar = () => {
    return (
        <nav className={classes.navbar}>
            <div className={classes.logo}>
                <img src={'/images/logo.png'} alt={'logo'}/>
                <span>Meet</span>
            </div>
        </nav>
    )
}
export default Navbar
