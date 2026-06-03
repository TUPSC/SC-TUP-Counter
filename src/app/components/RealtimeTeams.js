"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function RealtimeTeams({ initialTeams }) {

  const [teams, setTeams] = useState(initialTeams);

  const [viewMode, setViewMode] = useState("desktop");

  const isMobile = viewMode === "mobile";

  /* FIXED TEAM ORDER */
  const filteredTeams = teams
    .filter(
      (team) =>
        team.name !== "ไม่ประสงค์ลงคะแนน"
    )
    .sort((a, b) => a.id - b.id);

  /* FIXED IMAGE ORDER */
  const images = [
    "/p1.JPG",
    "/p2.JPG",
    "/p3.JPG",
    "/p4.JPG",
    "/p5.JPG",
  ];

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

  return (

    <div
      style={{
        display: "grid",

        justifyItems: "center",

        gridTemplateColumns:
          isMobile
            ? "1fr"
            : "1fr 1fr",

        width: "100%",

        maxWidth: "1450px",

        margin: "0 auto",

        padding:
          isMobile
            ? "0 10px"
            : "0 10px",

        columnGap: "22px",

        rowGap: "22px",

        marginTop: "18px",

        position: "relative",
      }}
    >

      {/* VIEW TOGGLE */}
      <div
        style={{
          position: "absolute",

          top: "-112px",

          right: "24px",

          display: "flex",

          gap: "10px",

          zIndex: 100,
        }}
      >

        {/* MOBILE */}
        <button
          onClick={() => setViewMode("mobile")}
          style={{
            border: "none",

            background:
              viewMode === "mobile"
                ? "#2563eb"
                : "rgba(255,255,255,0.10)",

            color: "white",

            width: "50px",
            height: "50px",

            borderRadius: "16px",

            fontSize: "20px",

            cursor: "pointer",

            backdropFilter: "blur(12px)",

            boxShadow:
              "0 4px 16px rgba(0,0,0,0.22)",
          }}
        >
          📱
        </button>

        {/* DESKTOP */}
        <button
          onClick={() => setViewMode("desktop")}
          style={{
            border: "none",

            background:
              viewMode === "desktop"
                ? "#2563eb"
                : "rgba(255,255,255,0.10)",

            color: "white",

            width: "50px",
            height: "50px",

            borderRadius: "16px",

            fontSize: "20px",

            cursor: "pointer",

            backdropFilter: "blur(12px)",

            boxShadow:
              "0 4px 16px rgba(0,0,0,0.22)",
          }}
        >
          💻
        </button>

      </div>

      {/* TEAM CARDS */}
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
                ? "620px"
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

            borderRadius: "34px",

            overflow: "hidden",

            position: "relative",

            minHeight:
              isMobile
                ? "210px"
                : "260px",

            aspectRatio:
              isMobile
                ? "16 / 8"
                : "16 / 6",

            boxShadow:
              "0 10px 30px rgba(0,0,0,0.12)",

            transition: "0.25s ease",
          }}
        >

          {/* DARK OVERLAY */}
          <div
            style={{
              position: "absolute",

              inset: 0,

              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.03), rgba(0,0,0,0.16))",
            }}
          />

          {/* SCORE */}
          <div
            style={{
              position: "absolute",

              right:
                isMobile
                  ? "8%"
                  : "9%",

              top: "54%",

              transform: "translateY(-50%)",

              width:
                isMobile
                  ? "90px"
                  : "110px",

              display: "flex",

              justifyContent: "center",

              alignItems: "center",

              zIndex: 5,

              fontSize:
                isMobile
                  ? "68px"
                  : "82px",

              fontWeight: "900",

              color: "white",

              lineHeight: 1,

              letterSpacing: "-4px",

              textAlign: "center",

              textShadow:
                "0 5px 16px rgba(0,0,0,0.32)",
            }}
          >
            {team.score}
          </div>

        </div>

      ))}

    </div>

  );
}