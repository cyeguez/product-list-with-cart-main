const data = '../data.json';
console.log(data)

async function cargarDatos(){
    try{
        const response = await fetch(data);
        if(!response.ok) throw new Error('error al cargar el json');
        const datos= await response.json();
        console.log(datos);
    }
    catch(error){
        console.log('error:', error.message);
    }
}

cargarDatos();