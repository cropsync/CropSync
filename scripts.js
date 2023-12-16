document.addEventListener("DOMContentLoaded", function() {
    var categoryDropdown = document.getElementById("category");
    var cropDropdown = document.getElementById("crop");
    var enterButton = document.getElementById("enterButton");
    var startDate = document.getElementById("calculateButton");

    window.addEventListener('scroll', function() {
        var navbar = document.getElementById('nav');
        var scrollThreshold = 100; // Change this value to set the scroll threshold
      
        if (window.scrollY >= scrollThreshold) {
          navbar.classList.add('nav-black');
        } else {
          navbar.classList.remove('nav-black');
        }
      });
    
var selectedCrop = ("Wheat","Rice","Sweet Corn","Barley");

    categoryDropdown.addEventListener("change", function() {
      cropDropdown.innerHTML = ""; // Clear previous options
      
      var selectedCategory = this.value;
      
      if (selectedCategory === "kharif") {
        addCropOption("Rice");
        addCropOption("Sweet Corn");
        addCropOption("Millet");
        addCropOption("Sorghum");
        addCropOption("Pearl Millet");
        addCropOption("Sugarcane");
        addCropOption("Cotton");
        addCropOption("Groundnut");
        addCropOption("Soybeans");
        addCropOption("Turmeric");
        addCropOption("Maize");
        addCropOption("Sunflower");
        addCropOption("Paddy");

      } else if (selectedCategory === "rabi") {
        addCropOption("Wheat");
        addCropOption("Barley");
        addCropOption("Mustard");
        addCropOption("Chickpeas");
        addCropOption("Lentils");
        addCropOption("Peas");
        addCropOption("Rapeseed");
        addCropOption("Fennel");

      }
    });

    enterButton.addEventListener("click", function() {
      var selectedCategory = categoryDropdown.value;
      var selectedCrop = cropDropdown.value;
      var resumeItemElement = document.querySelector(".resume-item");
  
      function displaySteps(stepsFunction) {
          resumeItemElement.innerHTML = stepsFunction();
      }
  
      if (selectedCategory === "rabi") {
          switch (selectedCrop) {
              case "Wheat":
                  displaySteps(getRabiWheatSteps);
                  break;
              case "Barley":
                  displaySteps(getRabiBarleySteps);
                  break;
              case "Mustard":
                  displaySteps(getRabiMustardSteps);
                  break;
              case "Chickpeas":
                  displaySteps(getRabiChickpeasSteps);
                  break;
              case "Lentils":
                  displaySteps(getRabiLentilsSteps);
                  break;
              case "Rapeseed":
                  displaySteps(getRabiRapeseedSteps);
                  break;
              case "Fennel":
                  displaySteps(getRabiFennelSteps);
                  break;
              default:
                  displaySteps(function() {
                      return "No steps available for this crop.";
                  });
          }
      } else if (selectedCategory === "kharif") {
          switch (selectedCrop) {
              case "Rice":
                  displaySteps(getKharifRiceSteps);
                  break;
              case "Sweet Corn":
                  displaySteps(getKharifCornSteps);
                  break;
              case "Millet":
                  displaySteps(getKharifMilletSteps);
                  break;
              case "Sorghum":
                  displaySteps(getKharifSorghumSteps);
                  break;
              case "Pearl Millet":
                  displaySteps(getKharifPearlMilletSteps);
                  break;
              case "Sugarcane":
                  displaySteps(getKharifSugarcaneSteps);
                  break;
              case "Cotton":
                  displaySteps(getKharifCottonSteps);
                  break;
              case "Groundnut":
                  displaySteps(getKharifGroundnutSteps);
                  break;
              case "Soybeans":
                  displaySteps(getKharifSoybeansSteps);
                  break;
              case "Turmeric":
                  displaySteps(getKharifTurmericSteps);
                  break;
              case "Maize":
                  displaySteps(getKharifMaizeSteps);
                  break;
              case "Sunflower":
                  displaySteps(getKharifSunflowerSteps);
                  break;
              case "Paddy":
                  displaySteps(getKharifPaddySteps);
                  break;
              default:
                  displaySteps(function() {
                      return "No steps available for this crop.";
                  });
          }
      }
  });
  

      enterButton.addEventListener("click", function() {
        var selectedCategory = categoryDropdown.value;
        var selectedCrop = cropDropdown.value;
        var startDate = new Date(document.getElementById("startDate").value);
        var endDate;
        var selectedDate = new Date(document.getElementById("startDate").value);
        var startMonth, endMonth;

        var selectedMonth = selectedDate.getMonth();
        var landPreparationDate = new Date(startDate);
        landPreparationDate.setDate(landPreparationDate.getDate() + 46); // Adding 46 days
        var sowingDate = new Date(landPreparationDate);
        sowingDate.setDate(sowingDate.getDate() + 46); // Adding 46 days
        var harvestDate = new Date(sowingDate);
        harvestDate.setDate(harvestDate.getDate() + 46); // Adding 46 days
    
        if (selectedCategory === "kharif" && selectedCrop === "Rice") {
            startMonth = 2; // October
            endMonth = 3; // November
            endDate = new Date(startDate.getFullYear(), 8, 31); // September
        } else if (selectedCategory === "kharif" && selectedCrop === "Sweet Corn") {
            startMonth = 3; // November
            endMonth = 4; // December
            endDate = new Date(startDate.getFullYear(), 10, 31); 
        } else if (selectedCategory === "rabi" && selectedCrop === "Wheat") {
            startMonth = 9; 
            endMonth = 10; 
            endDate = new Date(startDate.getFullYear(), 2, 31); 
        } else if (selectedCategory === "rabi" && selectedCrop === "Barley") {
            startMonth = 9; 
            endMonth = 10; 
            endDate = new Date(startDate.getFullYear(), 3, 31); 
        }
    
        var timeDiff = endDate.getTime() - startDate.getTime();
        var daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
        var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        var currentDate = new Date();

        var daysTillLandPreparation = Math.round(Math.abs((landPreparationDate - currentDate) / oneDay));
        var daysTillSowing = Math.round(Math.abs((sowingDate - currentDate) / oneDay));
        // document.getElementById('landPreparationDate').textContent = landPreparationDate.toLocaleDateString();
        // document.getElementById('sowingDate').textContent = sowingDate.toLocaleDateString();

        if (selectedMonth >= startMonth && selectedMonth <= endMonth) {
            document.getElementById('result').innerHTML = "Days until land preparation:<br> " + daysTillLandPreparation +
            "<br> Sowing Date:<br> " + daysTillSowing + "<br> Days remaining till Harvesting:<br> " + daysRemaining;
        } else {
            document.getElementById('result').textContent = "The selected date is NOT in the Sown period.";
        }
    });
    
    

    function addCropOption(cropName) {
      var option = document.createElement("option");
      option.text = cropName;
      cropDropdown.add(option);
    }

    function getRabiWheatSteps() {
        return `
            <h4>Rabi - Wheat</h4>
            <h5>Step 1: Land Preparation</h5>
            <p><em>Prepare the land well in advance to ensure optimal growth conditions for Rabi wheat. Follow these sub-steps:</em></p>
          <ul>
            <li>
                Clear the land of any existing crops, weeds, and debris. 
            </li>
            <li>
                Plow the field to break up the soil and remove any clods.
            </li>
            <h5>Step 2: Seed selection and sowing</h5>
            <p><em>Select high-quality seeds that are specifically bred for Rabi wheat cultivation. Here's what you should do: </em></p>
          <ul>
            <li>
                Choose certified seeds from reliable sources to ensure good germination and disease resistance.
            </li>
            <li>
                Ensure proper seed depth by sowing the seeds at a depth of about 2 to 3 cm into the soil.
            </li>
          </ul>
            <h5>Step 3: Grain Maturation and Harvest</h5>
            <ul>
            <li>
            The time from heading to maturity can vary, but it generally takes around 3 to 4 weeks.
            </li>
            <li>
            The wheat crop is ready for harvest when the grains have reached the desired maturity and moisture content.
            </li>
        </ul>
            `;
    }
    
    function getRabiBarleySteps() {
        return `
            <h4>Rabi - Barley</h4>
            <h5>Step 1: Land Preparation</h5>
            <p><em><B>Prepare the land well in advance to ensure optimal growth conditions for Rabi Barley. Follow these sub-steps:</b></em></p>
          <ul>
            <li>
                Clear the land of any existing crops, weeds, and debris. 
            </li>
            <li>
                Plow the field to break up the soil and remove any clods.
            </li>
            <h5>Step 2: Seed selection and sowing</h5>
            <p><em><b>Select high-quality seeds that are specifically bred for Rabi wheat cultivation. Here's what you should do:</b> </em></p>
          <ul>
            <li>
                Choose certified seeds from reliable sources to ensure good germination and disease resistance.
            </li>
            <li>
                Ensure proper seed depth by sowing the seeds at a depth of about 2 to 3 cm into the soil.
            </li>
          </ul>
            <h5>Step 3: Grain Maturation and Harvest</h5>
            <p><em><b>The time duration for barley growth and the specific time of the year to grow barley can vary depending on various factors</b></em></p>
            <ul>
            <li>
            The time from heading to maturity can vary, but it generally takes around 3 to 4 weeks.
            </li>
            <li>
            The wheat crop is ready for harvest when the grains have reached the desired maturity and moisture content.
            </li>
        </ul>
        `;
    }

    function getKharifRiceSteps() {
        return `
            <h4>Kharif - Rice</h4>
            <h5>Step 1: Land Preparation</h5>
            <p><em><b>Prepare the land well in advance to ensure optimal growth conditions for Kharif rice. Follow these sub-steps:</b></em></p>
          <ul>
            <li>
                Clear the land of any existing crops, weeds, and debris. 
            </li>
            <li>
                Plow the field to break up the soil and remove any clods.
            </li>
            <h5>Step 2: Seed selection and sowing</h5>
            <p><em><b>Select high-quality seeds that are specifically bred for Rabi wheat cultivation. Here's what you should do:</b> </em></p>
          <ul>
            <li>
                Choose certified seeds from reliable sources to ensure good germination and disease resistance.
            </li>
            <li>
                Ensure proper seed depth by sowing the seeds at a depth of about 2 to 3 cm into the soil.
            </li>
          </ul>
            <h5>Step 3: Grain Maturation and Harvest</h5>
            <p><em><b>Rice is typically categorized into two main types: "upland" or "dryland" rice and "paddy" or "wetland" rice:</b></em></p>
            <ul>
            <li>
            The time from heading to maturity can vary, but it generally takes around 3 to 4 weeks.
            </li>
            <li>
            The wheat crop is ready for harvest when the grains have reached the desired maturity and moisture content.
            </li>
        </ul>
            `;
    }

    function getKharifCornSteps() {
        return `
            <h4>Kharif - Sweet Corn</h4>
            <h5>Step 1: Land Preparation</h5>
            <p><em<b>Prepare the land well in advance to ensure optimal growth conditions for Kharif Sweet Corn. Follow these sub-steps: </b></em></p>
          <ul>
            <li>
                Clear the land of any existing crops, weeds, and debris. 
            </li>
            <li>
                Plow the field to break up the soil and remove any clods.
            </li>
            <h5>Step 2: Seed selection and sowing</h5>
            <p><em><b>Select high-quality seeds that are specifically bred for Rabi wheat cultivation. Here's what you should do: </b></em></p>
          <ul>
            <li>
                Choose certified seeds from reliable sources to ensure good germination and disease resistance.
            </li>
            <li>
                Ensure proper seed depth by sowing the seeds at a depth of about 2 to 3 cm into the soil.
            </li>
          </ul>
            <h5>Step 3: Grain Maturation and Harvest</h5>
            <p><em><b>Sweet corn is a warm-season crop that thrives in areas with long, sunny days and moderate temperatures:</b></em></p>
            <ul>
            <li>
            The time from heading to maturity can vary, but it generally takes around 3 to 4 weeks.
            </li>
            <li>
            The wheat crop is ready for harvest when the grains have reached the desired maturity and moisture content.
            </li>
        </ul>
            `;
    }

    function displayMessage(message) {
        var messageBox = document.createElement("div");
        messageBox.classList.add("message");
        messageBox.textContent = message;
    
        var container = document.querySelector(".container");
        container.appendChild(messageBox);
        
        setTimeout(function() {
          container.removeChild(messageBox);
        }, 10000);
    }
  });


  // Replace 'API_KEY' with OpenWeatherMap API key
const apiKey = 'API_KEY';
const weatherWrapper = document.getElementById('weather_wrapper');

function fetchWeather(location) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const temperature = Math.round(data.main.temp - 273.15); // Convert temperature to Celsius
            const rain = data.rain ? data.rain['1h'] : 0; // Rain in the last hour (if available)
            const windSpeed = data.wind.speed;

            // Update HTML with fetched data
            weatherWrapper.querySelector('.temp').textContent = temperature + '°C';
            weatherWrapper.querySelector('.location').textContent = data.name;
            weatherWrapper.querySelector('.conditions').innerHTML = '&#xf00d;'; // You can use appropriate weather icons here
            weatherWrapper.querySelector('.rain').textContent = `Rain: ${rain} mm`;
            weatherWrapper.querySelector('.wind').textContent = `Wind: ${windSpeed} km/h`;
        })
        .catch(error => {
            console.log('Error fetching weather:', error);
        });
}

//  call fetchWeather with the user's location
fetchWeather('Himalayas'); // Replace 'Himalayas' with the user's location or use geolocation to get it
