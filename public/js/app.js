const weatherform = document.querySelector('form')
const search = document.querySelector('input')

 const message1=document.querySelector('#message1')

 const message2 = document.querySelector('#message2')
// message1.textContent = 'from javascript'




weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
     const location = search.value
   
   fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
           message1.textContent=data.error
           message2.textContent= ''
        }
        else{


            const hourEl =document.querySelector('.hour')
            const minuteEl =document.querySelector('.minutes')
            const secondEl =document.querySelector('.second')
            const timeEl =document.querySelector('.time')
            const dateEl =document.querySelector('.date')
            const toggleEl =document.querySelector('.toggle')
            
            const days =["Sunday", "Monday", "Tuesday","Wednesday","Thursday","Friday","Saturday"];
            const months =["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
            
        
         message1.textContent=data.location
         message2.textContent = data.forcast 
         const name  = data.forecast.datetime
        
         function setTime(){
            const time = new Date(name* 1000)
            const month =time.getMonth()
            const day =time.getDay()
            const hour =time.getHours()
            const hoursforclock =hour % 12
            const minutes =time.getMinutes()
            const seconds  =time.getSeconds()
            const ampm = hour >=12 ? 'PM' : 'AM'
        
            hourEl.style.transform =`translate(-50%, -100%) rotate(${scale(hoursforclock,0 , 11 , 0, 360)}deg)`
            minutesEl.style.transform =`translate(-50%, -100%) rotate(${scale(minutes,0 , 59 , 0, 360)}deg)`
            secondsEl.style.transform =`translate(-50%, -100%) rotate(${scale(seconds,0 , 59 , 0, 360)}deg)`
        
            timeEl.innerHTML = `${hoursforclock}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`
            dateEl.innerHTML = `${days[day]}, ${months[month]} <span class="circle">${date}</span>`
        }
        
        const scale = (num, in_min,  in_max, out_min, out_max) => {
            return (num-in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
        }
        
        setTime()
        
        setInterval(setTime,1000)

        

        }
    })
})
})
