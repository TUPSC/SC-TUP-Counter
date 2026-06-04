"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function RealtimeTeams({ initialTeams = [] }) {
  const [teams, setTeams] = useState(initialTeams || []);
  const [now, setNow] = useState(new Date());
  const [viewMode, setViewMode] = useState("desktop");

  const isMobile = viewMode === "mobile";
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
    const timer = setInterval(() => setNow(new Date()), 1000);
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
      if (channel) supabase.removeChannel(channel);
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
    <main className={`page ${isMobile ? "mobileMode" : "desktopMode"}`}>
      <div className="dashboard">
        <header className="header">
          <div className="timer">
            {hours}:{minutes}:{seconds}
          </div>

          <div className="toggleBar">
            <button
              type="button"
              onClick={() => setViewMode("desktop")}
              className={viewMode === "desktop" ? "active" : ""}
            >
              💻
            </button>

            <button
              type="button"
              onClick={() => setViewMode("mobile")}
              className={viewMode === "mobile" ? "active" : ""}
            >
              📱
            </button>
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
              <div className={`score score${index}`}>{team.score ?? 0}</div>
            </div>
          ))}
        </section>

        <footer className="footer">
          <img src="/footer_logo.png" alt="footer logo" className="footerLogo" />

          <div className="footerText">
            <div className="footerTitle">TUPSC Election Dashboard 2026</div>
            <div>Developed by ธัชเชษฐ์ คงแขม ม.6/4</div>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        html,
        body {
          margin: 0;
          padding: 0;
          background: #f6f6f6;
          overflow-x: hidden;
          overflow-y: auto;
        }
      `}</style>

      <style jsx>{`
        .page {
          width: 100%;
          min-height: 100vh;
          background: #f6f6f6;
          padding: 12px 20px 28px;
          box-sizing: border-box;
          overflow: visible;
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
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.08);
          padding: 0 10px;
          box-sizing: border-box;
        }

        .timer {
          grid-column: 2;
          color: #dc2626;
          font-size: 30px;
          font-weight: 900;
          line-height: 1;
          letter-spacing: 0;
        }

        .toggleBar {
          grid-column: 3;
          justify-self: end;
          display: flex;
          background: #eef2f7;
          border-radius: 12px;
          overflow: hidden;
          padding: 3px;
        }

        .toggleBar button {
          border: none;
          background: transparent;
          width: 38px;
          height: 30px;
          border-radius: 9px;
          cursor: pointer;
          font-size: 15px;
        }

        .toggleBar button.active {
          background: #2563eb;
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
          top: 80%;
          left: 69%;
          transform: translate(-50%, -50%);
          z-index: 2;
          color: white;
          font-size: clamp(42px, 4vw, 74px);
          font-weight: 800;
          line-height: 1;
          text-align: center;
          text-shadow: 0 8px 22px rgba(0, 0, 0, 0.3);
        }

        .score1 {
          left: 75%;
        }

        .score3 {
          left: 76%;
        }

        .score4 {
          left: 72%;
          top: 67%;
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

        .mobileMode .dashboard {
          width: min(430px, 100%);
        }

        .mobileMode .grid {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .mobileMode .card,
        .mobileMode .lastCard {
          width: 100%;
          aspect-ratio: 16 / 7;
        }

        .mobileMode .timer {
          font-size: 24px;
        }

        .mobileMode .score {
          font-size: 62px;
        }

        .mobileMode .header {
          height: 48px;
        }

        @media (max-width: 900px) {
          .page {
            padding: 14px 14px 28px;
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
            font-size: 24px;
          }

          .score {
            font-size: 62px;
          }
        }
      `}</style>
    </main>
  );
}