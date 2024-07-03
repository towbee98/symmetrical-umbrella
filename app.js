const express= require('express')
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config()
const app = express();

const port = process.env.PORT || 3000


const getTemp =async (city)=>{
    options = {
        method: 'GET',
        url: `https://open-weather13.p.rapidapi.com/city/${city}/EN`,
        headers: {
          'x-rapidapi-key': process.env.RAPTID_API_KEY,
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
    console.log(req.query.visitor_name)
    const ip =await getIp()
   const visitor_name = req.query.visitor_name || "visitor"
    // {
    //     "client_ip": "127.0.0.1", // The IP address of the requester
    //     "location": "New York" // The city of the requester
    //     "greeting": "Hello, Mark!, the temperature is 11 degrees Celcius in New York"
    //   }
    const weatherData =await getTemp(ip.city)
    res.status(200).json({"client_ip":ip.query, "location":ip.city, "greeting": `Hello, ${visitor_name}!, the temperature is ${weatherData.main.temp} degrees Celcius in ${ip.city}`});
})


app.listen(port,()=>{
    console.log('listening on port '+port);
});