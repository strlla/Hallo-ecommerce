import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom'
import easeEffectVariants from '../../assets/easeEffect';
import {motion} from 'framer-motion';
import { useCartContext } from '../../contexts/CartContext';
import { getFirestore } from '../../firebase';
import Checkout from '../../components/Checkout/Checkout';
import OrderStatus from '../../components/Alert/Alert';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import './Cart.css';

const Cart = () => {
    const {list, deleteItem, price} = useCartContext();
    const [checkout, setCheckout] = useState(false);
    const [show, setShow] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);
    const [orderId, setOrderId] = useState(null);
        
    useEffect(()=>{
        document.title = "Hallo | Mi Carrito";
    }, []);

    function updateUserInfo(userInfo){
        setUserInfo(userInfo);
    }

    async function createOrder(){
        const db = getFirestore();
        const items = list.map(cartItem => ({id: cartItem.id, qty: cartItem.quantity}));
        const itemsToUpdate = db.collection('items').where(firebase.firestore.FieldPath.documentId(), 'in', items.map(i => i.id));
        
        setLoading(true);
        const query = await itemsToUpdate.get();
        const batch = db.batch();
        const outOfStock = [];
        const orders = db.collection('orders');
        const newOrder = {
            buyer: userInfo,
            items: list,
            date: firebase.firestore.FieldValue.serverTimestamp(),
            total: price()
        }
        
        query.docs.forEach((docSnapshot, idx) => {
            if(docSnapshot.data().stock >= items[idx].qty){
                batch.update(docSnapshot.ref, { stock: docSnapshot.data().stock - items[idx].qty});
            } else {
                outOfStock.push({ ...docSnapshot.data(), id: docSnapshot.id});
            }
        })
        
        if(outOfStock.length === 0){
            await batch.commit();
            try {
                const { id } = await orders.add(newOrder);
                setOrderId(id);
                console.log(id);
                setLoading(false);
                setCheckout(false);
                setStatus('✨¡Tu compra fue realizada con éxito!');
                showModal();
            } catch (err) {
                //seteamos feedback para el usuario
                console.log(err);
                setStatus(err);
            }
        }else{
            setLoading(false);       
            setCheckout(false);
            setStatus('😯 Nos quedamos sin stock y no se pudo realizar tu compra');
            showModal();
        }
        if(outOfStock.length !== 0){
            console.log('Items sin stock: ', outOfStock.length);
        }
    }
    function showModal(){
        setShow(true);
        setTimeout(()=>{
            setShow(false);
        }, 3000)
    }
    return <>
        { checkout && <Checkout createOrder={createOrder} onChange={updateUserInfo} setShowModal={setCheckout} loading={loading} /> }
        { show && <OrderStatus status={status} setStatus={setStatus} orderId={orderId}/> }
        <section className="cart-section">
            <svg viewBox="0 0 500 250" preserveAspectRatio="none">
                <linearGradient id="gradient-horizontal">
                    <stop offset="0%" stop-color="var(--color-stop-1)" />
                    <stop offset="100%" stop-color="var(--color-stop-3)" />
                </linearGradient>
                <path  d="M0.00,92.27 C216.83,192.92 304.30,8.39 500.00,109.03 L500.00,0.00 L0.00,0.00 Z"></path>
            </svg>
            <div className="title-container">
                <motion.h1 initial="hidden" animate="show" variants={easeEffectVariants} className="title-1">Mi Carrito</motion.h1>
            </div>
            <div className="cart">
                <ul className="cart-item">
                    {list.length === 0 ? <EmptyCart/> : <>
                        {list.map(i => 
                            <li>
                                <span><Link to={`/item/${i.id}`}><strong>{i.title}</strong></Link></span>
                                <span><strong>${i.price}</strong> x {i.quantity}</span>
                                <motion.span className="button-text delete-item" onClick={()=>{deleteItem(i.id)}} whileTap={{scale: 0.9}}>x</motion.span>
                            </li>)}
                        <li><span>Total: <strong>${price()}</strong></span></li>
                        <li><motion.button whileTap={{scale: 0.95}} whileHover={{scale: 1.05}} className="button-text checkout-button" onClick={()=>{setCheckout(true)}}>Checkout</motion.button></li>
                    </>}
                </ul>
            </div>
        </section>
    </>
}

const EmptyCart = () => {
    return <li className="li-empty-cart">¡Empezá a comprar! <Link to="/">Ir a la Home</Link></li>
}
export default Cart
