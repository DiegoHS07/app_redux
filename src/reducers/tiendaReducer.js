const estadoInicial = {
    productos: [
        {id: 1, nombre: 'Producto 1'},
        {id: 2, nombre: 'Producto 2'},
        {id: 3, nombre: 'Producto 3'},
        {id: 4, nombre: 'Producto 4'}
    ],

    carrito: []
    
}

// Reducer es una función que se va a encargar de administrar el estado
// global de la aplicación
const reducer = (estado = estadoInicial, accion) => {
    switch(accion.type){
        case 'AGREGAR_PRODUCTO_AL_CARRITO':

            const {nombreProducto, idProductoAAgregar} = accion;

            // Si el carrito no tiene elementos le agrego uno
            if(estado.carrito.length === 0){
                // Retorno el estado junto con el nuevo objeto en prop carrito
                return {
                    ...estado,
                    carrito: [{id: idProductoAAgregar, nombre: nombreProducto, cantidad: 1}]
                }
            }else{
                // De otra forma tenemos que revisar que el carrito no tenga ya el producto a agregar
                // Si ya lo tiene entonces tenemos que actualizar el valor de "cantidad"
                // Si no tiene el producto entonces lo agregamos

                // Para poder editar el arreglo tenemos que clonarlo
                const nuevoCarrito = [...estado.carrito];

                // Comprobamos si el carrito ya tiene el Id del producto a agregar
                // Esto me retorna true si encuentra productos en carrito y false si no hay ninguno
                const enCarrito = nuevoCarrito.filter((productoDeCarrito) => {
                    return productoDeCarrito.id === idProductoAAgregar
                }).length > 0;

                // Si ya tiene el producto entonces lo tenemos que actualizar
                if(enCarrito){
                    // Para ello tenemos que buscarlo, obtener su posicion en el arreglo.
                    // y en base a su posicion ya actualizar el valor de "cantidad"
                    nuevoCarrito.forEach((productoDeCarrito, index) => {
                    if(productoDeCarrito.id === idProductoAAgregar){
                        const cantidad = nuevoCarrito[index].cantidad;
                        nuevoCarrito[index] = {
                            id: idProductoAAgregar, 
                            nombre:nombreProducto, 
                            cantidad: cantidad + 1
                        };
                    }
                    })
                }else{
                    // De otra forma entonces agregamos el producto al arreglo
                    nuevoCarrito.push(
                        {
                            id: idProductoAAgregar, 
                            nombre: nombreProducto, 
                            cantidad: 1
                        }
                    )
                }

                // Retorno el estado junto con el nuevo valor de 
                return {
                    ...estado,
                    carrito: nuevoCarrito
                }
            }

        default:
            return estado;
    }
}

export default reducer;