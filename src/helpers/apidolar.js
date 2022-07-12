const axios= require('axios');
export const dolar=async()=>{

    try {
        const indicadores= await axios.get('https://mindicador.cl/api')
        const res= await indicadores.data.json()
        return res
    } catch (error) {
        console.log("Error en la API de los indicadores ecónomicos ", error)
        return 
    }
};

