import { supabase } from "../lib/supabase";
import Countdown from "./components/Countdown";
import RealtimeTeams from "./components/RealtimeTeams";

const { data, error } = await supabase
  .from("team")
  .select("*");

console.log("DATA:", data);
console.log("ERROR:", error);

export default async function Home() {

  const { data } = await supabase
    .from("team")
    .select("*");

const teams = [
  { id: 1, name: "พิง", score: 0 },
  { id: 2, name: "มาชิบพี่", score: 0 },
  { id: 3, name: "พักใจ", score: 0 },
  { id: 4, name: "ข้างกัน", score: 0 },
  { id: 5, name: "(พัก)ข้างเธอ", score: 0 },
];

  return (

    <main
      style={{
        minHeight: "100vh",
        background: "#eef0f3",
        overflowX: "hidden",
        fontFamily: "Arial, sans-serif",
      }}
    >

      {/* HEADER */}
      <div
        style={{
          width: "100%",
          background:
            "linear-gradient(90deg,#020817,#071633,#020817)",

          padding: "16px 28px",

          boxSizing: "border-box",

          display: "grid",

          gridTemplateColumns: "1fr auto 1fr",

          alignItems: "center",

          position: "sticky",

          top: 0,

          zIndex: 9999,

          boxShadow:
            "0 10px 30px rgba(0,0,0,0.18)",
        }}
      >

        {/* LEFT */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
          }}
        >

          <img
            src="/logo.png"
            alt="logo"
            style={{
              width: "76px",
            }}
          />

          <div>

            <h1
              style={{
                color: "white",
                margin: 0,
                fontSize: "48px",
                fontWeight: "900",
                lineHeight: 1,
              }}
            >
              TUP Election 2026
            </h1>

            <p
              style={{
                marginTop: "8px",
                color: "#8ea4ff",
                fontSize: "14px",
                letterSpacing: "1.5px",
              }}
            >
              LIVE STUDENT COUNCIL VOTE COUNT
            </p>

          </div>

        </div>

        {/* CENTER CLOCK */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >

          <div
            style={{
              transform: "scale(0.82)",
            }}
          >
            <Countdown />
          </div>

        </div>

        {/* RIGHT TOGGLE */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            paddingRight: "24px",
          }}
        >

          <div
            style={{
              display: "flex",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "22px",
              overflow: "hidden",
              backdropFilter: "blur(12px)",
            }}
          >

            <button
              style={{
                border: "none",
                background: "#2563eb",
                color: "white",
                padding: "16px 20px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "700",
              }}
            >
              💻
            </button>

            <button
              style={{
                border: "none",
                background: "transparent",
                color: "white",
                padding: "16px 20px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "700",
              }}
            >
              📱
            </button>

          </div>

        </div>

      </div>

      {/* CONTENT */}
      <div
        style={{
          width: "100%",
          padding: "12px 0 50px 0",
        }}
      >

        <RealtimeTeams initialTeams={teams} />

      </div>

    </main>

  );
}