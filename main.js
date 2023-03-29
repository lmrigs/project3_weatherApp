window.addEventListener('load', () => {
    let long;
    let lat;
    let latLong;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            latLong = lat + "," + long;


            console.log(latLong);

            const api = `http://api.weatherapi.com/v1/forecast.json?key=f037a411e06c4d5a99b184923231402&q=${latLong}&days=1&aqi=no&alerts=no`;

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



                    // Insert the weather description from the API into the page. 
                    const desc = document.getElementById("weather-description");
                    desc.innerHTML = description;


                    // Add walking instruction based on description and tempertature conditions.
                    const instruction = document.getElementById("walk-instruction");
                    console.log(description + " this is the description", typeof description, description === "Sunny");


                    if (description === "Light rain shower" && fah > 32 ||
                        description === "Patchy light rain" && fah > 32 ||
                        description === "Light rain" && fah > 32 ||
                        description === "Patchy light drizzle" && fah > 32 ||
                        description === "Light drizzle" && fah > 32 ||
                        description === "Patchy rain possible" && fah > 32 ||
                        description === "Cloudy" && fah > 32 ||
                        description === "Overcast" && fah > 32 ||
                        description === "Mist" && fah > 32) {
                        instruction.innerHTML = "Walk your pup but bring an umbrella!"
                    } else if (description === "Light snow showers" && fah > 32 ||
                        description === "Moderate snow" && fah > 32 ||
                        description === "Patchy moderate snow" && fah > 32 ||
                        description === "Light snow" && fah > 32 ||
                        description === "Patchy light snow" && fah > 32 ||
                        description === "Patchy snow possible" && fah > 32) {
                        instruction.innerHTML = "Walk your pup but bundle up!"
                    } else
                        if (description === "Sunny" && fah < 30) {
                            instruction.innerHTML = "Walk your pup but bundle up!"
                        } else
                            if (description === "Sunny" && fah > 50) {
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



