const weatherform = document.querySelector('form')
const search = document.querySelector('input')

 const message1=document.querySelector('#message1')

 const message2 = document.querySelector('#message2')
// message1.textContent = 'from javascript'

const message4 = document.querySelector('#message4')
const message5 = document.querySelector('#message5')


weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
     const location = search.value
   
   fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
           message1.textContent=data.error
           message2.textContent = ''
            message4.textContent = ''
           message5.textContent = ''
           document.getElementById('message3').innerHTML = "<p></p>"
        }
        else{
        
         message1.textContent=data.location
         message2.textContent = 'It is curently ' + data.forcast.description 
         message4.textContent = 'Temperature : ' + data.forcast.temperature + '℃'
         message5.textContent = 'Feels Like : ' + data.forcast.feelslike + '℃'
         document.getElementById('message3').innerHTML = "<img src = '" + data.forcast.icon + "'alt = 'infinix' >"
         
        

        }
    })
})
})
