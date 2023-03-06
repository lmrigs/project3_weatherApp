window.addEventListener('load', () => {
    let long;
    let lat;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            latLong = lat + "," + long;


            console.log(latLong);

            const api = `http://api.weatherapi.com/v1/forecast.json?key=f037a411e06c4d5a99b184923231402&q=${latLong}&days=1&aqi=no&alerts=no`;
            console.log(api);

            fetch(api)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    const city = data.location.name;
                    const state = data.location.region;
                    const cityState = `${city}, ${state}`;
                    const icon = data.current.condition.icon;
                    const fah = data.current.temp_f;
                    const celsius = (fah - 32) * (5 / 9);
                    const description = data.current.condition.text;

                    console.log(description);
                    const location = document.getElementById("location-timezone");
                    location.innerHTML = cityState;

                    const iconSpace = document.getElementById("weather-image");
                    iconSpace.innerHTML = `<img src="${icon}">`

                    const temperature = document.getElementById("degree-num");
                    temperature.innerHTML = fah;

                    // switch between fahrenheit and celsius
                    const unit = document.getElementById("unit");
                    unit.addEventListener("click", function () {
                        const text = unit.textContent;
                        if (text.includes("F")) {
                            this.textContent = text.replace("F", "C");
                            temperature.innerHTML = Math.ceil(celsius);
                        } else if (text.includes("C")) {
                            this.textContent = text.replace("C", "F");
                            temperature.innerHTML = fah;
                        }
                    });


                    // Logic for showing condition suggestions for dog walking
                    //Insert 'description' from API into desc. Add line break and add instruction. 
                    const desc = document.getElementById("weather-description");
                    desc.innerHTML = description;

                    const instruction = document.getElementById("walk-instruction");

                    if (desc === "Light rain shower" ||
                        desc === "Patchy light rain" ||
                        desc === "Light rain" ||
                        desc === "Patchy light drizzle" ||
                        desc === "Light drizzle" ||
                        desc === "Patchy rain possible" ||
                        desc === "Cloudy" ||
                        desc === "Overcast" ||
                        desc === "Mist" && celsius > 0 || fah > 32) {
                        instruction.innerHTML = "Walk your pup but bring an umbrella!"
                    } else if (desc === "Light snow showers" ||
                        desc === "Moderate snow" ||
                        desc === "Patchy moderate snow" ||
                        desc === "Light snow" ||
                        desc === "Patchy light snow" ||
                        desc === "Patchy snow possible" && celsius > 0 || fah > 32) {
                        instruction.innerHTML = "Walk your pup but bundle up!"
                    } else if (desc === "sunny" && celsius > 0 || fah > 32) {
                        instruction.innerHTML = "Walk your pup but bundle up!"
                    } else if (desc === "sunny" && celsius > 10 || fah > 50) {
                        instruction.innerHTML = "Get outside and walk your pup!"
                    }
                    else {
                        instruction.innerHTML = "Stay inside and cuddle with your pup!"
                    };


                });


        }

        )
    };
});



