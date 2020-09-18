import React, {useEffect} from 'react'
import { motion } from 'framer-motion'
import './ItemCount.css'

const ItemCount = ({min, max, initial, count, setCount}) => {   
    useEffect(()=>{
        setCount(initial)
    },[])

    const Increment = () => {
        if(count < max){
            setCount(count + 1)
        }
    }
    const Decrement = () => {
        if(count > min){
            setCount(count - 1)
        }
    }

    return <div className="item-count">
        <div className="controls-container">
            <motion.button className="control" whileTap={count === min ? null : {scale: 0.9}} onClick={()=>{Decrement()}} disabled={count === min}>-</motion.button>
                <div className="counter">
                    <p>{count}</p>
                </div>
            <motion.button className="control" whileTap={count === max ? null : {scale: 0.9}} onClick={()=>{Increment()}} disabled={count === max}>+</motion.button>
        </div>
    </div>
}

export default ItemCount;