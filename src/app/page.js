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
        background: "#f5f5f5",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* MAIN CONTENT */}
      <div
        style={{
          maxWidth: "1150px",
          margin: "0 auto",
        }}
      >

    {/* HEADER ROW */}
<div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",

    gap: "24px",

    marginBottom: "30px",

    flexWrap: "wrap",
  }}
>

  {/* LOGO */}
  <img
    src="/logo.png"
    alt="logo"
    style={{
      width: "220px",
      objectFit: "contain",
    }}
  />

  {/* RIGHT SIDE */}
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
    }}
  >

    <h1
      style={{
        fontSize: "44px",
        color: "#142c6e",
        margin: 0,
        lineHeight: 1.1,
      }}
    >
      TUP Election 2026
    </h1>

    <div
      style={{
        transform: "scale(0.82)",
        transformOrigin: "left center",
        marginTop: "-10px",
      }}
    >
      <Countdown />
    </div>

  </div>
</div>

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
          margin: "140px auto 0 auto",
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
//test3
//test4
//test5