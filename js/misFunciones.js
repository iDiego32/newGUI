function autoInicioCategoria(){
    console.log("Categoria con normalidad")
    $.ajax({
        url:"http://152.67.42.64:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
            let $select = $("#select-category");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    
    })
}

function pintarRespuesta(respuesta){

    let myTable="<table border 2px>";
    myTable +=  "<tr>"+
                "<td>"+"Nombre"+"</td>"+
                "<td>"+"Descripcion"+"</td>"+
                "<td>"+"Moto Asociada"+"</td>"+
                "</tr>";

    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td>"+JSON.stringify(respuesta[i].motorbikes)+"</td>";
    
        myTable+="<td> <button onclick=' actualizarInformacionCategorias("+respuesta[i].id+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarCategoria("+respuesta[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado1").html(myTable);
}

function guardarInformacionCategorias(){
    let var2 = {
        name:$("#Cname").val(),
        description:$("#Cdescription").val()
        };
        if("#Cname".val()){
            alert("TRUE");
        }else{
            alert("FALSE");
        }
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        
        url:"http://152.67.42.64:8080/api/Category/save",

        
        success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            window.location.reload()
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("No se guardo correctamente");
    
    
        }
        });

}

function actualizarInformacionCategorias(idElemento){
    let myData={
        id:idElemento,
        name:$("#Cname").val(),
        description:$("#Cdescription").val()

    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://152.67.42.64:8080/api/Category/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#Cname").val("");
            $("#Cdescription").val("");
            autoInicioCategoria();
            alert("se ha Actualizado correctamente la categoria")
        }
    });

}

function borrarCategoria(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://152.67.42.64:8080/api/Category/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            autoInicioCategoria();
            alert("Se ha Eliminado.")
        }
    });

}
////////////Tabla Motocicletas////////////////////

function autoInicioMotos(){
    console.log("Motos con normalidad")
    $.ajax({
        url:"http://152.67.42.64:8080/api/Motorbike/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta1(respuesta);
            let $select = $("#select-moto");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    
    })

}
function pintarRespuesta1(respuesta){

    let myTable="<table border 2px>"+"<br>";
    myTable +=  "<tr>"+
    "<td>"+"Nombre"+"</td>"+
    "<td>"+"Marca"+"</td>"+
    "<td>"+"Modelo"+"</td>"+
    "<td>"+"Descripcion"+"</td>"+
    "<td>"+"Categoria"+"</td>"+
    "<td>"+"Categoria asociada"+"</td>"+
    "<td>"+"Mensajes asociados"+"</td>"+
    "<td>"+"Reservaciones asociados"+"</td>"+

    "</tr>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].brand+"</td>";
        myTable+="<td>"+respuesta[i].year+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td>"+respuesta[i].category.name+"</td>";
        myTable+="<td>"+JSON.stringify(respuesta[i].category)+"</td>";
        myTable+="<td>"+JSON.stringify(respuesta[i].messages)+"</td>";
        myTable+="<td>"+JSON.stringify(respuesta[i].reservations)+"</td>";
        myTable+="<td> <button onclick=' actualizarInformacionOrtesis("+respuesta[i].id+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarOrtesis("+respuesta[i].id+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table border 2px>"+"<br>";

    $("#resultado2").html(myTable);
    
    
}

function guardarInformacionMotos(){
    let var2 = {
        name:$("#Oname").val(),
        brand:$("#Obrand").val(),
        year:$("#Oyear").val(),
        description:$("#Odescription").val(),
        category: {id:+$("#select-category").val()},
        };
        
        console.log(var2);
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),
        url:"http://152.67.42.64:8080/api/Motorbike/save",

        
        success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            window.location.reload()
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("No se guardo correctamente");
    
    
        }
        });

}

function actualizarInformacionOrtesis(idElemento){
    let myData={
        id:idElemento,
        name:$("#Oname").val(),
        brand:$("#Obrand").val(),
        year:$("#Oyear").val(),
        description:$("#Odescription").val(),
        category: {id:+$("#select-category").val()},


    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://152.67.42.64:8080/api/Motorbike/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#id").val("");
            $("#Oname").val("");
            $("#Obrand").val("");
            $("#Oyear").val("");
            $("#Odescription").val("");
            $("#select-category").val("");
            autoInicioMotos();
            alert("se ha Actualizado correctamente esta Moto")
        }
    });

}

function borrarOrtesis(idElemento){
    let myData={
        id:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://152.67.42.64:8080/api/Motorbike/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            autoInicioMotos();
            alert("Se ha Eliminado.")
        }
    });

}
////////////////////////////Tabla Cliente////////////////////////////
function autoInicioCliente(){
    console.log("Cliente con normalidad")
    $.ajax({
        url:"http://152.67.42.64:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta2(respuesta);
            let $select = $("#select-cliente");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.idClient+'>'+name.name+'</option>');
                console.log("select "+name.idClient);
            }); 
        }
    
    })
}

function pintarRespuesta2(respuesta){

    let myTable="<table border 2px>";
    myTable +=  "<tr>"+
    "<td>"+"E-mail"+"</td>"+
    "<td>"+"Contraseña"+"</td>"+
    "<td>"+"Nombre"+"</td>"+
    "<td>"+"Edad"+"</td>"+
    "<td>"+"Mensajes asociados"+"</td>"+
    "<td>"+"Reservaciones asociados"+"</td>"+
    "</tr>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        
        myTable+="<td>"+respuesta[i].email+"</td>";
        myTable+="<td>"+respuesta[i].password+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].age+"</td>";
        myTable+="<td>"+JSON.stringify(respuesta[i].messages)+"</td>";
        myTable+="<td>"+JSON.stringify(respuesta[i].reservations)+"</td>";
        myTable+="<td> <button onclick=' actualizarInformacionCliente("+respuesta[i].idClient+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarCliente("+respuesta[i].idClient+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado3").html(myTable);
}

function guardarInformacionCliente(){
    let var2 = {
        
        email:$("#Clemail").val(),
        password:$("#Clpassword").val(),
        name:$("#Clname").val(),
        age:$("#Clage").val(),

        };

        console.log(var2);
        $.ajax({
        url:"http://152.67.42.64:8080/api/Client/save",
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),

        success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            window.location.reload()
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("No se guardo correctamente");
    
    
        }
        });

}

function actualizarInformacionCliente(idElemento){
    let myData={
        idClient:idElemento,
        email:$("#Clemail").val(),
        password:$("#Clpassword").val(),
        name:$("#Clname").val(),
        age:$("#Clage").val(),


    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://152.67.42.64:8080/api/Client/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            $("#idClient").val("");
            $("#Clemail").val("");
            $("#Clpassword").val("");
            $("#Clname").val("");
            $("#Clage").val("");
            autoInicioCliente();
            alert("se ha Actualizado correctamente Cliente")
        }
    });

}

function borrarCliente(idElemento){
    let myData={
        idClient:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://152.67.42.64:8080/api/Client/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            autoInicioCliente();
            alert("Se ha Eliminado.")
        }
    });

}

///////////////////Mensajes///////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function autoInicioMensajes(){
    console.log("Mensajes con normalidad")
    $.ajax({
        url:"http://152.67.42.64:8080/api/Message/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta4(respuesta);
        }
    
    })

}
function pintarRespuesta4(respuesta){

    let myTable="<table border 2px>";
    myTable +=  "<tr>"+
    "<td>"+"Cliente"+"</td>"+
    "<td>"+"Mensaje"+"</td>"+
    "<td>"+"Moto"+"</td>"+
    "</tr>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td>"+respuesta[i].messageText+"</td>";
        myTable+="<td>"+respuesta[i].motorbike.name+"</td>";
        myTable+="<td>"+respuesta[i].motorbike.name+"</td>";
        myTable+="<td> <button onclick=' actualizarInformacionMensajes("+respuesta[i].idMessage+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarMensaje("+respuesta[i].idMessage+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado4").html(myTable);
}

function guardarInformacionMensaje(){
    let var2 = {
        messageText:$("#Imensaje").val(),
        client:    {idClient:+$("#select-cliente").val()},
        motorbike: {id:+$("#select-moto").val()},
        };

        console.log(var2);
        $.ajax({
        url:"http://152.67.42.64:8080/api/Message/save",
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),

        success:function(response) {
            console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            window.location.reload()
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert   ("No se guardo correctamente"+"\n"+
                    "mensaje:"+$("#Imensaje").val()+"\n"+
                    "motos:"+$("#select-moto").val()+"\n"+
                    "cliente:"+$("#select-cliente").val());
    
    
        }
        });

}

function actualizarInformacionMensajes(idElemento){
    let myData={
        idMessage:idElemento,
        messageText:$("#Imensaje").val(),
        client: {idMessage:+$("#select-cliente").val()},
        motorbike: {idMessage:+$("#select-moto").val()},

    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://152.67.42.64:8080/api/Message/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#mensaje").empty();
            $("#select-cliente").val("");
            $("#select-moto").val("");
            autoInicioMensajes();
            alert("se ha Actualizado correctamente este Mensaje")
        }
    });

}

function borrarMensaje(idElemento){
    let myData={
        idMessage:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://152.67.42.64:8080/api/Message/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            autoInicioMensajes();
            alert("Se ha Eliminado.")
        }
    });

}

///////////////////Reservaciones///////////////////

function autoInicioReservacion(){
    console.log("Mensajes con normalidad")
    $.ajax({
        url:"http://152.67.42.64:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta5(respuesta);
        }
    
    })

}
function pintarRespuesta5(respuesta){

    let myTable="<table border 2px>";
    myTable +=  "<tr>"+
    "<td>"+"Fecha de reserva"+"</td>"+
    "<td>"+"Fecha de devolucion"+"</td>"+
    "<td>"+"Moto"+"</td>"+
    "<td>"+"Cliente"+"</td>"+
    "</tr>";

    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].startDate+"</td>";
        myTable+="<td>"+respuesta[i].devolutionDate+"</td>";
        myTable+="<td>"+respuesta[i].motorbike.name+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td> <button onclick=' actualizarInformacionReservacion("+respuesta[i].idReservation+")'>Actualizar</button>";
        myTable+="<td> <button onclick='borrarReservacion("+respuesta[i].idReservation+")'>Borrar</button>";
        myTable+="</tr>";
        
    }
    myTable+="</table>";
    $("#resultado5").html(myTable);
}

function guardarInformacionReservacion(){
    let var2 = {
        startDate: $("#Ifecha").val(),
        devolutionDate: $("#Ifechadev").val(),
        client:    {idClient:+$("#select-cliente").val()},
        motorbike: {id:+$("#select-moto").val()},
        };

        console.log(var2);
        $.ajax({
        url:"http://152.67.42.64:8080/api/Reservation/save",
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),

        success:function(response) {
            console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            window.location.reload()
    
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert   ("No se guardo correctamente"+"\n"+
                    "fecha:"+$("#Ifecha").val()+"\n"+
                    "fecha dev:"+$("#Ifechadev").val()+"\n"+
                    "cliente:"+$("#select-cliente").val()+"\n"+
                    "moto:"+$("#select-moto").val());
    
    
        }
        });

}

function actualizarInformacionReservacion(idElemento){
    let myData={
        idReservation:idElemento,
        startDate: $("#Ifecha").val(),
        startDate: $("#Ifechadev").val(),
        client:    {idClient:+$("#select-cliente").val()},
        motorbike: {id:+$("#select-moto").val()},

    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://152.67.42.64:8080/api/Reservation/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#Ifecha").empty();
            $("#Ifechadev").empty();
            $("#select-cliente").val("");
            $("#select-moto").val("");
            autoInicioReservacion();
            alert("se ha Actualizado correctamente esta Reservación")
        }
    });

}

function borrarReservacion(idElemento){
    let myData={
        idReservation:idElemento
    };
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        url:"http://152.67.42.64:8080/api/Reservation/"+idElemento,
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultado").empty();
            autoInicioReservacion();
            alert("Se ha Eliminado.")
        }
    });
}
