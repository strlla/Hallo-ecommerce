import React, { useEffect, useState } from 'react'
import {motion} from 'framer-motion'
import {useParams} from 'react-router-dom';

import easeEffectVariants from '../../assets/easeEffect'
import Item from '../../components/Item/Item.js'
import ListItem from '../../components/ListItem/ListItem.js'
import { getFirestore } from '../../firebase/index.js';
import './ListItemCategories.css';


const ListItemCategories = () => {
    const { categoryId } = useParams();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true)
    
    useEffect(()=>{
        document.title = "Hallo";
    }, []);

    useEffect(()=>{
        const db = getFirestore();
        const itemCollection = db.collection('items');
        const itemsPerCategory = itemCollection.where('categoryId','==', categoryId);

        itemsPerCategory.get().then((querySnapshot) => {
            //debugger;
            setLoading(false);
            setItems(querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id})));
        });
    })
    
    return(
        <>
            <section className="categories-container">
                <svg viewBox="0 0 500 250" preserveAspectRatio="none">
                    <linearGradient id="gradient-horizontal">
                        <stop offset="0%" stop-color="var(--color-stop-1)" />
                        <stop offset="100%" stop-color="var(--color-stop-3)" />
                    </linearGradient>
                    <path  d="M0.00,92.27 C216.83,192.92 304.30,8.39 500.00,109.03 L500.00,0.00 L0.00,0.00 Z"></path>
                </svg>
                <div className="title-container">
                    <motion.h1 initial="hidden" animate="show" variants={easeEffectVariants} className="title-1">{categoryId}</motion.h1>
                </div>
            </section>
            <div className="list-item">
                <ListItem Item={Item} isLoading={loading} items={items}/>
            </div>
        </>
    )
}
export default ListItemCategories;