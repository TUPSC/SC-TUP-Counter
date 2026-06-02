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
  position: "absolute",

  left: "58px",
  bottom: "26px",

  fontSize: "84px",
  fontWeight: "bold",
  lineHeight: 1,

  color: "white",

  zIndex: 2,
}}
          >
            {team.score}
          </div>

        </div>
      ))}
    </>
  );
}
//test
//test2