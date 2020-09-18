import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

import './ListItem.css'

const ListItem = ( {Item, items, isLoading}) => {

    return <section className="card-container" style={{margin: '20px auto 20px'}}>
            {isLoading && [...Array(9)].map(()=>{
                return(
                    <Item />
                )
            })}
            {items.map((item)=>{
                return(
                    <Link to={`/item/${item.id}`}><Item isLoading={isLoading} image={item.imageId} title={item.title} description={item.description} price={item.price} /></Link>
                )
            })}
    </section>     
}

export default ListItem;