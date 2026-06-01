"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function RealtimeTeams({ initialTeams }) {

  const [teams, setTeams] = useState(initialTeams);

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
    <>
      {teams.map((team, index) => (
        <div
          key={team.id}
          style={{
            backgroundImage: `url(${images[index % images.length]})`,
backgroundSize: "cover",
backgroundPosition: "center",
backgroundRepeat: "no-repeat",
            borderRadius: "28px",
            padding: "30px",
            marginBottom: "24px",
            color: "white",
            boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
            position: "relative",
            overflow: "hidden",

           minHeight: "320px",
           display: "flex",
           flexDirection: "column",
           justifyContent: "space-between",
          }}
        >
          <div
  style={{
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.18)",

  }}
/>
          <div
            style={{
              fontSize: "22px",
              opacity: 0.9,
              marginBottom: "12px",
              position: "relative",
zIndex: 2,
            }}
          >
            พรรค
          </div>

   

          <div
            style={{
              width: "100%",
              height: "2px",
              background: "rgba(255,255,255,0.7)",
              marginBottom: "20px",
              position: "relative",
zIndex: 2,
            }}
          />

      <div
  style={{
              fontSize: "96px",
              fontWeight: "bold",
              lineHeight: 1,
              position: "relative",
              zIndex: 2,
              marginTop: "auto",
              paddingTop: "40px",
              letterSpacing: "2px",
            }}
          >
            {team.score}
          </div>

          <div
            style={{
              fontSize: "22px",
              letterSpacing: "4px",
              fontWeight: "bold",
              letterSpacing: "2px",
              position: "relative",
zIndex: 2,
            }}
          >
          
          </div>
        </div>
      ))}
    </>
  );
}