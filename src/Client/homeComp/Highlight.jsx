import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

import api from '../../api';

const Highlight = () => {
  const conRef = useRef(null);
  const [highlight_info, setHighlightInfo] = useState([]);

  const handleHighlightInfo = async () => {
    try {
      const res = await api.get(`/info/highlight`);
      if (res.status === 200) setHighlightInfo(res.data);
      else alert(`Get *Highlight Failed.`);
    } catch (err) {
      alert(`[Highlight] Internal server ${err}`);
    }
  };

  useEffect(() => {
    handleHighlightInfo();
  }, []);

  useEffect(() => {
    if (highlight_info.length > 0) {
      gsap.timeline({
        scrollTrigger: {
          trigger: conRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: 1,
        },
      })
      .fromTo(
        gsap.utils.toArray(".gsap-topic"),
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.2 }
      );
    }
  }, [highlight_info]); // ✅ รอให้ข้อมูลโหลดก่อนถึง animate

  return (
    <main ref={conRef} className="highlight-container">
      <div className="hr"></div>
      {highlight_info.map((highlight, idx) => (
        <article key={idx} className="highlight-box">
          <section className="topic-container">
            <h1 className="topic gsap-topic">{highlight.topic}</h1>
          </section>

          <section className="desc-container">
            <p className="desc">{highlight.description}</p>
          </section>

          <span className="box-type">
            <h5 className="hashtag">#</h5>
            <h5 className="type">{highlight.type}</h5>
          </span>
        </article>
      ))}
    </main>
  );
};

export default Highlight;
