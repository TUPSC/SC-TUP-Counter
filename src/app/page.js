import { supabase } from "../lib/supabase";
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
    <div
  style={{
    width: "100%",
    background: "linear-gradient(90deg,#020817,#071633,#020817)",
    padding: "14px 28px",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
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

    <div
      style={{
        color: "#8ea4ff",
        fontSize: "15px",
        fontWeight: "800",
        letterSpacing: "1.5px",
      }}
    >
      LIVE STUDENT COUNCIL VOTE COUNT
    </div>
  </div>

  <div
    style={{
      color: "#8ea4ff",
      fontSize: "15px",
      fontWeight: "800",
      letterSpacing: "1.5px",
      textAlign: "right",
      whiteSpace: "nowrap",
    }}
  >
    *ผลคะแนนอย่างไม่เป็นทางการ*
  </div>
</div>

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