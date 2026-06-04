
"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function RealtimeTeams({ initialTeams = [] }) {
  const [teams, setTeams] = useState(initialTeams || []);
  const [now, setNow] = useState(new Date());

  const images = ["/p1.JPG", "/p2.JPG", "/p3.JPG", "/p4.JPG", "/p5.JPG"];

  const fetchTeams = async () => {
    const { data, error } = await supabase
      .from("team")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.error("Error fetching teams:", error);
      return;
    }

    setTeams(data || []);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let channel;

    const setupRealtime = async () => {
      await fetchTeams();

      await Promise.all(
        supabase
          .getChannels()
          .filter((oldChannel) => oldChannel.topic.includes("realtime-team"))
          .map((oldChannel) => supabase.removeChannel(oldChannel))
      );

      channel = supabase.channel(`realtime-team-${crypto.randomUUID()}`);

      channel.on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "team",
        },
        fetchTeams
      );

      channel.subscribe();
    };

    setupRealtime();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, []);

  const targetTime = new Date();
  targetTime.setHours(13, 0, 0, 0);

  const remainingMs = Math.max(targetTime.getTime() - now.getTime(), 0);
  const hours = String(Math.floor(remainingMs / 1000 / 60 / 60)).padStart(2, "0");
  const minutes = String(Math.floor((remainingMs / 1000 / 60) % 60)).padStart(2, "0");
  const seconds = String(Math.floor((remainingMs / 1000) % 60)).padStart(2, "0");

  const visibleTeams = Array.from({ length: 5 }, (_, index) => {
    return teams[index] || {
      id: `empty-${index}`,
      score: 0,
    };
  });

  return (
    <main className="page">
      <div className="dashboard">
        <header className="header">
          <div className="timer">
            {hours}:{minutes}:{seconds}
          </div>
        </header>

        <section className="grid">
          {visibleTeams.map((team, index) => (
            <div
              key={team.id}
              className={`card ${index === 4 ? "lastCard" : ""}`}
              style={{ backgroundImage: `url(${images[index]})` }}
            >
              <div className="overlay" />
              <div className="score">{team.score ?? 0}</div>
            </div>
          ))}
        </section>

        <footer className="footer">
          <img src="/footer_logo.png" alt="footer logo" className="footerLogo" />

          <div className="footerText">
            <div className="footerTitle">TUPSC Election Dashboard 2026</div>
            <div>Developed by Leo Thutchet</div>
            <div className="footerSub">Powered by TUP Aura</div>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        html,
        body {
          margin: 0;
          padding: 0;
          background: #f6f6f6;
          overflow: hidden;
        }
      `}</style>

      <style jsx>{`
        .page {
          width: 100vw;
          min-height: 100vh;
          background: #f6f6f6;
          padding: 12px 20px;
          box-sizing: border-box;
          overflow: hidden;
        }

        .dashboard {
          width: min(76vw, 1180px);
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .header {
          height: 44px;
          border-radius: 16px;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.08);
        }

        .timer {
          color: #dc2626;
          font-size: 30px;
          font-weight: 900;
          line-height: 1;
          letter-spacing: 0;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px 22px;
        }

        .card {
          position: relative;
          overflow: hidden;
          border-radius: 22px;
          aspect-ratio: 16 / 5.8;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
        }

        .lastCard {
          grid-column: 1 / span 2;
          width: 54%;
          justify-self: center;
        }

        .overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.02),
            rgba(0, 0, 0, 0.1)
          );
        }

        .score {
          position: absolute;
          right: 8%;
          top: 50%;
          transform: translateY(-50%);
          z-index: 2;
          color: white;
          font-size: clamp(52px, 4.7vw, 88px);
          font-weight: 900;
          line-height: 1;
          text-shadow: 0 8px 22px rgba(0, 0, 0, 0.3);
        }

        .footer {
          height: 64px;
          border-radius: 18px;
          overflow: hidden;
          background-image:
            linear-gradient(to right, rgba(0, 0, 0, 0.58), rgba(0, 0, 0, 0.24)),
            url("/tup-aura (1).png");
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          box-sizing: border-box;
          color: white;
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.16);
        }

        .footerLogo {
          width: 70px;
          max-height: 48px;
          object-fit: contain;
        }

        .footerText {
          text-align: right;
          font-size: 11px;
          opacity: 0.95;
        }

        .footerTitle {
          font-size: 15px;
          font-weight: 800;
          margin-bottom: 2px;
        }

        .footerSub {
          font-size: 10px;
          opacity: 0.75;
          margin-top: 1px;
        }

        @media (max-width: 900px) {
          html,
          body {
            overflow-y: auto;
          }

          .page {
            overflow: visible;
            padding: 14px;
          }

          .dashboard {
            width: 100%;
          }

          .grid {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }

          .card,
          .lastCard {
            width: 100%;
            aspect-ratio: 16 / 7;
          }

          .timer {
            font-size: 26px;
          }

          .score {
            font-size: 76px;
          }
        }
      `}</style>
    </main>
  );
}
