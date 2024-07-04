const express= require('express')
const axios = require('axios');
const dotenv = require('dotenv');

// const ip=getIpInfoMiddleware
const app = express();
dotenv.config()

const port = process.env.PORT 


const getTemp =async (ip)=>{
    options = {
        method: 'GET',
        url: `https://weatherapi-com.p.rapidapi.com/current.json`,
        params: {q: ip==="127.0.0.1"?"auto:ip":ip},
        headers: {
          'x-rapidapi-key': process.env.RAPID_API_KEY,
          'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
        }
      };
      const response =await  axios.request(options);    
      return response.data;
}



app.get('/api/hello',async (req, res) => {
   
    const ip =req.ip.split(':')[3]
   const visitor_name = req.query.visitor_name || "visitor"
   
    const weatherData =await getTemp(ip)
     console.log(weatherData)
    res.status(200).json({"client_ip":ip, "location":weatherData.location.name, "greeting": `Hello, ${visitor_name}!, the temperature is ${Math.round(weatherData.current.temp_c)} degrees Celcius in ${weatherData.location.name}`});
})


app.get('/',async (req, res) => {
    res.status(200).json({message:"dfdgd"})
})
app.listen(port,()=>{
    console.log('listening on port '+port);
});