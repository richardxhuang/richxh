import React from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Typewriter from "typewriter-effect";
import { introdata, meta } from "../../content_option";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <HelmetProvider>
      <section id="home" className="home">
        <Helmet>
          <meta charSet="utf-8" />
          <title> {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>

        <div className="background-container">
          <div class="moon">
            <div class="light"></div>
            <div class="texture"></div>
            <div class="sphere"></div>
          </div>
          <div className="stars"></div>
          <div className="twinkling"></div>
          <div className="clouds"></div>
          <div class="moon-background"></div>
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
