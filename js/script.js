// Coordenadas WGS84 precisas obtenidas del flujo de trabajo de QGIS
const HONOLULO_LAT = -9.43265;
const HONOLULO_LON = -75.98630;
const ZOOM_LEVEL = 15; // Nivel de zoom alto para el detalle.

// 1. Inicializar el mapa
const map = L.map('map').setView([HONOLULO_LAT, HONOLULO_LON], ZOOM_LEVEL);

// 2. Definir Capa Satelital de Alta Resolución (para "buena resolución")
// Se utiliza ESRI World Imagery para ofrecer una vista satelital detallada.
const esriImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    maxZoom: 18 
}).addTo(map);

// 3. Capa de Calles y Etiquetas (para contexto)
const openStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

// 4. Crear un control de capas para que el usuario pueda cambiar la vista
const baseLayers = {
    "Imágenes Satelitales (Alta Resolución)": esriImagery,
    "OpenStreetMap (Calles)": openStreetMap
};

L.control.layers(baseLayers).addTo(map);

// 5. Añadir el marcador en la ubicación precisa
const marker = L.marker([HONOLULO_LAT, HONOLULO_LON]).addTo(map);

// 6. DETALLE: Crear el contenido HTML con los datos detallados (nombre, ubicación, coordenadas)
const popupContent = `
    <div style="text-align: center; font-family: Arial, sans-serif;">
        <h3 style="color: #004d40; margin-bottom: 5px;">CATARATA HONOLULO</h3>
        <hr style="border-color: #004d40;">
        <p style="margin: 3px 0;"><strong>Lugar:</strong> Centro Poblado de Honolulo</p>
        <p style="margin: 3px 0;"><strong>Distrito:</strong> Mariano Dámaso Beraún</p>
        <p style="margin: 3px 0;"><strong>Provincia:</strong> Leoncio Prado</p>
        <p style="margin: 3px 0;"><strong>Región:</strong> Huánuco, Perú</p>
        <br>
        <p style="font-size: 0.85em; color: #555;">
            Lat: ${HONOLULO_LAT}<br>
            Lon: ${HONOLULO_LON}
        </p>
    </div>
`;

// 7. Vincular el contenido detallado al marcador y abrirlo por defecto
marker.bindPopup(popupContent).openPopup();
