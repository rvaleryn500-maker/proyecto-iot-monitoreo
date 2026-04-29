const axios = require("axios");

const URL = "http://localhost:3001/sensores";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInJvbCI6IkFETUlOIiwiaWF0IjoxNzc3NDI0MTY4LCJleHAiOjE3Nzc0Mjc3Njh9.L29lbv-hFWEn5KxPDp1BgQyY-m6uYtVFFN2EWrpw1Xg";

function generarDato() {
  return {
    dispositivo: "DEV-" + Math.floor(Math.random() * 100),
    lat: 4.6 + Math.random() * 0.1,
    lng: -74.1 + Math.random() * 0.1,
    combustible: Math.random() * 10,
    temperatura: 20 + Math.random() * 10,
    velocidad: Math.random() * 80,
  };
}

console.log("🚀 Simulador iniciado");

async function enviarDato() {
  try {
    const dato = generarDato();

    console.log("📤 Enviando...");

    const res = await axios.post(URL, dato, {
      headers: {
        authorization: TOKEN,
      },
    });

    console.log(
      "✅ Enviado:",
      dato.dispositivo,
      "Alerta:",
      res.data.alerta || "OK"
    );

  } catch (error) {
    console.error(
      "❌ Error:",
      error.response?.data || error.message
    );
  }
}

/* Ejecuta una vez inmediata */
enviarDato();

/* Luego cada 3 segundos */
setInterval(enviarDato, 3000);