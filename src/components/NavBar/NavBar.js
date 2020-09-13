import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import {NavLink, Link} from 'react-router-dom'
import iconbuscar from '../../assets/icons/buscar.svg'
import iconfavoritos from '../../assets/icons/favoritos.svg'
import iconmenu from '../../assets/icons/menu.svg'
import CartIcon from '../CartIcon.js'
import { useCartContext } from '../../contexts/CartContext.js';
import './NavBar.css'

const transition = {ease: "easeOut", duration: 0.3 }
const NavBar = ({categories}) => {
    const [isOpen, setIsOpen] = useState(false);
    const { quantity } = useCartContext();
    return(
        <>
            <div className="navbar-container">
                <div className="logo-container">
                <Link to={'/'}><h1 className="title-1">Hallo</h1></Link>
                </div>            
                <div className="menu-container">
                    <ul className="menu">
                        <li className="title-3 categories">Categorías
                            <ul className="categories-list">
                            {categories && categories.map((category) => {
                               return <motion.li whileTap={{scale: 0.9}}><Link to={`/categories/${category.key}`}>{category.description}</Link></motion.li>
                            })}
                            </ul>
                        </li>
                        <li><img src={iconbuscar} height={24} alt=""/></li>
                        <li><img src={iconfavoritos} height={24} alt=""/></li>
                        <motion.li whileTap={{scale: 0.95}}  whileHover={{scale: 1.1}}>
                            <NavLink to="/cart">
                                <span>{quantity}</span>
                                <CartIcon/>
                            </NavLink>
                        </motion.li>
                        <li>
                            <div className="avatar-placeholder"></div>
                        </li>
                    </ul>
                    <img className="hamburger-menu" src={iconmenu} height={28} onClick={()=> {setIsOpen(!isOpen)}} alt=""/>
                </div>
            </div>
            <AnimatePresence>
                {isOpen &&
                    <motion.div animate={{ x: 0 }} initial={{x: '100vw'}} exit={{x: '100vw'}} transition={transition} exitBeforeEnter>
                            <ul className="menu-mobile">
                            <li className="title-3">Categorias</li>
                            <motion.li  whileTap={{scale: 0.95}} className="title-3" onClick={()=>{setIsOpen(false)}}><Link to="/cart">Carrito</Link></motion.li>
                            <li className="title-3">Favoritos</li>
                            <li className="title-3">Buscar</li>
                        </ul>
                    </motion.div>}
            </AnimatePresence>
        </>
    )
}
export default NavBar