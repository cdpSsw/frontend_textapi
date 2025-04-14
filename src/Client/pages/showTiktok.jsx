import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
// import notFound from "../../assets/images/page-not-found.svg";

import api from '../../api';

const showTiktok = () => {
  // Get *Approved Showcase
  const [showTiktok, setShowcase] = useState([]);
  // console.log(showTiktok);

  const handleShowTiktok = async () => {
    try {
      const res = await api.get(`/studentShowTiktok/approved`, {
        withCredentials: true,
      });

      if (res.status === 200) {
        setShowcase(res.data);
      } else {
        alert(`Get Approved Showcase failed.`);
      }
    } catch (err) {
      alert(`Internal server error: ${err.message}`);
    }
  };

  useEffect(() => {
    document.title = "Showcase (Tiktok) | Comen - SPU";
    handleShowTiktok();
    const script = document.createElement("script");
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const [showTiktok_info, setShowTiktokInfo] = useState([]);
  const handleTiktokInfo = async () => {
    try {
      const res = await api.get(`/info/showTiktok`);
      if (res.status === 200) setShowTiktokInfo(res.data);
      else alert(`Get *ShowTiktok Failed.`);
    } catch (err) {
      alert(`[ShowTiktok] Internal server ${err}`);
    }
  };

  useEffect(() => {
    handleTiktokInfo();
  }, []);

  return (
    <main className="user-showtiktok-container">
      <article className="top-container">
        {showTiktok_info.map((showTiktok_infoItem, idx) => (
          <section key={idx}>
            <h1 className="topic">{showTiktok_infoItem.topic}</h1>
            <p className="desc">{showTiktok_infoItem.description}</p>
          </section>
        ))}
      </article>

      {showTiktok.length == 0 ? (
        <section className="not-found-container">
          {/* <img src={notFound} className="svg-not-found" /> */}
        </section>
      ) : (
        <article className="content-container row m-0">
          {showTiktok.map((showTiktokItem, idx) => (
            <section className="content-card-container col-sm-12 col-md-4">
              <section className="content-card">
                <section
                  className="content-tiktok"
                  key={idx}
                  dangerouslySetInnerHTML={{ __html: showTiktokItem.embed }}
                />
                <section className="text-container">
                  <p className="id">{showTiktokItem.studentID}</p>
                  <h1 className="topic">{showTiktokItem.topic}</h1>
                </section>
              </section>
            </section>
          ))}
        </article>
      )}
      <Footer />
    </main>
  );
};

export default showTiktok;
