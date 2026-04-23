import React, { useEffect, useRef } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Typewriter from "typewriter-effect";
import { introdata, meta } from "../../content_option";
import { Link } from "react-router-dom";
import CloudField from "./CloudField";

export const Home = () => {
  const homeRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!homeRef.current) return;
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;

      homeRef.current.style.setProperty("--mouse-x", x.toFixed(3));
      homeRef.current.style.setProperty("--mouse-y", y.toFixed(3));
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <HelmetProvider>
      <section id="home" className="home" ref={homeRef}>
        <Helmet>
          <meta charSet="utf-8" />
          <title> {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>

        <div className="background-container">
          <div className="moon">
            <div className="light"></div>
            <div className="texture"></div>
            <div className="sphere"></div>
          </div>
          <div className="stars"></div>
          <div className="twinkling"></div>
          <CloudField />
          <div className="moon-background"></div>
          <div className="sphere">
            {Array.from({ length: 36 }, (_, i) => (
              <div key={i} className={`ring${i + 1}`}></div>
            ))}
          </div>
        </div>

        <div className="intro_sec d-flex align-items-center justify-content-center text-center">
          <div className="text">
            <div className="align-self-center">
              <div className="intro mx-auto">
                <h2 className="mb-1x display-4">{introdata.title}</h2>
                <h1 className="fluidz-48 mb-1x display-1">
                  <Typewriter
                    options={{
                      strings: [
                        introdata.animated.first,
                        introdata.animated.second,
                        introdata.animated.third,
                      ],
                      autoStart: true,
                      loop: true,
                      deleteSpeed: 10,
                    }}
                  />
                </h1>
                <p className="mb-1x lead">{introdata.description}</p>
                <div className="intro_btn-action pb-5">
                  <Link to="/portfolio" className="text_2">
                    <div id="button_p" className="ac_btn btn btn-lg">
                      My Portfolio
                      <div className="ring one"></div>
                      <div className="ring two"></div>
                      <div className="ring three"></div>
                    </div>
                  </Link>
                  <Link to="/contact">
                    <div id="button_h" className="ac_btn btn btn-lg">
                      Contact Me
                      <div className="ring one"></div>
                      <div className="ring two"></div>
                      <div className="ring three"></div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </HelmetProvider>
  );
};
