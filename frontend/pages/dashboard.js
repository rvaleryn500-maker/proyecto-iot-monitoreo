import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import io from "socket.io-client";
import dynamic from "next/dynamic";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const Mapa = dynamic(() => import("../components/Mapa"), {
  ssr: false,
});

export default function Dashboard() {
  const [datos, setDatos] = useState([]);
  const [rol, setRol] = useState("");
  const [username, setUsername] = useState("");

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/");
      return;
    }

    setRol(localStorage.getItem("rol") || "USER");
    setUsername(localStorage.getItem("username") || "user");

    // cargar cache offline
    const guardado = localStorage.getItem("datos");
    if (guardado) {
      setDatos(JSON.parse(guardado));
    }

    const socket = io("http://localhost:3001");

    socket.on("nuevoDato", (data) => {
      setDatos((prev) => {
        const nuevos = [data, ...prev.slice(0, 9)];

        localStorage.setItem(
          "datos",
          JSON.stringify(nuevos)
        );

        return nuevos;
      });
    });

    return () => socket.disconnect();
  }, []);

  function cerrarSesion() {
    localStorage.clear();
    router.push("/");
  }

  function ocultarId(id) {
    if (rol === "ADMIN") return id;

    return id.slice(0, 4) + "****";
  }

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
          marginBottom: "30px",
        }}
      >
        <h1>🚗 Simon Movilidad</h1>

        <div>
          <span
            style={{
              marginRight: "15px",
              background: "#1e293b",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            {username} ({rol})
          </span>

          <button
            onClick={cerrarSesion}
            style={{
              background: "#ef4444",
              color: "white",
              border: "none",
              padding: "10px 14px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            Salir
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <Card titulo="Total Eventos" valor={datos.length} />
        <Card titulo="Vehículos"
          valor={
            new Set(
              datos.map((d) => d.dispositivo)
            ).size
          }
        />
        <Card
          titulo="Alertas"
          valor={rol === "ADMIN" ? alertas : "--"}
          rojo
        />
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
        <h2>📍 Ubicación Tiempo Real</h2>
        <Mapa datos={datos} />
      </div>

        {/* GRAFICO */}
    <div
      style={{
        background: "#1e293b",
        padding: "20px",
        borderRadius: "14px",
        marginBottom: "30px",
      }}
    >
      <h2 style={{ marginBottom: "15px" }}>
        📈 Histórico Combustible
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={[...datos].reverse()}>
          <XAxis dataKey="dispositivo" />
          <YAxis />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="combustible"
            stroke="#22c55e"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>

      {/* TABLA */}
      <div
        style={{
          background: "#1e293b",
          padding: "20px",
          borderRadius: "14px",
        }}
      >
        <h2>📊 Últimos Eventos</h2>

        <table style={{ width: "100%" }}>
          <thead>
            <tr style={{ color: "#94a3b8" }}>
              <th align="left">Vehículo</th>
              <th align="left">Combustible</th>
              <th align="left">Temp</th>
              <th align="left">Estado</th>
            </tr>
          </thead>

          <tbody>
            {datos.map((d, i) => (
              <tr key={i}>
                <td>{ocultarId(d.dispositivo)}</td>

                <td>
                  {Number(
                    d.combustible || 0
                  ).toFixed(2)}
                  %
                </td>

                <td>
                  {Number(
                    d.temperatura || 0
                  ).toFixed(1)}
                  °C
                </td>

                <td>
                  {rol === "ADMIN" ? (
                    d.alerta ? (
                      <span style={{ color: "red" }}>
                        ⚠ ALERTA
                      </span>
                    ) : (
                      "OK"
                    )
                  ) : (
                    "Visible Admin"
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

function Card({ titulo, valor, rojo }) {
  return (
    <div
      style={{
        background: "#1e293b",
        padding: "20px",
        borderRadius: "14px",
      }}
    >
      <h3>{titulo}</h3>
      <h2 style={{ color: rojo ? "#ef4444" : "white" }}>
        {valor}
      </h2>
    </div>
  );
}