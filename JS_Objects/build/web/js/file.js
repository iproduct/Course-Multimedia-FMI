function handleFile(event) {
   
    var updateProgress = function(e) {}
    
    var showFileData = function(e){
        var fileString = e.target.result;
        document.getElementById('result').innerHTML = fileString;
    }

    var showError = function (e) {
        console.log("Error: " + e.target.error.name);
        if(e.target.error.name == "NOT_READABLE_ERR") {
    }
    }
    var file = document.getElementById('fileChooser').files[0];
    if(file){
        var reader = new FileReader();
        reader.onprogress = updateProgress;
        reader.onload = showFileData;
        reader.onerror = showError;
        reader.readAsText(file, "UTF-8");
    }
}

function handleImage(event) {
    var progress = document.getElementById("p");
    var prog = document.getElementById("pr");
    //alert(progress);
    var updateProgress = function(progressEvent) {
        //alert("Progress");
        //if(progressEvent.lengthComputable) {
    prog.innerHTML = progressEvent.loaded + " / " + progressEvent.total;
        //} 
    }
    
    var showFileData = function(e){
        var dataURL = e.target.result;
        var image = new Image();
        image.src = dataURL; 
        image.onload = function(){
            var canvas = document.getElementById('canvas');
            var ctx = canvas.getContext('2d');  
            ctx.drawImage(image,0,0,500,300);
            //progress.value = e.loaded;
        }
        document.getElementById('image_data').innerHTML = 
        "MIME Type: " + file.type + "<br />"
        +"Size: " + file.size + "<br />";
        progress.value = 100;
    }

    var showError = function (e) {
        console.log("Error: " + e.target.error.name);
        if(e.target.error.name == "NOT_READABLE_ERR") {
    }
    }
    var file = document.getElementById('imageChooser').files[0];
    if(file){
        var reader = new FileReader();
        reader.onprogress = updateProgress;
        reader.onloadend = updateProgress;
        reader.onload = showFileData;
        reader.onerror = showError;
        reader.readAsDataURL(file);
    }
    
    var formData = new FormData();  
      
    //formData.append("username", "Groucho");  
    formData.append("tags", "favourite image");  
    formData.append("afile", file);  
      
    var oXHR = new XMLHttpRequest();  
    oXHR.open("POST", "http://localhost:8080/JS_Objects/ImageReceiver");  
     oXHR.onprogress = function(pe) {
    if(pe.lengthComputable) {
        //progress.innerHTML = pe.loaded + " / " + pe.total;
      progress.max = pe.total
      progress.value = pe.loaded
    }
  }
  oXHR.onloadend = function(pe) {
    progress.value = progressBar.value;
    //progress.innerHTML = pe.loaded;
  }
  oXHR.send(formData); 
}



