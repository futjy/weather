 let childs;
 let countryCall = function (city) {
     let url = "https://www.prevision-meteo.ch/services/json/" + city;


     fetch(url)
         .then((response) =>
             response.json().then((recover) => {
                 console.log(recover);
                 let city = document.querySelector("#city").innerHTML = recover.city_info.name;
                 let temp = document.querySelector("#temp").innerHTML = recover.current_condition.tmp + "°";
                 let wind = document.querySelector("#wind").innerHTML = recover.current_condition.wnd_spd + "Km/h";
                 let picture = document.querySelector("#picture").innerHTML = recover.current_condition.condition ;

                 // utilisation d'une 1er methode pour la boucle heure par heure sous forme d'object  
                 let hourByHour = Object.entries(recover.fcst_day_0.hourly_data);
                 let html = "";
                 for (i = 0; i < hourByHour.length; i++) {
                     const [hour, data, ] = hourByHour[i];
                     html += '<card class="littlecards" data-image="assets/images/sea.jpg">'+'<h1 slot="header">'+'<img src="'+ data.ICON +'"></img>'+ hour + " " + data.CONDITION + " " + data.TMP2m + "°"+'</h1>' + '</card>';
                 };
                document.querySelector("#hour").innerHTML = html;
                const app = new Vue({
                    el: '#hour'
                  });
                 //    fin de la 1er methode


               
                   

              //  2eme methode de la boucle meteo mais pour recupérer des information sur 4 jours 
                 allDays = document.querySelector("#days");
                 allDays.innerHTML = "";
                  for (i = 1; i < 5; i++) {
                      const data = "fcst_day_" + [i];
                      allDays.innerHTML += '<card data-image="image/city.JPG">' + '<h1 slot="header">' + '<img src="'+ recover[data].icon +'"></img>' + '</h1>' + '<p slot="content">' + recover[data].day_long +" " + recover[data].condition + " " + recover[data].tmax + "°" +'</p>' + '</card>';
                   
                 };
                 
                
                
               
                 //  fin de la boucle meteo sur 4 jours


          
            
            
          
    

             })
         );
 };




 //    recherche de la ville dans input de la navbar 
 document.querySelector("form").addEventListener("submit", function (e) {
     e.preventDefault();

     let ville = document.querySelector("#country").value;
     countryCall(ville);
 })

 countryCall("toulon"); // ville de depart pré-rempli
 //  fin de recherche de la ville




 
