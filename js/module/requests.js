//7. Devuelve un listado con los distintos estados por los que puede pasar un pedido.
export const getAllStates = async () =>{
    let res = await fetch("http://localhost:5508/requests?status")
    let data = await res.json();
    const dataUpdate = data.reduce(function (status, client){
        return Array.from(new Set([...status, client.status]))
    }, [])
    return dataUpdate;
}

//8. Devuelve un listado con el código de cliente de aquellos clientes que realizaron algún pago en 2008. Tenga en cuenta que deberá eliminar aquellos códigos de cliente que aparezcan repetidos.
export const getAllDateTwoThousandEightCodeClient = async () =>{
    let res = await fetch("http://localhost:5508/requests?date_request")
    let data = await res.json();
    let dataUpdate = [];
    data.forEach(val => {
        if(val.date_request[3] == "8"){
            dataUpdate.push({
                cliente: val.code_client
            })
        }
    })
    const data2 = dataUpdate.reduce(function (status, client){
        return Array.from(new Set([...status, client.cliente]))
    }, [])
    return data2;
}

//9. Devuelve un listado con el código de pedido, código de cliente, fecha esperada y fecha de entrega de los pedidos que no han sido entregados a tiempo.
export const  getAllAfterTimeDeliveryCodeAndDate = async () =>{
    let res = await fetch("http://localhost:5508/requests?date_request")
    let data = await res.json();
    let dataUpdate = [];
    data.forEach(val => {
        if(val.date_wait < val.date_delivery){
            dataUpdate.push({
                pedido: val.code_request,
                cliente: val.code_client,
                fecha_esperada: val.date_wait,
                fecha_entrega: val.date_delivery
            })
        }
    })
    return dataUpdate;
}

//10. Devuelve un listado con el código de pedido, código de cliente, fecha esperada y fecha de entrega de los pedidos cuya fecha de entrega ha sido al menos dos días antes de la fecha esperada.
export const  getAllBeforeTimeDeliveryCodeAndDate = async () =>{
    let res = await fetch("http://localhost:5508/requests?status=Entregado")
    let data = await res.json();
    let dataUpdate = [];
    data.forEach(val => {
        if(val.date_delivery == null){
            dataUpdate.push({
                estado: val.status,
                pedido: val.code_request,
                cliente: val.code_client,
                fecha_esperada: val.date_wait,
                fecha_entrega: null
            })
        } else{
            let x = (val.date_delivery[8,9]) - (val.date_wait[8,9]);
            if(x <= 2){
                dataUpdate.push({
                    estado: val.status,
                    pedido: val.code_request,
                    cliente: val.code_client,
                    fecha_esperada: val.date_wait,
                    fecha_entrega: val.date_delivery
                })
            }
        }        
    })
    return dataUpdate;
}