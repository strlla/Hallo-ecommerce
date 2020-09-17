import React, {useState, useEffect} from 'react';
import {motion, AnimatePresence } from 'framer-motion';
import './Checkout.css';

const backdrop = {
    visible: { opacity: 1},
    hidden: { opacity: 0}
}

const modal = {
    hidden: { 
        opacity: 0,
        transition:  {duration: 0.3}
    },
    visible: {
        y: '0px',
        opacity: 1,
        transition:  {duration: 0.2}
    }
}

function Checkout ({createOrder, onChange, setShowModal, loading}){
    const [form, setForm] = useState({
        name: '',
        email: '',
        email2: '',
        phone: '',
    });
    const [message, setMessage] = useState(null);

    function onInputChange(fieldId, evt){
        const value = evt.target.value;
        const formData = { ...form, [fieldId]: value};
        const { name, email, phone} = formData;
        
        onChange(Object.keys(formData).every(k => formData[k] !== '')
        && formData.email === formData.email2 ? ({name, email, phone}) : null);
        setForm(formData);
    }

    function onSubmit(){
        if(form.email !== form.email2){
            setMessage("Parece que los emails que ingresaste no son iguales");
        }else{
            createOrder();
        }
    }

    return <AnimatePresence exitBeforeEnter>
            <motion.div className="backdrop" variants={backdrop} initial="hidden" animate="visible" exit= "hidden">
                <motion.div variants={modal}>
                    <div className="checkout-modal">
                        <h1 className="title-1">¡Último Paso!</h1>
                        <p className="title-3">Completá el siguiente formulario con tus datos</p>
                        <div className="checkout-content">
                            <div className="flex-gap">
                                <input type="text" placeholder="Nombre y Apellido" onChange={(evt)=>{onInputChange('name', evt)}}/>
                                <input type="text" placeholder="Email" onChange={(evt)=>{onInputChange('email', evt)}}/>
                                <input type="text" placeholder="Repetí tu email" onChange={(evt)=>{onInputChange('email2', evt)}}/>
                                <input type="text" placeholder="Teléfono" onChange={(evt)=>{onInputChange('phone', evt)}}/>
                            </div>
                            {message && <p className="body-1">{message}</p>}
                            <div className="flex-gap">
                                <motion.button type="button" className="button-text close-button" whileTap={{scale: 0.95}} onClick={()=>{setShowModal(false)}}>Cancelar</motion.button>
                                <motion.button type="button" className="button-text submit-button" whileTap={Object.keys(form).every(k => form[k]) && {scale: 0.95}} whileHover={Object.keys(form).every(k => form[k]) && {scale: 1.05}} onClick={onSubmit} disabled={Object.keys(form).every(k => form[k]) ? false : true} >{loading ? "⏳ Procesando orden..." : "Finalizar Compra"}</motion.button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
    </AnimatePresence>
}

export default Checkout;