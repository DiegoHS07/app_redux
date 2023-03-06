import React from 'react';
import Productos from './Productos';

const Tienda = ({agregarProductoCarrito}) => {
    return (
        <div>
            <h1>Tienda</h1>
            <Productos
                agregarProductoCarrito={agregarProductoCarrito}
            />
        </div>
    );
}
 
export default Tienda;