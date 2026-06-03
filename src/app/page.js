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
        overflowX: "hidden",
        background: "#f4f5f7",
        fontFamily: "Arial, sans-serif",
      }}
    >

   {/* TOP GOVERNMENT HEADER */}
<div
  style={{
    width: "100vw",
    height: "130px",

    background:
      "linear-gradient(90deg,#020817,#08152f,#020817)",

    borderBottom:
      "1px solid rgba(255,255,255,0.08)",

    boxShadow:
      "0 10px 30px rgba(0,0,0,0.18)",

    position: "sticky",

    top: 0,

    zIndex: 9999,
  }}
>

  <div
    style={{
      width: "100%",

      height: "100%",

      display: "flex",

      alignItems: "center",

      justifyContent: "space-between",

      padding: "0 42px",
    }}
  >

    {/* LEFT */}
    <div
      style={{
        display: "flex",

        alignItems: "center",

        gap: "22px",
      }}
    >

      <img
        src="/logo.png"
        alt="logo"
        style={{
          width: "92px",
          objectFit: "contain",
        }}
      />

      <div>

        <h1
          style={{
            color: "white",

            fontSize: "56px",

            fontWeight: "800",

            margin: 0,

            lineHeight: 1,
          }}
        >
          TUP Election 2026
        </h1>

        <p
          style={{
            color: "#8ea4ff",

            marginTop: "8px",

            fontSize: "15px",

            letterSpacing: "1.5px",
          }}
        >
          LIVE STUDENT COUNCIL VOTE COUNT
        </p>

      </div>

    </div>

    {/* RIGHT */}
    <div
      style={{
        display: "flex",

        alignItems: "center",

        gap: "22px",
      }}
    >

      {/* COUNTDOWN */}
      <div
        style={{
          transform: "scale(0.9)",
          transformOrigin: "right center",

          filter:
            "drop-shadow(0 4px 12px rgba(0,0,0,0.25))",
        }}
      >
        <Countdown />
      </div>

    </div>

  </div>

</div>

      {/* CONTENT */}
      <div
        style={{
          maxWidth: "1250px",
          margin: "40px auto",
          padding: "0 20px",
        }}
      >

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
              marginTop: "40px",
            }}
          >
            {JSON.stringify(error, null, 2)}
          </pre>
        )}

      </div>

      {/* FOOTER */}
      <div
        style={{
          maxWidth: "900px",
          margin: "120px auto 0 auto",

          position: "relative",

          overflow: "hidden",

          borderRadius: "28px",

          boxShadow:
            "0 10px 40px rgba(0,0,0,0.15)",
        }}
      >

        {/* BG IMAGE */}
        <img
          src="/tup-aura (1).png"
          alt="footer background"
          style={{
            width: "100%",
            height: "250px",
            objectFit: "cover",
            display: "block",
          }}
        />

        {/* DARK OVERLAY */}
        <div
          style={{
            position: "absolute",
            inset: 0,

            background:
              "linear-gradient(to right, rgba(0,0,0,0.35), rgba(0,0,0,0.15))",
          }}
        />

        {/* CONTENT */}
        <div
          style={{
            position: "absolute",
            inset: 0,

            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",

            padding: "0 50px",

            flexWrap: "wrap",
            gap: "20px",
          }}
        >

          {/* LEFT */}
          <img
            src="/footer_logo.png"
            alt="footer logo"
            style={{
              width: "170px",
            }}
          />

          {/* RIGHT */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "18px",
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
                  width: "38px",
                  height: "38px",
                  cursor: "pointer",
                }}
              />

              <img
                src="/fb.png"
                alt="facebook"
                style={{
                  width: "38px",
                  height: "38px",
                  cursor: "pointer",
                }}
              />

              <img
                src="/web.png"
                alt="website"
                style={{
                  width: "38px",
                  height: "38px",
                  cursor: "pointer",
                }}
              />

            </div>

            {/* CREDIT */}
            <div
              style={{
                textAlign: "right",
                color: "white",
              }}
            >

              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  marginBottom: "6px",
                }}
              >
                TUPSC Election Dashboard 2026
              </p>

              <p
                style={{
                  fontSize: "13px",
                  opacity: 0.9,
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