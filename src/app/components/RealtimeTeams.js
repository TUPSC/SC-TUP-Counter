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

  {/* TOP NAVBAR */}
<div
  style={{
    position: "sticky",

    top: 0,

    zIndex: 9999,

    width: "100%",

    display: "flex",

    justifyContent: "space-between",

    alignItems: "center",

    padding: "16px 20px",

    background: "rgba(10,10,20,0.82)",

    backdropFilter: "blur(16px)",

    borderBottom:
      "1px solid rgba(255,255,255,0.08)",

    borderRadius:
      viewMode === "mobile"
        ? "0 0 24px 24px"
        : "0 0 28px 28px",

    marginBottom: "30px",
  }}
>
  
  {/* LEFT SIDE */}
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "12px",
    }}
  >

    {/* HAMBURGER */}
    <button
      style={{
        border: "none",

        background:
          "rgba(255,255,255,0.08)",

        color: "white",

        width: "46px",
        height: "46px",

        borderRadius: "14px",

        fontSize: "22px",

        cursor: "pointer",
      }}
    >
      ☰
    </button>

    {/* CURRENT TAB */}
    <div
      style={{
        color: "white",

        fontWeight: "600",

        fontSize:
          viewMode === "mobile"
            ? "16px"
            : "18px",
      }}
    >
      President Election
    </div>

  </div>

  {/* RIGHT SIDE */}
  <div
    style={{
      display: "flex",
      gap: "10px",
    }}
  >
    <button
      onClick={() => setViewMode("mobile")}
      style={{
        border: "none",

        padding: "10px 14px",

        borderRadius: "12px",

        cursor: "pointer",

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

        padding: "10px 14px",

        borderRadius: "12px",

        cursor: "pointer",

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

minHeight: "140px",
aspectRatio:
  viewMode === "mobile"
    ? "16 / 5"
    : "16 / 5",

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

    left: "68%",

    transform: "translateX(-50%)",

    bottom: "10%",

    width: "50%",

    textAlign: "center",

    fontSize: "58px",

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