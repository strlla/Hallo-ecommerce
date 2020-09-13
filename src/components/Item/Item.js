import React from 'react'
import {motion} from 'framer-motion'
import TextLoader from '../Loaders/TextLoader'
import ItemLoader from '../Loaders/ItemLoader'

import './Item.css'

const Item = ({image, title, price, description}) => {
    return(
        <motion.div whileTap={{scale: 0.95}} className="card">
            <div className="image-container">
                {image ? <img src={image}/> : <ItemLoader height="inherit" width="100%" borderRadius="inherit"/>}
            </div>
            <div className="info-container">
                {title ? <h1 className="info-title">{title}</h1> : <TextLoader className="info-title" width="50%" height="20px"/>}
                {description && <h3 className="info-description">{description}</h3>}
                {price ? <h2 className="info-price">$ {price}</h2> : <TextLoader className="info-price" width="70%" height="15px"/>}
                {price ? null : <TextLoader className="info-description" width="60%" height="15px"/>}
            </div>
        </motion.div>
    )
}
export default Item
