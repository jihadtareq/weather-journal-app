/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
const baseURL ='https://openweathermap.org/data/2.5/weather?zip=';
const APIkey = 'e5f1d30dabc61588114bc27d77162b8e';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click',performAction)

/* Function called by event listener */
function performAction(e){

    const newFeelings = document.getElementById('feelings').value;
    const zip =document.getElementById('zip').value;
    getData(baseURL,zip,APIkey)
    .then(function(temperature){
        //add data
        console.log(data);
        postData('/add',{temp:temperature,date:newDate,content:newFeelings});
        updateUI();
    });
    
}

/* Function to GET Web API Data*/
const getData = async (baseURL,zip,key)=>{
    const res =await fetch(baseURL + zip + ',eg&APPID=' + key)
   // const res =await fetch('/fakedata')

    try{
        const data = await res.json();
        const temperature=data.main.temp;
        //console.log(data)
        return temperature;
    }catch(error){
        console.log("error",error);
    }
}

/* Function to GET Project Data */

const getProjectData = async(url='')=>{
    const res = await fetch(url);
    try{
        const allData =await res.json();
        return allData;
    }catch(error){
        console.log("error",error);
    }

}
/* Function to POST data */
const postData = async(url='',data={})=>{

    const response = await fetch(url,{
        method:'POST',
       // mode:'no-cors',
        credentials:'same-origin',
        headers:{
            'content-type':'application/json',
        },
        body:JSON.stringify(data),

    });

    try{
        const newData = await response.json();
        console.log(newDate);
        return newData;
    }
    catch(error)
    {
       console.log("error",error);
    }

}


/*UPDATEUI */
const updateUI = async()=>{

    const request = await fetch('/all');
    try{
        const allData = await request.json();
        console.log(allData);
        document.getElementById('date').innerHTML=allData[0].date;
        document.getElementById('temp').innerHTML=allData[0].temperature;
        document.getElementById('content').innerHTML=allData[0].content;

    }catch(error){
        console.log("error",error);
    }

}

