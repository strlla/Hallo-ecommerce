import React from 'react';
import {motion, AnimatePresence } from 'framer-motion';
import './Alert.css';

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

function OrderStatus({status, orderId}){
    return <AnimatePresence exitBeforeEnter>
        <motion.div className="backdrop status-backdrop" variants={backdrop} initial="hidden" animate="visible" exit= "hidden">
            <motion.div variants={modal}>
                <div className="orderstatus-modal">
                    <h3 className="title-3">{status}</h3>
                    {orderId && <p className="body-1">Aca tenés el código de tu orden {orderId}</p>}
                </div>
            </motion.div>
        </motion.div>
    </AnimatePresence>
}

export default OrderStatus;