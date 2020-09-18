import React, { useEffect, useState } from 'react';
import {motion} from 'framer-motion';
import {useParams} from 'react-router-dom';
import { getFirestore } from '../../firebase';
import ItemDetail from '../../components/ItemDetail/ItemDetail.js';
import ItemCount from '../../components/ItemCount/ItemCount.js';
import OrderStatus from '../../components/Alert/Alert.js';
import {useCartContext} from '../../contexts/CartContext.js';
import './ItemDetailContainer.css';

const ItemDetailContainer = () => {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(null);
    const [show, setShow] = useState(false);
    const { addItem, status } = useCartContext();

    useEffect(()=>{
        //Firebase
        const db = getFirestore();
        const itemCollection = db.collection("items");
        const newItem = itemCollection.doc(id);
        newItem.get().then((doc)=>{
            if(!doc.exists) { 
                console.log("El item no existe");
                return;
            }
            console.log("Item encontrado");
            setItem({id: doc.id, ...doc.data()});
        }).catch((error) => {
            console.log("Error buscando los items", error)
        }).finally(()=>{
            setLoading(false)
        })
    },[id])

    function onAdd(item){
        const newItem = {id: item.id, title: item.title, price: item.price, quantity: count}
        addItem(newItem);
        setShow(true);
        setTimeout(()=>{
            setShow(false)
        }, 700)
    }
    if(!item && !loading){
        return <section className="item-detail-section item-not-found">
            <h1 className="title-1">Oops, parece que el producto que estás buscando no existe</h1>
        </section>
    }
    return <>
        {show && <OrderStatus status={status}/>}
        <section className="item-detail-section">
            <ItemDetail isLoading={loading} item={item}/>
            {!loading && <ItemCount className="item-count" min={item.stock === 0 ? 0 : 1} max={item.stock} initial={item.stock === 0 ? 0 : 1} count={count} setCount={setCount}/>}
            {loading && <motion.button className="buy-button button-text" disabled={true}>comprar {count}</motion.button>}
            {!loading && <motion.button whileTap={item.stock && {scale: 0.95}} whileHover={item.stock && {scale: 1.05}} className="buy-button button-text" disabled={item.stock === 0} onClick={()=>{onAdd(item)}}>Agregar {count}</motion.button> }
        </section>
    </>
}

export default ItemDetailContainer;