import { useEffect, useState } from "react";
import io from "socket.io-client";
import dynamic from "next/dynamic";

const Mapa = dynamic(() => import("../components/Mapa"), {
  ssr: false,
});

export default function Dashboard() {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const socket = io("http://localhost:3001");

    socket.on("nuevoDato", (data) => {
      setDatos((prev) => [data, ...prev.slice(0, 9)]);
    });

    return () => socket.disconnect();
  }, []);

  const alertas = datos.filter((d) => d.alerta).length;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "30px",
        fontFamily: "Arial",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h1 style={{ fontSize: "32px" }}>
          🚗 Simon Movilidad 
        </h1>

        <div
          style={{
            background: "#1e293b",
            padding: "12px 20px",
            borderRadius: "12px",
          }}
        >
          Admin Online 🟢
        </div>
      </div>

      {/* KPIs */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "14px",
          }}
        >
          <h3>Total Eventos</h3>
          <h2>{datos.length}</h2>
        </div>

        <div
          style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "14px",
          }}
        >
          <h3>Alertas Activas</h3>
          <h2 style={{ color: "#ef4444" }}>{alertas}</h2>
        </div>

        <div
          style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "14px",
          }}
        >
          <h3>Vehículos</h3>
          <h2>
            {new Set(datos.map((d) => d.dispositivo)).size}
          </h2>
        </div>
      </div>

      {/* MAPA */}
      <div
        style={{
          background: "#1e293b",
          padding: "20px",
          borderRadius: "14px",
          marginBottom: "30px",
        }}
      >
        <h2 style={{ marginBottom: "15px" }}>
          📍 Ubicación en Tiempo Real
        </h2>

        <Mapa datos={datos} />
      </div>

      {/* TABLA */}
      <div
        style={{
          background: "#1e293b",
          padding: "20px",
          borderRadius: "14px",
        }}
      >
        <h2 style={{ marginBottom: "15px" }}>
          📊 Últimos Eventos
        </h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr style={{ textAlign: "left", color: "#94a3b8" }}>
              <th>Vehículo</th>
              <th>Combustible</th>
              <th>Temp</th>
              <th>Estado</th>
            </tr>
          </thead>

          <tbody>
            {datos.map((d, i) => (
              <tr
                key={i}
                style={{
                  borderTop: "1px solid #334155",
                }}
              >
                <td style={{ padding: "12px 0" }}>
                  {d.dispositivo}
                </td>

                <td>
                  {Number(d.combustible || 0).toFixed(2)}%
                </td>

                <td>
                  {Number(d.temperatura || 0).toFixed(1)}°C
                </td>

                <td>
                  {d.alerta ? (
                    <span style={{ color: "#ef4444" }}>
                      ⚠ ALERTA
                    </span>
                  ) : (
                    <span style={{ color: "#22c55e" }}>
                      OK
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}