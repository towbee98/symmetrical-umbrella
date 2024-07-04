const express= require('express')
const axios = require('axios');
const dotenv = require('dotenv');
const app = express();
dotenv.config()

const port = process.env.PORT 
// console.log(`Port: ${port}`)
 const baseUrl = "http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_"

const getTemp =async (ip)=>{
    options = {
        method: 'GET',
        url: `https://weatherapi-com.p.rapidapi.com/current.json?q=${ip}`,
        headers: {
          'x-rapidapi-key': process.env.RAPID_API_KEY,
          'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
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
    // console.log(req.query.visitor_name)
     console.log(req.ip.split(':')[3])
 console.log(req.headers['x-forwarded-for'])

//  const response= await axios.get(`http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY},q=${req.ip.split(':')[3]}`)          
//  console.log(response.data)
    const ip =await getIp()
   const visitor_name = req.query.visitor_name || "visitor"
    // {
    //     "client_ip": "127.0.0.1", // The IP address of the requester
    //     "location": "New York" // The city of the requester
    //     "greeting": "Hello, Mark!, the temperature is 11 degrees Celcius in New York"
    //   }
    const weatherData =await getTemp(req.ip.split(':')[3])
    // console.log(weatherData)
    res.status(200).json({"client_ip":req.ip.split(':')[3], "location":weatherData.location.name, "greeting": `Hello, ${visitor_name}!, the temperature is ${weatherData.current.temp_c} degrees Celcius in ${weatherData.location.name}`});
})


app.get('/',async (req, res) => {
    res.status(200).json({message:"dfdgd"})
})
app.listen(port,()=>{
    console.log('listening on port '+port);
});