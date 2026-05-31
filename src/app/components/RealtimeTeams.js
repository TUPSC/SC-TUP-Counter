"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function RealtimeTeams({ initialTeams }) {

  const [teams, setTeams] = useState(initialTeams);

  const colors = [
    "linear-gradient(135deg, #f6b73c, #f28b30)",
    "linear-gradient(135deg, #f78fb3, #f368a0)",
    "linear-gradient(135deg, #74b9ff, #4a69bd)",
    "linear-gradient(135deg, #55efc4, #00b894)",
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
            background: colors[index % colors.length],
            borderRadius: "28px",
            padding: "30px",
            marginBottom: "24px",
            color: "white",
            boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{
              fontSize: "22px",
              opacity: 0.9,
              marginBottom: "12px",
            }}
          >
            พรรค
          </div>

          <h2
            style={{
              fontSize: "42px",
              margin: 0,
              marginBottom: "20px",
              fontWeight: "bold",
            }}
          >
            {team.name}
          </h2>

          <div
            style={{
              width: "100%",
              height: "2px",
              background: "rgba(255,255,255,0.4)",
              marginBottom: "20px",
            }}
          />

          <div
            style={{
              fontSize: "72px",
              fontWeight: "bold",
              lineHeight: 1,
            }}
          >
            {team.score}
          </div>

          <div
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              letterSpacing: "2px",
            }}
          >
            POINTS
          </div>
        </div>
      ))}
    </>
  );
}