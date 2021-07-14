
var textarea = document.getElementById('cuerpo');
sceditor.create(textarea, {
	format: 'xhtml',
	style: 'https://cdn.jsdelivr.net/npm/sceditor@3/minified/themes/content/default.min.css'
});
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
    var storage = firebase.storage();
    const db= firebase.firestore()
    // document.getElementById("guardar").addEventListener("click", ()=>{
    //    console.log(document.getElementsByTagName("textarea").value) 
    //     // const nombre = document.getElementById("nombre").value
    //     // const descripcion = document.getElementsByName("descripcion").value
    //     // const destacada = document.getElementById("destacada").value
    //     // const precio = document.getElementById("precio").value
    //     // const imagenes = document.getElementById("img").value
    //     // const id = document.getElementById("id").value
    //     // const telefono = document.getElementById("telefono").value
    //     // var objeto = {
    //     //     nombre: nombre,
    //     //     descripcion, descripcion,
    //     //     destacada, destacada,
    //     //     precio: precio,
    //     //     imagen: imagenes,
    //     //     id: id,
    //     //     telefono: telefono,
    //     //     publicada: true,
                
    //     // }
    //     // db.collection("propiedades").doc(id).set(objeto).then(()=>{
    //     //     window.location.href= "/"
    //     // }).catch(()=>{
    //     //     console.log("error")
    //     // })
    // })
    document.getElementById("menu-movil").addEventListener("click", ()=>{
        document.getElementById("sidebar").classList.add("sidebar-movil")
        document.getElementById("main").classList.add("hidden")
    })
    const fileButton= document.getElementById('imagen')
   
    fileButton.addEventListener('change', function(e){ 
        //Get files
        for (var i = 0; i < e.target.files.length; i++) {
            var imageFile = e.target.files[i];
    
            uploadImageAsPromise(imageFile);
            
        }
    });
    function uploadImageAsPromise (imageFile) {
        return new Promise(function (resolve, reject) {
            var storageRef = firebase.storage().ref(imageFile.name);
    
            //Upload file
            var task = storageRef.put(imageFile);
    
            //Update progress bar
            task.on('state_changed', ()=>{
                console.log("ya esta subuendo")
                document.getElementById("carga").innerHTML="Ya ha comenzado la carga"
            },
                // function progress(snapshot){
                //     var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
                //     uploader.value = percentage;
                // },
                function error(err){
    
                },
                function(){
                task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                    console.log('File available at', downloadURL);
                    document.getElementById("img").value += downloadURL+ ","
                    document.getElementById("carga").innerHTML =" "
                    document.getElementById("carga").innerHTML="Ya termino la carga"
                  })
                }
            );
        });
    }
    