import React, { useEffect, useState } from 'react'
import {motion} from 'framer-motion'
import easeEffectVariants from '../../assets/easeEffect'
import ArrowIcon from '../../components/ArrowIcon.js'
import Item from '../../components/Item/Item.js'
import ListItem from '../../components/ListItem/ListItem.js'
import { getFirestore } from '../../firebase/index.js';

import './Home.css'
const Home = ({greeting}) => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const db = getFirestore();
    const itemCollection = db.collection('items');
    itemCollection.get().then((querySnapshot) => {
        //debugger;
        setIsLoading(false);
        setItems(querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id})));
    })
    
    useEffect(()=>{
        document.title = "Hallo";
    }, []);
    return(
        <>
            <section className="home-container">
                    <svg viewBox="0 0 500 250" preserveAspectRatio="none">
                        <linearGradient id="gradient-horizontal">
                            <stop offset="0%" stop-color="var(--color-stop-1)" />
                            <stop offset="100%" stop-color="var(--color-stop-3)" />
                        </linearGradient>
                        <path  d="M0.00,92.27 C216.83,192.92 304.30,8.39 500.00,109.03 L500.00,0.00 L0.00,0.00 Z"></path>
                    </svg>
                <div className="greeting-container">
                    <motion.h1 initial="hidden" animate="show" variants={easeEffectVariants} className="title-1">{greeting}</motion.h1>
                </div>
                <h2 className="title-1">Unite a la comunidad más grande de tecnología</h2>
                <ArrowIcon/>
            </section>
            <h2 className="title-2" style={{color: 'var(--violeta-oscuro)'}}>Los más populares</h2>
            <ListItem  Item={Item} isLoading={isLoading} items={items}/>
        </>
    )
}
export default Home