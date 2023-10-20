let darkModeBtn = document.getElementById("darkModeBtn")

if(localStorage.getItem("darkMode")){
    

}else{

    console.log("Setear por primera vez")
    
    localStorage.setItem("darkMode", false)
}

if(JSON.parse(localStorage.getItem("darkMode")) == true){
    
    document.documentElement.setAttribute('data-bs-theme', 'dark')
    
    darkModeBtn.innerText = "Light"
}


darkModeBtn.addEventListener("click", () => {



    if(JSON.parse(localStorage.getItem("darkMode")) == false){

        document.documentElement.setAttribute('data-bs-theme', 'dark')

        darkModeBtn.innerText = "Light"
        
        localStorage.setItem("darkMode", true)

    }
    else if(JSON.parse(localStorage.getItem("darkMode")) == true){

        

        document.documentElement.setAttribute('data-bs-theme', 'light')
       
        darkModeBtn.innerText = "Dark"
        
        localStorage.setItem("darkMode", false)
    }
})
