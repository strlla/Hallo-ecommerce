import React, {useEffect} from 'react';
import {motion, AnimatePresence } from 'framer-motion';
import './OrderStatus.css';

const backdrop = {
    visible: { opacity: 1},
    hidden: { opacity: 0 }
}

const modal = {
    hidden: { 
        opacity: 0,
        y: 0,
        transition:  {duration: 0.3}
    },
    visible: {
        y: '10vh',
        opacity: 1,
        transition:  {duration: 0.2}
    }
}

function OrderStatus({status, setStatus}){

    useEffect(()=>{
        setTimeout(()=>{
           setStatus(null)
        }, 2000)
    })

    return <AnimatePresence exitBeforeEnter>
        <motion.div className="backdrop status-backdrop" variants={backdrop} initial="hidden" animate="visible" exit= "hidden">
            <motion.div variants={modal}>
                <div className="orderstatus-modal">
                    <h2 className="title-2">Estado de mi orden</h2>
                    <p className="body-1">{status}</p>
                </div>
            </motion.div>
        </motion.div>
    </AnimatePresence>
}

export default OrderStatus;