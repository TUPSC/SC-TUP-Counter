import { supabase } from "../lib/supabase";
import Countdown from "./components/Countdown";
import RealtimeTeams from "./components/RealtimeTeams";

export default async function Home() {
  const { data } = await supabase
    .from("team")
    .select("*")
    .order("id", { ascending: true });

  const teams = data || [];

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
          background: "linear-gradient(90deg,#020817,#071633,#020817)",
          padding: "16px 28px",
          boxSizing: "border-box",
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 9999,
          boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
        }}
      >
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
                marginBottom: 0,
                color: "#8ea4ff",
                fontSize: "14px",
                letterSpacing: "1.5px",
              }}
            >
              LIVE STUDENT COUNCIL VOTE COUNT
            </p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ transform: "scale(0.82)" }}>
            <Countdown />
          </div>
        </div>

        <div />
      </div>

      {/* CONTENT */}
      <div
        style={{
          width: "100%",
          padding: "12px 0 28px 0",
        }}
      >
        <RealtimeTeams initialTeams={teams} />
      </div>
    </main>
  );
}