import { supabase } from "../lib/supabase";
import Countdown from "./components/Countdown.js";
import RealtimeTeams from "./components/RealtimeTeams";

export default async function Home() {
  const { data, error } = await supabase
    .from("team")
    .select("*")
    .order("score", { ascending: false });

  const teams = data || [];

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* MAIN CONTENT */}
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
        }}
      >
        {/* TOP LOGO */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <img
            src="/logo.png"
            alt="logo"
            style={{
              width: "180px",
              objectFit: "contain",
            }}
          />
        </div>

        {/* TITLE */}
        <h1
          style={{
            textAlign: "center",
            fontSize: "48px",
            marginBottom: "40px",
            color: "#142c6e",
          }}
        >
          TUPSC Dashboard
        </h1>

        {/* COUNTDOWN */}
        <Countdown />

        {/* REALTIME LEADERBOARD */}
        <RealtimeTeams initialTeams={teams} />

        {/* ERROR */}
       {error && (
  <pre
    style={{
      color: "red",
      textAlign: "center",
      whiteSpace: "pre-wrap",
      fontSize: "14px",
    }}
  >
    {JSON.stringify(error, null, 2)}
  </pre>
)}
      </div>

      {/* FOOTER */}
      <div
        style={{
          maxWidth: "700px",
          margin: "80px auto 0 auto",
          position: "relative",
          overflow: "hidden",
          borderRadius: "28px",
        }}
      >
        {/* BACKGROUND */}
        <img
          src="/tup-aura (1).png"
          alt="footer background"
          style={{
            width: "100%",
            height: "220px",
            objectFit: "cover",
            display: "block",
          }}
        />

        {/* OVERLAY */}
<div
  style={{
    position: "absolute",
    inset: 0,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "0 40px",
  }}
>
          {/* LEFT LOGO */}
          <div>
            <img
              src="/footer_logo.png"
              alt="footer logo"
              style={{
                width: "140px",
              }}
            />
          </div>

          {/* RIGHT SIDE */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "14px",
            }}
          >
            {/* SOCIALS */}
            <div
              style={{
                display: "flex",
                gap: "18px",
              }}
            >
              <img
                src="/ig.png"
                alt="instagram"
                style={{
                  width: "36px",
                  height: "36px",
                  cursor: "pointer",
                }}
              />

              <img
                src="/fb.png"
                alt="facebook"
                style={{
                  width: "36px",
                  height: "36px",
                  cursor: "pointer",
                }}
              />

              <img
                src="/web.png"
                alt="website"
                style={{
                  width: "36px",
                  height: "36px",
                  cursor: "pointer",
                }}
              />
            </div>

            {/* CREDIT */}
            <div
              style={{
                textAlign: "right",
                color: "black",
              }}
            >
              <p
                style={{
                  fontSize: "15px",
                  fontWeight: "bold",
                  marginBottom: "4px",
                }}
              >
                TUPSC Election Dashboard 2026
              </p>

              <p
                style={{
                  fontSize: "12px",
                }}
              >
                Developed by นายธัชเชษฐ์ คงแขม ม.6/4
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

//test
//test2
