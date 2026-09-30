"use client";

import { useEffect, useRef, useState } from "react";

const HER_NAME = "любимая";
const MY_NAME = "Парвиз";

const COLORS = ["#d7263d", "#ff5c7a", "#ff8fa6", "#ffb3c1"];

function Heart({ className, style }) {
  return (
    <svg viewBox="0 0 32 29" className={className} style={style} aria-hidden="true">
      <path
        fill="currentColor"
        d="M23.6 0c-3.4 0-6.3 2.1-7.6 5.1C14.7 2.1 11.8 0 8.4 0 3.8 0 0 3.8 0 8.4c0 9.5 16 20.6 16 20.6s16-11.1 16-20.6C32 3.8 28.2 0 23.6 0z"
      />
    </svg>
  );
}

export default function Home() {
  const [stage, setStage] = useState("closed"); 
  const [hearts, setHearts] = useState([]);
  const [burst, setBurst] = useState([]);
  const timer = useRef(null);

  useEffect(() => {
    setHearts(
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 14 + Math.random() * 28,
        dur: 9 + Math.random() * 10,
        delay: -Math.random() * 18,
        drift: (Math.random() - 0.5) * 90,
        color: COLORS[i % COLORS.length],
        op: 0.25 + Math.random() * 0.45,
      }))
    );
    return () => clearTimeout(timer.current);
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && closeLetter();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function openEnvelope() {
    if (stage !== "closed") return;
    setStage("opening");
    setBurst(
      Array.from({ length: 30 }, (_, i) => {
        const angle = (i / 30) * Math.PI * 2 + Math.random() * 0.4;
        const dist = 140 + Math.random() * 200;
        return {
          id: i,
          dx: Math.cos(angle) * dist,
          dy: Math.sin(angle) * dist - 60,
          size: 12 + Math.random() * 22,
          color: COLORS[i % COLORS.length],
          delay: Math.random() * 0.25,
        };
      })
    );
    timer.current = setTimeout(() => setStage("reading"), 1500);
  }

  function closeLetter() {
    clearTimeout(timer.current);
    setStage("closed");
    setBurst([]);
  }

  return (
    <main className="page">
      <div className="hearts" aria-hidden="true">
        {hearts.map((h) => (
          <Heart
            key={h.id}
            className="float-heart"
            style={{
              left: `${h.left}%`,
              width: h.size,
              color: h.color,
              opacity: h.op,
              animationDuration: `${h.dur}s`,
              animationDelay: `${h.delay}s`,
              "--drift": `${h.drift}px`,
            }}
          />
        ))}
      </div>

      <header className="head">
        <p className="script">Нам полгода</p>
        <h1>Для тебя, {HER_NAME}</h1>
      </header>

      <div className={`stage stage-${stage}`}>
        <button
          type="button"
          className={`envelope ${stage !== "closed" ? "is-open" : ""}`}
          onClick={openEnvelope}
          aria-label="Открыть конверт с письмом"
        >
          <span className="env-back" />
          <span className="env-letter">
            <span className="env-lines" />
            <Heart className="env-letter-heart" />
          </span>
          <span className="env-front" />
          <span className="env-flap" />
          <span className="env-seal">
            <Heart />
          </span>
        </button>

        <div className="burst" aria-hidden="true">
          {burst.map((b) => (
            <Heart
              key={b.id}
              className="burst-heart"
              style={{
                width: b.size,
                color: b.color,
                animationDelay: `${b.delay}s`,
                "--dx": `${b.dx}px`,
                "--dy": `${b.dy}px`,
              }}
            />
          ))}
        </div>
      </div>

      <p className={`hint ${stage === "closed" ? "" : "hint-hidden"}`}>Нажми на конверт</p>

      {stage === "reading" && (
        <div className="overlay" onClick={closeLetter}>
          <article
            className="letter"
            role="dialog"
            aria-modal="true"
            aria-labelledby="letter-title"
            onClick={(e) => e.stopPropagation()}
          >
            <Heart className="letter-heart" />
            <h2 id="letter-title">С полугодием, {HER_NAME}</h2>

            <p>
              Вот и прошло полгода с того дня, как мы вместе. Кажется, что это было вчера - и
              одновременно будто я знал тебя всегда.
            </p>

            <p>
              Сначала - прости меня. Этот подарок пришёл позже, чем должен был. Работа и учёба
              навалились так, что я просто не находил свободной минуты, и мне очень стыдно, что
              в такой важный для нас день я не успел всё сделать вовремя. Но знай: ни на секунду
              я не забывал об этой дате. Когда было тяжело, я думал о тебе - и это давало мне
              силы идти дальше.
            </p>

            <p>
              Как сильно я тебя люблю? Сильнее, чем умею сказать словами. Ты - первая, о ком я
              думаю утром, и последняя, кому хочется написать перед сном. Рядом с тобой любая
              усталость становится легче, а любой день - светлее. Твоя улыбка для меня как дом,
              в который хочется возвращаться.
            </p>

            <p>
              Я люблю в тебе всё: твой смех, твою доброту, то, как ты переживаешь за близких, как
              упрямишься по мелочам и как обнимаешь - так, что весь мир на секунду замолкает.
              Спасибо, что ты рядом даже тогда, когда я занят и устал, и всё равно веришь в нас.
            </p>

            <p>
              Обещаю находить время для нас, беречь тебя и делать так, чтобы ты чувствовала себя
              самой любимой. Это только первые полгода, а впереди целая жизнь - и я хочу пройти
              её с тобой.
            </p>

            <p className="sign">
              Люблю тебя всем сердцем,
              <br />
              навсегда твой {MY_NAME}
            </p>

            <p className="ps">P.S. С меня свидание - и не одно. Место выбираешь ты.</p>

            <button type="button" className="close" onClick={closeLetter}>
              Свернуть письмо
            </button>
          </article>
        </div>
      )}
    </main>
  );
}
