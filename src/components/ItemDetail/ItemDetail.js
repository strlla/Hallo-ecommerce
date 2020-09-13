import React from 'react'
import './ItemDetail.css'
import TextLoader from '../Loaders/TextLoader'
import ItemLoader from '../Loaders/ItemLoader'

const ItemDetail = ({isLoading, item}) => {
    return(
        <div className="item-detail">
            <div className="detail-image-container">
                {isLoading ? <ItemLoader height="inherit" width="inherit" borderRadius="inherit"/> :  <img src={item.imageId}/> }
            </div>
            <div className="item-info-container">
                {isLoading ? <TextLoader className="detail-title" width="50%" height="25px"/> : <h1 className="title-1">{item.title}</h1>}
                {isLoading ? <TextLoader className="detail-price" width="25%" height="20px"/> : <h2 className="title-2">${item.price}</h2> }
                {isLoading ? <TextLoader style={{top: '160px'}} className="detail-description" width="60%" height="20px"/> : <p className="title-3">{item.description}</p> }
                {isLoading ? <TextLoader style={{top: '200px'}} className="detail-description" width="70%" height="20px"/> : null}
            </div>
        </div>
    )
}

export default ItemDetail