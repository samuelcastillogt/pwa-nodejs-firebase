const express = require('express')
const path = require('path')
let ejs = require('ejs');
const fs = require('fs')
const https = require('https')
const firebase = require("firebase")
const bodyParser = require("body-parser")

const firebaseConfig = {
  apiKey: "AIzaSyBO80jhQMpYSgErdpBOt0cW36AEYinDSLw",
  authDomain: "prueba-7cc64.firebaseapp.com",
  databaseURL: "https://prueba-7cc64.firebaseio.com",
  projectId: "prueba-7cc64",
  storageBucket: "prueba-7cc64.appspot.com",
  messagingSenderId: "581692029953",
  appId: "1:581692029953:web:f5e383637746bf0da79400",
  measurementId: "G-M1TWRV4DSM"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
const httpPort = 80
const httpsPort = 443
// const key = fs.readFileSync('./certs/localhost.key');
// const cert = fs.readFileSync('./certs/localhost.crt');

const app = express()
// const server = https.createServer({key: key, cert: cert }, app);

// app.use((req, res, next) => {
//   if (!req.secure) {
//     return res.redirect('https://' + req.headers.host + req.url);
//   }
//   next();
// })
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({extended:true}));


app.get('/', function(req, res) {
  res.render("index.ejs")
})
app.get('/crear', function(req, res) {
  res.render("app-crear")
})
app.get('/administrar', async(req, res)=> {
  const peticion =  await firebase.firestore().collection("propiedades").where("publicada", "==", true).get()
  const { docs } = peticion
  const propiedades = docs.map(propiedad =>({ propiedad: propiedad.data()}))
  res.render("propiedades", { propiedades })
})
app.get('/leads', async(req, res)=> {
  const peticion =  await firebase.firestore().collection("leads").get()
  const { docs } = peticion
  const leads = docs.map(lead =>({ lead: lead.data()}))
  res.render("leads", { leads })
})
app.listen(httpPort, function () {
  console.log(`Listening on port ${httpPort}!`)
})
app.post("/agregar", (req, res)=>{
  
  const db =firebase.firestore()
  const img =req.body.imagen
  const prep = img.substring(img.legth -1)
  const imagen = prep.split(",")
  const datos ={
    nombre: req.body.nombre,
    precio: req.body.precio,
    descripcion: req.body.descripcion,
    imagen: imagen,
    destacada: Boolean(req.body.destacada),
    publicada: true,
    id: req.body.nombre,
    autor: req.body.autor,
    visitas: 0
  }
  db.collection("propiedades").doc(req.body.nombre).set(datos).then(()=> res.redirect("/"))



})
app.get("/delete/:id", async(req, res)=>{
  const { id } = req.params
  const db = firebase.firestore()
   const peticion =   await db.collection("propiedades").doc(id).update({
     publicada: false
   })
   res.redirect("/administrar")


})
app.get("/editar/:id", async(req, res)=>{
  const { id } = req.params
  const db = firebase.firestore()
   const peticion =   await db.collection("propiedades").doc(id).get()
   res.render("app-editar", peticion.data())

})
app.post("/update", (req, res)=>{

  const db =firebase.firestore()
  db.collection("propiedades").doc(req.body.nombre).update({
    nombre: req.body.nombre,
    precio: req.body.precio,
    descripcion: req.body.descripcion,
    destacada: req.body.destacada

  }).then(()=>{
    res.redirect("/administrar")
  })


})
app.post("/login", (req, res)=>{
  var email = req.body.correo
  var password = req.body.password

  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    res.redirect("/app/dash")
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(error)
  });
})
// server.listen(httpsPort, function () {
//   console.log(`Listening on port ${httpsPort}!`)
// })