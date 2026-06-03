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
    "/p1.JPG", // team id 1
    "/p2.JPG", // team id 2
    "/p3.JPG", // team id 3
    "/p4.JPG", // team id 4
    "/p5.JPG", // team id 5
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

        maxWidth: "1320px",

        margin: "0 auto",

        padding:
          isMobile
            ? "0 16px"
            : "0 20px",

        columnGap: "56px",

        rowGap: "42px",

        marginTop: "40px",

        position: "relative",
      }}
    >

      {/* VIEW TOGGLE */}
      <div
        style={{
          position: "absolute",

          top: "-145px",

          right: "24px",

          display: "flex",

          gap: "12px",

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
                : "rgba(255,255,255,0.12)",

            color: "white",

            width: "54px",
            height: "54px",

            borderRadius: "18px",

            fontSize: "22px",

            cursor: "pointer",

            backdropFilter: "blur(12px)",

            boxShadow:
              "0 6px 20px rgba(0,0,0,0.25)",
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
                : "rgba(255,255,255,0.12)",

            color: "white",

            width: "54px",
            height: "54px",

            borderRadius: "18px",

            fontSize: "22px",

            cursor: "pointer",

            backdropFilter: "blur(12px)",

            boxShadow:
              "0 6px 20px rgba(0,0,0,0.25)",
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
              "0 14px 38px rgba(0,0,0,0.14)",

            transition: "0.25s ease",
          }}
        >

          {/* DARK OVERLAY */}
          <div
            style={{
              position: "absolute",

              inset: 0,

              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.04), rgba(0,0,0,0.18))",
            }}
          />

          {/* SCORE ONLY */}
          <div
            style={{
              position: "absolute",

              right:
                isMobile
                  ? "12%"
                  : "14%",

              top: "50%",

              transform: "translateY(-50%)",

              zIndex: 5,

              fontSize:
                isMobile
                  ? "74px"
                  : "96px",

              fontWeight: "900",

              color: "white",

              lineHeight: 1,

              textShadow:
                "0 6px 18px rgba(0,0,0,0.38)",
            }}
          >
            {team.score}
          </div>

        </div>

      ))}

    </div>

  );
}