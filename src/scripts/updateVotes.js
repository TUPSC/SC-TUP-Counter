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

      {/* TOP HEADER */}
      <div
        style={{
          width: "100vw",

          height: "92px",

          background:
            "linear-gradient(90deg,#020817,#08152f,#020817)",

          borderBottom:
            "1px solid rgba(255,255,255,0.08)",

          boxShadow:
            "0 8px 22px rgba(0,0,0,0.14)",

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

            padding: "0 26px",
          }}
        >

          {/* LEFT */}
          <div
            style={{
              display: "flex",

              alignItems: "center",

              gap: "14px",
            }}
          >

            <img
              src="/logo.png"
              alt="logo"
              style={{
                width: "58px",

                objectFit: "contain",
              }}
            />

            <div>

              <h1
                style={{
                  color: "white",

                  fontSize: "32px",

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

                  marginTop: "4px",

                  fontSize: "11px",

                  letterSpacing: "1.2px",
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

              marginRight: "80px",
            }}
          >

            {/* CLOCK */}
            <div
              style={{
                transform: "scale(0.66)",

                transformOrigin: "right center",
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
          width: "100%",

          maxWidth: "1480px",

          margin: "0 auto",

          padding: "8px 12px 0 12px",
        }}
      >

        <RealtimeTeams initialTeams={teams} />

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
          maxWidth: "760px",

          margin: "50px auto 0 auto",

          position: "relative",

          overflow: "hidden",

          borderRadius: "24px",

          boxShadow:
            "0 10px 30px rgba(0,0,0,0.12)",
        }}
      >

        <img
          src="/tup-aura (1).png"
          alt="footer background"
          style={{
            width: "100%",

            height: "180px",

            objectFit: "cover",

            display: "block",
          }}
        />

        {/* OVERLAY */}
        <div
          style={{
            position: "absolute",

            inset: 0,

            background:
              "linear-gradient(to right, rgba(0,0,0,0.30), rgba(0,0,0,0.10))",
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

            padding: "0 34px",
          }}
        >

          <img
            src="/footer_logo.png"
            alt="footer logo"
            style={{
              width: "120px",
            }}
          />

          <div
            style={{
              textAlign: "right",

              color: "white",
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
                fontSize: "11px",

                opacity: 0.9,
              }}
            >
              Developed by นายธัชเชษฐ์ คงแขม ม.6/4
            </p>

          </div>

        </div>

      </div>

    </main>

  );
}