const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const forcast = require('./utils/forcast')
const geocode = require('./utils/geocode')
// const datentime = require('./utils/datentime')


const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewpaths = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewpaths)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))



app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Manmeet Singh'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Manmeet Singh'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        name: 'Manmeet Singh',
        para: 'We can help with any of your problem'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
             error:'You must provide search '
         })
      }
      geocode(req.query.address,(error, {latitude,longitude,location}={})=>{
      
        if(error){
            return res.send({error})
        }
        
    
    
         forcast(latitude,longitude,(error,{realforcast,datetime})=>{

            

              if(error){
                  return res.send({error})
              }
             res.send({
                 forcast:realforcast,
                 location,
                 datetime,
                 address:req.query.address
             })

             
        })


      })

      
    
})

app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'you must privide search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res)=>{
    res.render('error', {
        title: '404',
        name: 'Manmeet Singh',
        errorMessage: 'Help page not available'
        
    })
})

app.get('*',(req,res) => {
    res.render('error', {
        title: '404',
        name: 'Manmeet Singh',
        errorMessage: 'Page not find'
        
    })
})



app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
