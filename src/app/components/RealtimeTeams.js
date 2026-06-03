"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function RealtimeTeams({ initialTeams }) {

  /* =========================================================
     STATE
  ========================================================= */

  const [teams, setTeams] = useState(initialTeams);

  const [viewMode, setViewMode] = useState("desktop");

  const isMobile = viewMode === "mobile";

  /* =========================================================
     FILTERED TEAMS
  ========================================================= */

  const filteredTeams = teams

    .filter(
      (team) =>
        team.name !== "ไม่ประสงค์ลงคะแนน"
    )

    .sort((a, b) => a.id - b.id);

  /* =========================================================
     IMAGES
  ========================================================= */

  const images = [
    "/p1.JPG",
    "/p2.JPG",
    "/p3.JPG",
    "/p4.JPG",
    "/p5.JPG",
  ];

  /* =========================================================
     REALTIME
  ========================================================= */

  useEffect(() => {

    const channel = supabase

      .channel("realtime teams")

      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "team",
        },

        async () => {

          const { data } = await supabase
            .from("team")
            .select("*");

          setTeams(data || []);
        }
      )

      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };

  }, []);

  /* =========================================================
     UI
  ========================================================= */

  return (

    <div
      style={{

        width: "100%",

        display: "flex",

        justifyContent: "center",

        paddingTop: "34px",

        paddingBottom: "70px",
      }}
    >

      {/* =====================================================
          MAIN PANEL
      ===================================================== */}

      <div
        style={{

          width: "96%",

          maxWidth: "1500px",

          background: "#f8f8f9",

          borderRadius: "38px",

          paddingTop: "40px",

          paddingBottom: "40px",

          paddingLeft:
            isMobile
              ? "18px"
              : "28px",

          paddingRight:
            isMobile
              ? "18px"
              : "28px",

          boxShadow:
            "0 16px 50px rgba(0,0,0,0.10)",

          position: "relative",
        }}
      >

        {/* =====================================================
            TOGGLE BAR
        ===================================================== */}

        <div
          style={{

            position: "absolute",

            top: "-92px",

            right: "24px",

            display: "flex",

            alignItems: "center",

            background:
              "rgba(255,255,255,0.08)",

            backdropFilter: "blur(14px)",

            border:
              "1px solid rgba(255,255,255,0.08)",

            borderRadius: "24px",

            overflow: "hidden",

            boxShadow:
              "0 10px 24px rgba(0,0,0,0.20)",

            zIndex: 999,
          }}
        >

          {/* DESKTOP BUTTON */}

          <button
            onClick={() => setViewMode("desktop")}
            style={{

              border: "none",

              background:
                viewMode === "desktop"
                  ? "#2563eb"
                  : "transparent",

              color: "white",

              width: "95px",

              height: "78px",

              cursor: "pointer",

              display: "flex",

              flexDirection: "column",

              alignItems: "center",

              justifyContent: "center",

              gap: "6px",

              transition: "0.2s ease",
            }}
          >

            <div
              style={{
                fontSize: "28px",
              }}
            >
              💻
            </div>

            <div
              style={{
                fontSize: "14px",
                fontWeight: "700",
              }}
            >
              Desktop
            </div>

          </button>

          {/* MOBILE BUTTON */}

          <button
            onClick={() => setViewMode("mobile")}
            style={{

              border: "none",

              background:
                viewMode === "mobile"
                  ? "#2563eb"
                  : "transparent",

              color: "white",

              width: "95px",

              height: "78px",

              cursor: "pointer",

              display: "flex",

              flexDirection: "column",

              alignItems: "center",

              justifyContent: "center",

              gap: "6px",

              transition: "0.2s ease",
            }}
          >

            <div
              style={{
                fontSize: "28px",
              }}
            >
              📱
            </div>

            <div
              style={{
                fontSize: "14px",
                fontWeight: "700",
              }}
            >
              Mobile
            </div>

          </button>

        </div>

        {/* =====================================================
            GRID
        ===================================================== */}

        <div
          style={{

            display: "grid",

            gridTemplateColumns:
              isMobile
                ? "1fr"
                : "1fr 1fr",

            columnGap:
              isMobile
                ? "18px"
                : "30px",

            rowGap:
              isMobile
                ? "22px"
                : "30px",

            alignItems: "center",
          }}
        >

          {/* =================================================
              TEAM CARDS
          ================================================= */}

          {filteredTeams.map((team, index) => (

            <div
              key={team.id}

              style={{

                width: "100%",

                gridColumn:
                  !isMobile &&
                  index === filteredTeams.length - 1 &&
                  filteredTeams.length % 2 !== 0
                    ? "1 / span 2"
                    : "auto",

                maxWidth:
                  !isMobile &&
                  index === filteredTeams.length - 1 &&
                  filteredTeams.length % 2 !== 0
                    ? "760px"
                    : "100%",

                justifySelf:
                  !isMobile &&
                  index === filteredTeams.length - 1 &&
                  filteredTeams.length % 2 !== 0
                    ? "center"
                    : "stretch",

                backgroundImage:
                  `url(${images[index]})`,

                backgroundSize: "cover",

                backgroundPosition: "center",

                backgroundRepeat: "no-repeat",

                borderRadius: "30px",

                overflow: "hidden",

                position: "relative",

                minHeight:
                  isMobile
                    ? "220px"
                    : "250px",

                aspectRatio:
                  isMobile
                    ? "16 / 7"
                    : "16 / 5",

                boxShadow:
                  "0 12px 34px rgba(0,0,0,0.12)",

                transition: "0.22s ease",
              }}
            >

              {/* =============================================
                  OVERLAY
              ============================================= */}

              <div
                style={{

                  position: "absolute",

                  inset: 0,

                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.02), rgba(0,0,0,0.12))",
                }}
              />

              {/* =============================================
                  SCORE
              ============================================= */}

              <div
                style={{

                  position: "absolute",

                  right:
                    isMobile
                      ? "9%"
                      : "8%",

                  top: "50%",

                  transform: "translateY(-50%)",

                  zIndex: 20,

                  fontSize:
                    isMobile
                      ? "92px"
                      : "112px",

                  fontWeight: "900",

                  color: "white",

                  lineHeight: 1,

                  textShadow:
                    "0 10px 24px rgba(0,0,0,0.34)",
                }}
              >

                {team.score}

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );
}
//test