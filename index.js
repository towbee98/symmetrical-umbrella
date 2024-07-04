const express= require('express')
const axios = require('axios');
const dotenv = require('dotenv');
const app = express();
dotenv.config()

const port = process.env.PORT 
// console.log(`Port: ${port}`)
// const baseUrl = "http://api.weatherapi.com/v1"

const getTemp =async (city)=>{
    options = {
        method: 'GET',
        url: `https://open-weather13.p.rapidapi.com/city/${city}/EN`,
        headers: {
          'x-rapidapi-key': process.env.RAPID_API_KEY,
          'x-rapidapi-host': 'open-weather13.p.rapidapi.com'
        }
      };
      const response =await  axios.request(options);    
      return response.data;
}


const getIp= async()=>{
    const response= await axios.get("http://ip-api.com/json")          
                return response.data
}

app.get('/api/hello',async (req, res) => {
   
    const ip =await getIp()
   const visitor_name = req.query.visitor_name || "visitor"
   
    const weatherData =await getTemp(ip.city)
    // console.log(weatherData)
    res.status(200).json({"client_ip":ip.query, "location":ip.city, "greeting": `Hello, ${visitor_name}!, the temperature is ${Math.round((weatherData.main.temp-32)*0.56)} degrees Celcius in ${ip.city}`});
})


app.get('/',async (req, res) => {
    res.status(200).json({message:"dfdgd"})
})
app.listen(port,()=>{
    console.log('listening on port '+port);
});