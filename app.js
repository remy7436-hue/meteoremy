async function loadWeatherData() {
    try {
        // On va chercher le fichier realtime.txt brut depuis GitHub (chemin relatif)
        const response = await fetch('wxnow.txt?' + new Date().getTime());
        if (!response.ok) throw new Error("Impossible de charger le fichier realtime.txt");

        const text = await response.text();
        const data = text.split(',');

        if (data.length > 10) {
            // Cumulus MX realtime.txt mapping basique :
            const time = data[1];       // Heure
            const temp = data[3];       // Température
            const hum = data[4];        // Humidité
            const pressure = data[5];   // Pression
            const windSpeed = data[6];  // Vent moyen
            const windGust = data[7];   // Rafales
            const dewPoint = data[13];  // Point de rosée

            // Injection dans les éléments HTML
            document.getElementById('update-time').innerText = `Dernière synchro : ${time}`;
            document.getElementById('temp-val').innerText = temp;
            document.getElementById('hum-val').innerText = hum;
            document.getElementById('pressure-val').innerText = pressure;
            document.getElementById('wind-val').innerText = windSpeed;
            document.getElementById('gust-val').innerText = `Rafales : ${windGust} km/h`;
            document.getElementById('dew-val').innerText = `Point de rosée : ${dewPoint} °C`;

            // Appel de la fonction de prévision locale (qu'on va personnaliser ensemble)
            calculateLocalForecast(parseFloat(pressure), parseFloat(temp), parseFloat(hum), parseFloat(windSpeed));
        }
    } catch (error) {
        console.error("Erreur lors de la lecture des données météo :", error);
    }
}

// Fonction placeholder pour tes futures formules de prévision
function calculateLocalForecast(pressure, temp, hum, wind) {
    let forecastText = "Conditions stables sur les Hautes-Savoies.";
    
    // Exemple d'une règle simple basée sur la pression ou l'humidité
    if (pressure < 1010) {
        forecastText = "Pression en baisse : risque de dégradation ou d'intempéries sur le relief.";
    } else if (pressure > 1020) {
        forecastText = "Conditions anticycloniques, temps calme et dégagé attendu sur le secteur.";
    }

    document.getElementById('local-forecast').innerText = forecastText;
}

// Charger les données au démarrage, puis toutes les 60 secondes
loadWeatherData();
setInterval(loadWeatherData, 60000);