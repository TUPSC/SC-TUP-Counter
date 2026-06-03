"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function RealtimeTeams({ initialTeams }) {

  const [teams, setTeams] = useState(initialTeams);

  const [viewMode, setViewMode] = useState("desktop");

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
            .select("*")
            .order("score", { ascending: false });

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
  viewMode === "mobile"
    ? "1fr"
    : "1fr 1fr",

width: "100%",
maxWidth:
  viewMode === "mobile"
    ? "100%"
    : "1200px",

padding:
  viewMode === "mobile"
    ? "0 16px"
    : "0",

  columnGap: "54px",

rowGap: "28px",
marginTop: "-20px",

        position: "relative",
      }}
    >

      {/* VIEW SWITCHER */}
      <div
        style={{
          position: "fixed",
          top: "20px",
          left: "20px",

          zIndex: 9999,

          display: "flex",
          gap: "10px",

          background: "rgba(10,10,20,0.75)",

          padding: "10px",
          borderRadius: "18px",

          backdropFilter: "blur(14px)",

          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <button
          onClick={() => setViewMode("mobile")}
          style={{
            border: "none",
            padding: "12px 16px",

            borderRadius: "14px",

            cursor: "pointer",

            fontSize: "18px",

            background:
              viewMode === "mobile"
                ? "#3b82f6"
                : "rgba(255,255,255,0.08)",

            color: "white",
          }}
        >
          📱
        </button>

        <button
          onClick={() => setViewMode("desktop")}
          style={{
            border: "none",
            padding: "12px 16px",

            borderRadius: "14px",

            cursor: "pointer",

            fontSize: "18px",

            background:
              viewMode === "desktop"
                ? "#3b82f6"
                : "rgba(255,255,255,0.08)",

            color: "white",
          }}
        >
          💻
        </button>
      </div>

      {/* TEAM CARDS */}
      {teams.map((team, index) => (
        <div
          key={team.id}
          style={{
            
      width:
  viewMode === "mobile"
    ? "100%"
    : "100%",

maxWidth:
  viewMode === "mobile"
    ? "100%"
    : index === teams.length - 1 &&
      teams.length % 2 !== 0
    ? "540px"
    : "100%",
    gridColumn:
  viewMode === "desktop" &&
  index === teams.length - 1 &&
  teams.length % 2 !== 0
    ? "1 / span 2"
    : "auto",
    maxWidth:
  viewMode === "desktop" &&
  index === teams.length - 1 &&
  teams.length % 2 !== 0
    ? "540px"
    : "100%",
    justifySelf:
  viewMode === "desktop" &&
  index === teams.length - 1 &&
  teams.length % 2 !== 0
    ? "center"
    : "stretch",
            backgroundImage: `url(${images[index % images.length]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",

            borderRadius: "28px",

            padding:
  viewMode === "mobile"
    ? "48px 18px 18px 18px"
    : "34px 12px 12px 12px",

            marginBottom: "24px",

            color: "white",

            boxShadow: "0 8px 20px rgba(0,0,0,0.1)",

            position: "relative",

            overflow: "hidden",

minHeight:
  viewMode === "mobile"
    ? "260px"
    : "165px",

            display: "flex",

            flexDirection: "column",

            justifyContent: "space-between",
          }}
        >

          {/* DARK OVERLAY */}
          <div
            style={{
              position: "absolute",
              inset: 0,

              background: "rgba(0,0,0,0.18)",
            }}
          />

          {/* SCORE */}
{viewMode === "desktop" ? (

  /* DESKTOP — KEEP EXACT SAME */
  <div
    style={{
      position: "absolute",

      right: "21%",

      bottom: "8%",

      fontSize: "58px",

      fontWeight: "bold",

      lineHeight: 1,

      color: "white",

      zIndex: 2,

      textShadow:
        "0 4px 12px rgba(0,0,0,0.28)",
    }}
  >
    {team.score}
  </div>

) : (

  /* MOBILE — FIXED ALIGNMENT */
  <div
    style={{
      position: "absolute",

      left: "70%",

      transform: "translateX(-50%)",

      bottom: "19%",

      width: "85%",

      textAlign: "center",

      fontSize: "90px",

      fontWeight: "bold",

      lineHeight: 1,

      color: "white",

      zIndex: 2,

      textShadow:
        "0 4px 12px rgba(0,0,0,0.35)",
    }}
  >
    {team.score}
  </div>

)}
        </div>
      ))}
    </div>
  );
}
//test
//test2
//test3
//test4
//test5
//test6