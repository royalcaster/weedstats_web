import React from "react";
import '../../../About.css'

const NavbarLink = ({ title, link, onClick }) => {
    return (
        <a className="navbar_link" onClick={() => onClick()} href={link}>{title}</a>
    )
}

export default NavbarLink