// Coordenadas WGS84 precisas obtenidas de la geolocalización (QGIS workflow)
const HONOLULO_LAT = -9.43265;
const HONOLULO_LON = -75.98630;
const ZOOM_LEVEL = 15; // Nivel de zoom alto para ver el detalle.

// 1. Inicializar el mapa
const map = L.map('map').setView([HONOLULO_LAT, HONOLULO_LON], ZOOM_LEVEL);

// 2. Definir Capa Satelital de Alta Resolución (para "buena resolución")
// Usamos la capa de World Imagery de ESRI, que proporciona imágenes satelitales de alta calidad
const esriImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    maxZoom: 18 
}).addTo(map);

// 3. Añadir una capa de calles o etiquetas (opcional, para contexto)
const openStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

// 4. Crear un control de capas para que el usuario pueda cambiar entre satélite y calles
const baseLayers = {
    "Imágenes Satelitales (Alta Resolución)": esriImagery,
    "OpenStreetMap (Calles)": openStreetMap
};

L.control.layers(baseLayers).addTo(map);

// 5. Añadir un marcador de la catarata
const marker = L.marker([HONOLULO_LAT, HONOLULO_LON]).addTo(map);

// 6. Añadir un mensaje al marcador
marker.bindPopup("<b>Catarata Honolulo</b><br>¡El punto exacto!").openPopup();