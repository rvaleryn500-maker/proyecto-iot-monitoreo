import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function ingresar(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:3001/login",
        { username }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", username);

      router.push("/dashboard");

    } catch (error) {
      alert("Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
      }}
    >
      <form
        onSubmit={ingresar}
        style={{
          background: "#1e293b",
          padding: "40px",
          borderRadius: "16px",
          width: "350px",
          color: "white",
        }}
      >
        <h1 style={{ marginBottom: "20px" }}>
          🚗 Simon Movilidad
        </h1>

        <p style={{ marginBottom: "20px", color: "#94a3b8" }}>
          Inicia sesión
        </p>

        <input
          placeholder="Usuario"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "10px",
            border: "none",
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          {loading ? "Entrando..." : "Ingresar"}
        </button>

        <p
          style={{
            marginTop: "15px",
            fontSize: "14px",
            color: "#94a3b8",
          }}
        >
          Usa: admin o user
        </p>
      </form>
    </div>
  );
}