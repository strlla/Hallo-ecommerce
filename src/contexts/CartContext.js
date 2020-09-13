import React, {useContext, useState} from 'react'

export const CartContext = React.createContext();
export const useCartContext = () => useContext(CartContext)

export function CartProvider ({value, maxSize, children}){
    const [list, setList] = useState(value || []);

    function itemOnCart(id){
        const found = list.find(item => item.id === id);
        if (found !== undefined){
            return true;
        }
        return false;
    }

    function price(){
        return list.reduce((prev, next) => (prev + (next.quantity * next.price)), 0);
    }
    function size(){
        return list.reduce((prev, next) => (prev + next.quantity), 0);
    }
    //const order 
    function addItem(newItem) {
        if(itemOnCart(newItem.id)){
            const newList = [...list];
            newList.map(item => {
                if(item.id === newItem.id){
                    item.quantity += newItem.quantity;
                }
            })
            setList(newList);
        }else{  
          if(list.length < maxSize) {
            const l = [...list, newItem];
            setList(l);
          }
        }
    };
    
    function deleteItem(itemId) {
        const newList = list.filter(item => item.id !== itemId)
        setList(newList);
    }

    function cleanList() {
        setList([]);
    }
    
    return (
        <CartContext.Provider value={{list, addItem, cleanList, deleteItem, price, quantity: size()}}>
            {children}
        </CartContext.Provider>
    )
}


/*
[ { id: 1, price: 20 }, { id: 2, price: 30 } ].reduce((prev, next) => prev + next.price, 0);
 */