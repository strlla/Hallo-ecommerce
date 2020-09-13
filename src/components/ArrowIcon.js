import React from 'react';
import { motion } from 'framer-motion';
import iconflechita from '../assets/icons/flechita.svg';

const ArrowIcon = () => {
    return(
        <motion.img style={style} variants={variants} initial="initial" animate="animate" src={iconflechita} height={24} alt=""/>
    )
}
const style={
    margin: '40px auto',
    cursor: 'pointer',
    backgroundColor: '#4b00df10',
    padding: '10px',
    borderRadius: '50px'
}
const variants = {
    initial: {
        y: 0,
    },
    animate: {
        y: '1vh',
        transition: {
            yoyo: Infinity,
            ease: 'easeInOut',
            duration: 0.6,
        }
        
    }
}
export default ArrowIcon