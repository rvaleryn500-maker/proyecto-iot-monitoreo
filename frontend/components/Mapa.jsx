import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* ICONOS LEAFLET */
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function Mapa({ datos }) {
  // dejar solo último dato por dispositivo
  const unicos = {};

  datos.forEach((d) => {
    unicos[d.dispositivo] = d;
  });

  const lista = Object.values(unicos);

  return (
    <MapContainer
      center={[4.6, -74.1]}
      zoom={12}
      style={{
        height: "400px",
        width: "100%",
        borderRadius: "12px",
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {lista.map((d) => (
        <Marker
          key={d.dispositivo}
          position={[
            Number(d.lat || 0),
            Number(d.lng || 0),
          ]}
        >
          <Popup>
            <strong>{d.dispositivo}</strong>
            <br />
            ⛽ Combustible:{" "}
            {Number(d.combustible || 0).toFixed(2)}%
            <br />
            🌡️ Temp:{" "}
            {Number(d.temperatura || 0).toFixed(1)}°C
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}