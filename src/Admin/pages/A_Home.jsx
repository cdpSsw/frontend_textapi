import React, { useState, useEffect } from "react";
import Axios from "axios";

import ev1 from "../../DAssets/exposter/ev1.png";
import ev2 from "../../DAssets/exposter/ev2.png";
import ev3 from "../../DAssets/exposter/ev3.png";
import notFound from "../../DAssets/svg/NotFound.svg";

// Components
import Modal from "../../EComponents/Modal";

import api from '../../api';
const API_URL = import.meta.env.VITE_API_URL;

const A_Home = () => {
  // ------------------------------------- GET TEAM IMG --------------------------------------------
  const [selectedInfo, setSelectedInfo] = useState([]);
  const [selectedImage, setSelectedImage] = useState([]);

  const [teams, setTeam] = useState([]);
  // console.log("teams", teams);

  const handelGetAllTeam = async () => {
    try {
      // const res = await Axios.get(`${API_URL}/teams`, {
      const res = await api.get('/teams', {
        withCredentials: true,
      });

      setTeam(
        res.data.map((item) => {
          return {
            ...item,
            tels: (item.tel || "").split("/"),
            emails: (item.email || "").split("/"),
            websites: (item.website || "").split("/"),
            researchs: (item.research || "").split("/"),
            educations: (item.education || "").split("/"),
            expertises: (item.expertise || "").split("/"),
            expLocations: (item.explocation || "").split("/"),
            expPositions: (item.expposition || "").split("/"),
          };
        })
      );
    } catch (error) {
      console.error("Error fetching team data:", error);
    }
  };

  useEffect(() => {
    handelGetAllTeam();
  }, []);

  const [imagesTeam, setImagesTeam] = useState([]);
  // console.log(images);
  const handleGetImagesTeam = async () => {
    try {
      // const res = await Axios.get(`${API_URL}/teams/images`, {
      const res = await api.get('/teams/images', {
        withCredentials: true,
      });
      // console.log("res", res.data);

      if (res.status === 200) {
        setImagesTeam(res.data);
      } else {
        alert(`Error to get Showcase, for this id: ${id}`);
      }
    } catch (err) {
      alert(`Internal server ${err}`);
    }
  };

  useEffect(() => {
    handleGetImagesTeam();
  }, []);

  // ------------------------------------- GETTING/POSTING INFO --------------------------------------------

  // ... sub-menu
  const [openHeader, setOpenHeader] = useState(false);
  const [openHighlight, setOpenHighlight] = useState(false);
  const [openShowFiles, setOpenShowFiles] = useState(false);
  const [openShowTiktok, setOpenShowTiktok] = useState(false);
  const [openOurTeam, setOpenOurTeam] = useState(false);
  const [openContact, setOpenContact] = useState(false);

  // ... db-info
  const [headerInfo, setHeaderInfo] = useState([]);
  // console.log(headerInfo)
  const [highlightInfo, setHighlightInfo] = useState([]);
  const [showcaseInfo, setShowcaseInfo] = useState([]);
  const [showTiktokInfo, setShowTiktokInfo] = useState([]);
  // console.log(`showTiktokInfo: ${showTiktokInfo}`)
  const [ourTeamInfo, setOurTeamInfo] = useState([]);
  const [contactInfo, setContactInfo] = useState([]);

  const handleHeaderInfo = async () => {
    try {
      // const res = await Axios.get(`${API_URL}/info/header`);
      const res = await api.get('/info/header');
      if (res.status === 200) setHeaderInfo(res.data);
      else alert(`Get *Header Failed.`);
    } catch (err) {
      alert(`[Header] Internal server ${err}`);
    }
  };

  const handleHighlightInfo = async () => {
    try {
      // const res = await Axios.get(`${API_URL}/info/highlight`);
      const res = await api.get('/info/highlight');
      if (res.status === 200) setHighlightInfo(res.data);
      else alert(`Get *Highlight Failed.`);
    } catch (err) {
      alert(`[Highlight] Internal server ${err}`);
    }
  };

  const handleCaseInfo = async () => {
    try {
      // const res = await Axios.get(`${API_URL}/info/showcase`);
      const res = await api.get('/info/showcase');
      if (res.status === 200) setShowcaseInfo(res.data);
      else alert(`Get *Showcase Failed.`);
    } catch (err) {
      alert(`[Showcase] Internal server ${err}`);
    }
  };

  const handleTiktokInfo = async () => {
    try {
      // const res = await Axios.get(`${API_URL}/info/showTiktok`);
      const res = await api.get('/info/showTiktok');
      if (res.status === 200) setShowTiktokInfo(res.data);
      else alert(`Get *ShowTiktok Failed.`);
    } catch (err) {
      alert(`[ShowTiktok] Internal server ${err}`);
    }
  };

  const handleOurTeamInfo = async () => {
    try {
      // const res = await Axios.get(`${API_URL}/info/ourTeam`);
      const res = await api.get('/info/ourTeam');
      if (res.status === 200) setOurTeamInfo(res.data);
      else alert(`Get *Our Team Failed.`);
    } catch (err) {
      alert(`[Our Team] Internal server ${err}`);
    }
  };

  const handlContactInfo = async () => {
    try {
      // const res = await Axios.get(`${API_URL}/info/contact`);
      const res = await api.get('/info/contact');
      if (res.status === 200) setContactInfo(res.data);
      else alert(`Get *Contact Failed.`);
    } catch (err) {
      alert(`[Contact] Internal server ${err}`);
    }
  };

  useEffect(() => {
    handleHeaderInfo();
    handleHighlightInfo();
    handleCaseInfo();
    handleTiktokInfo();
    handleOurTeamInfo();
    handlContactInfo();
  }, []);

  // ... modal
  const [openModal, setOpenModal] = useState("");
  const [modalInfo, setModalInfo] = useState([]);

  const [modalHeaderInfo, setModalHeaderInfo] = useState([]);
  const [modalContactInfo, setModalContactInfo] = useState([]);

  // ... new-info
  // ------------- highlight
  const [newTopicHighlight, setNewTopicHighlight] = useState("");
  const [newDescHighlight, setNewDescHighlight] = useState("");

  const handlePostHighlightInfo = async () => {
    try {
      // const res = await Axios.post(`${API_URL}/info/highlight`, {
        const res = await api.post('/info/highlight', {
        topic: newTopicHighlight.trim() ? newTopicHighlight : modalInfo.topic,
        description: newDescHighlight.trim()
          ? newDescHighlight
          : modalInfo.description,
      });

      if (res.status === 200) {
        alert(`Post New *Highlight Information Successful.`);
        location.reload();
      } else alert(`Post *Highlight Failed.`);
    } catch (err) {
      alert(`[Highlight] Internal server ${err}`);
    }
  };

  // ------------- showcase
  const [newTopicCase, setNewTopicCase] = useState("");
  const [newDescCase, setNewDescCase] = useState("");

  const handlePostCaseInfo = async () => {
    try {
      // const res = await Axios.post(`${API_URL}/info/showcase`, {
        const res = await api.post('/info/showcase', {
        topic: newTopicCase.trim() ? newTopicCase : modalInfo.topic,
        description: newDescCase.trim() ? newDescCase : modalInfo.description,
      });

      if (res.status === 200) {
        alert(`Post New *Showcase Information Successful.`);
        location.reload();
      } else alert(`Post *Showcase Failed.`);
    } catch (err) {
      alert(`[Showcase] Internal server ${err}`);
    }
  };

  // ------------- showtiktok
  const [newTopicTiktok, setNewTopicTiktok] = useState("");
  const [newDescTiktok, setNewDescTiktok] = useState("");

  const handlePostTiktokInfo = async () => {
    try {
      // const res = await Axios.post(`${API_URL}/info/showTiktok`, {
        const res = await api.post('/info/showTiktok', {
        topic: newTopicTiktok.trim() ? newTopicTiktok : modalInfo.topic,
        description: newDescTiktok.trim()
          ? newDescTiktok
          : modalInfo.description,
      });

      if (res.status === 200) {
        alert(`Post New *ShowTiktok Information Successful.`);
        location.reload();
      } else alert(`Post *ShowTiktok Failed.`);
    } catch (err) {
      alert(`[ShowTiktok] Internal server ${err}`);
    }
  };

  // ------------- our Team
  const [newTopicOurTeam, setNewTopicOurTeam] = useState("");
  const [newDescOurTeam, setNewDescOurTeam] = useState("");

  const handlePostOurTeamInfo = async () => {
    try {
      // const res = await Axios.post(`${API_URL}/info/ourTeam`, {
        const res = await api.post('/info/ourTeam', {
        topic: newTopicOurTeam.trim() ? newTopicOurTeam : modalInfo.topic,
        description: newDescOurTeam.trim()
          ? newDescOurTeam
          : modalInfo.description,
      });

      if (res.status === 200) {
        alert(`Post New *Our Team Information Successful.`);
        location.reload();
      } else alert(`Post *Our Team Failed.`);
    } catch (err) {
      alert(`[Our Team] Internal server ${err}`);
    }
  };

  // ------------- header
  const [newTitleTH, setNewTitleTH] = useState("");
  const [newTitleEN, setNewTitleEN] = useState("");
  const [newHeaderDesc, setNewHeaderDesc] = useState("");
  const [newLinkApply, setNewLinkApply] = useState("");
  const [newLinkScholarship, setNewLinkScholarship] = useState("");

  const handlePostHeaderInfo = async () => {
    try {
      // const res = await Axios.post(`${API_URL}/info/header`, {
        const res = await api.post('/info/header', {
        title_th: newTitleTH.trim() ? newTitleTH : modalHeaderInfo.title_th,
        title_en: newTitleEN.trim() ? newTitleEN : modalHeaderInfo.title_en,
        description: newHeaderDesc.trim()
          ? newHeaderDesc
          : modalHeaderInfo.description,
        link_scholarship: newLinkApply.trim()
          ? newLinkApply
          : modalHeaderInfo.link_scholarship,
        link_apply_to_study: newLinkScholarship.trim()
          ? newLinkScholarship
          : modalHeaderInfo.link_apply_to_study,
      });

      if (res.status === 200) {
        alert(`Post New *Header Information Successful.`);
        location.reload();
      } else alert(`Post *Header Failed.`);
    } catch (err) {
      alert(`[Header] Internal server ${err}`);
    }
  };

  // ------------- contact
  const [newContactTopic, setNewContactTopic] = useState("");
  const [newContactDesc, setNewContactDesc] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newMobile, setNewMobile] = useState("");
  const [newAvailable, setNewAvailable] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const handlePostContactInfo = async () => {
    try {
      // const res = await Axios.post(`${API_URL}/info/contact`, {
        const res = await api.post('/info/contact', {
        topic: newContactTopic.trim() ? newContactTopic : modalContactInfo.topic,
        description: newContactDesc.trim()
          ? newContactDesc
          : modalContactInfo.description,
        address: newAddress.trim() ? newAddress : modalContactInfo.address,
        mobile: newMobile.trim() ? newMobile : modalContactInfo.mobile,
        available: newAvailable.trim() ? newAvailable : modalContactInfo.available,
        email: newEmail.trim() ? newEmail : modalContactInfo.email,
      });

      if (res.status === 200) {
        alert(`Post New *Contact Information Successful.`);
        location.reload();
      } else alert(`Post *Contact Failed.`);
      
    } catch (err) {
      console.error("Insert contact error:", err); // <-- เพิ่มตรงนี้
      res.status(500).send(`Internal server error: ${err.message}`);
    }
    
  };

  // ------------------------------------- SHOWCASE --------------------------------------------
  // GET *SELECTED SHOWCASE
  const [showcase, setShowcases] = useState([]);
  // console.log(showcase)

  const handleGetSelectedShowcase = async () => {
    try {
      // const res = await Axios.get(`${API_URL}/selectedShowcase`);
      const res = await api.get('/selectedShowcase')
      if (res.status === 200) {
        setShowcases(res.data);
      } else {
        alert(`Get Selected Showcase Failed.`);
      }
    } catch (err) {
      alert(`Internal server error ${err}`);
    }
  };

  useEffect(() => {
    handleGetSelectedShowcase();
  }, []);

  const [images, setImages] = useState([]);
  // console.log(images)
  const handleGetImages = async () => {
    try {
      // const res = await Axios.get(`${API_URL}/selectedShowcase/images`, {
        const res = await api.get('/selectedShowcase/images', {
        withCredentials: true,
      });
      // console.log("res", res.data);

      if (res.status === 200) {
        setImages(res.data);
      } else {
        alert(`Error to get Showcase, for this id: ${id}`);
      }
    } catch (err) {
      alert(`Internal server ${err}`);
    }
  };

  useEffect(() => {
    handleGetImages();
  }, []);

  // ------------------------------------- SHOWCASE --------------------------------------------

  // GET *SELECTED SHOWTIKTOK
  const [showTiktok, setShowTiktok] = useState([]);
  // console.log(showTiktok);

  const handleGetSelectedShowtiktok = async () => {
    try {
      // const res = await Axios.get(`${API_URL}/selectedShowTiktok`);
      const res = await api.get('/selectedShowTiktok')
      if (res.status === 200) {
        setShowTiktok(res.data);
      } else {
        alert(`Get Selected Showcase Failed.`);
      }
    } catch (err) {
      alert(`Internal server error ${err}`);
    }
  };

  useEffect(() => {
    handleGetSelectedShowtiktok();
  }, []);

  // Handle Cancel Button
  const handleCancel = () => {
    document.getElementById("topicCase").value = "";
    document.getElementById("descCase").value = "";
  };

  // Load Tiktok
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [showTiktok]);

  return (
    <main className="a-home-container">
      <article className="top-container">
        <h1 className="topic">
          Welcome to <strong>Admin</strong> Dashboard
        </h1>
      </article>
      <hr />

      <article className="content-container row m-0">
        <section className="left-side col-md-6">
          {headerInfo.map((headerInfo, idx) => (
            <section key={idx} className="header-container">
              <section className="top-container">
                <h1 className="topic">Header</h1>

                <section className="setting-container">
                  <i
                    className="bi bi-three-dots"
                    onClick={() => setOpenHeader(!openHeader)}
                  ></i>

                  {openHeader && (
                    <ul className="setting-items">
                      <li>
                        <button
                          data-bs-toggle="modal"
                          data-bs-target="#modal-edit-header"
                          onClick={() => setModalHeaderInfo(headerInfo)}
                        >
                          Edit Information
                        </button>
                      </li>
                    </ul>
                  )}
                </section>
              </section>
              <div className="hr"></div>

              <section className="info-container">
                <p className="title title_th">
                  Title (TH): <span>{headerInfo.title_th}</span>
                </p>
                <p className="title title_en">
                  Title (EN): <span>{headerInfo.title_en}</span>
                </p>
                <p className="desc">
                  Description: <span>{headerInfo.description}</span>
                </p>
                <hr />
                <p className="link">
                  Link Apply To Study:{" "}
                  <a href={headerInfo.link_apply_to_study} target="_blank">
                    {headerInfo.link_apply_to_study}
                  </a>
                </p>
                <p className="link">
                  Link Scholarship:{" "}
                  <a href={headerInfo.link_scholarship} target="_blank">
                    {headerInfo.link_scholarship}
                  </a>
                </p>
              </section>
            </section>
          ))}

          {highlightInfo.map((highlightInfo, idx) => (
            <section key={idx} className="highlight-container">
              <section className="top-container">
                <h1 className="topic">Highlight</h1>

                <section className="setting-container">
                  <i
                    className="bi bi-three-dots"
                    onClick={() => setOpenHighlight(!openHighlight)}
                  ></i>

                  {openHighlight && (
                    <ul className="setting-items">
                      <li>
                        <button
                          data-bs-toggle="modal"
                          data-bs-target="#modal-edit-highlight"
                          onClick={() => [
                            setOpenModal("modal-edit-highlight"),
                            setModalInfo(highlightInfo),
                          ]}
                        >
                          Edit Information
                        </button>
                      </li>
                    </ul>
                  )}
                </section>
              </section>
              <div className="hr"></div>

              <section className="info-container">
                <h1 className="topic">
                  Topic: <span>{highlightInfo.topic}</span>
                </h1>
                <p className="desc">
                  Description: <span>{highlightInfo.description}</span>
                </p>
              </section>
            </section>
          ))}

          <section className="ourTeam-container">
            {ourTeamInfo.map((ourTeamInfo, idx) => (
              <section key={idx}>
                <section className="top-container">
                  <h1 className="topic">Team</h1>

                  <section className="setting-container">
                    <i
                      className="bi bi-three-dots"
                      onClick={() => setOpenOurTeam(!openOurTeam)}
                    ></i>

                    {openOurTeam && (
                      <ul className="setting-items">
                        <li>
                          <button
                            data-bs-toggle="modal"
                            data-bs-target="#modal-edit-ourTeam"
                            onClick={() => [
                              setOpenModal("modal-edit-ourTeam"),
                              setModalInfo(ourTeamInfo),
                            ]}
                          >
                            Edit Information
                          </button>
                        </li>
                      </ul>
                    )}
                  </section>
                </section>
                <div className="hr"></div>

                <section className="info-container">
                  <h1 className="topic">
                    Topic: <span>{ourTeamInfo.topic}</span>
                  </h1>
                  <p className="desc">
                    Description: <span>{ourTeamInfo.description}</span>
                  </p>
                </section>
              </section>
            ))}

            <article className="content-container row m-0">
              {teams.length === 0 ? (
                <img
                  src={notFound}
                  alt="No showcase items found"
                  className="notFoundImg"
                />
              ) : (
                teams.map((team, idx) => {
                  const teamImages = imagesTeam.filter(
                    (img) => img.id === team.id
                  );

                  return (
                    <section key={idx} className="col-sm-12 col-md-6">
                      <section className="content-card">
                        {teamImages.length > 0 && (
                          <button
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#modal-preview"
                            className="content-img-btn"
                            onClick={() => [
                              setSelectedInfo(team),
                              setSelectedImage(teamImages[0]),
                            ]}
                          >
                            <img
                              key={team.id}
                              src={teamImages[0].image}
                              alt={`img-${teamImages[0].id}`}
                              className="content-img"
                            />
                          </button>
                        )}
                        <section className="text-container">
                          <p className="position">{team.position}</p>
                          <h6 className="name">{team.name}</h6>
                        </section>
                      </section>
                    </section>
                  );
                })
              )}
            </article>
          </section>

          {contactInfo.map((contactInfo, idx) => (
            <section key={idx} className="home-contact-container">
              <section className="top-container">
                <h1 className="topic">Contact</h1>

                <section className="setting-container">
                  <i
                    className="bi bi-three-dots"
                    onClick={() => setOpenContact(!openContact)}
                  ></i>

                  {openContact && (
                    <ul className="setting-items">
                      <li>
                        <button
                          data-bs-toggle="modal"
                          data-bs-target="#modal-edit-contact"
                          onClick={() => setModalContactInfo(contactInfo)}
                        >
                          Edit Information
                        </button>
                      </li>
                    </ul>
                  )}
                </section>
              </section>
              <div className="hr"></div>

              <section className="info-container">
                <p className="topic">
                  Topic: <span>{contactInfo.topic}</span>
                </p>
                <p className="desc">
                  Description: <span>{contactInfo.description}</span>
                </p>
                <hr />
                <article className="contact-box-container row">
                  {/* Location */}
                  <section className="col-lg-5 contact-box address">
                    <i className="bi bi-geo-alt-fill"></i>
                    <div className="text-container">
                      <h5 className="title-box">Address</h5>
                      <p className="desc-box">{contactInfo.address}</p>
                    </div>
                  </section>

                  {/* mobile */}
                  <section className="col-lg-5 contact-box mobile">
                    <i className="bi bi-telephone-fill"></i>
                    <div className="text-container">
                      <h5 className="title-box">Mobile</h5>
                      <p className="desc-box">{contactInfo.mobile}</p>
                    </div>
                  </section>

                  {/* availability */}
                  <section className="col-lg-5 contact-box mobile">
                    <i className="bi bi-clock-fill"></i>
                    <div className="text-container">
                      <h5 className="title-box">Availability</h5>
                      <p className="desc-box">{contactInfo.available}</p>
                    </div>
                  </section>

                  {/* email */}
                  <section className="col-lg-5 contact-box mobile">
                    <i className="bi bi-envelope-fill"></i>
                    <div className="text-container">
                      <h5 className="title-box">Email</h5>
                      <p className="desc-box">{contactInfo.email}</p>
                    </div>
                  </section>
                </article>
              </section>
            </section>
          ))}
        </section>

        <section className="right-side col-md-6">
          {showcaseInfo.map((showcaseInfo, idx) => (
            <section key={idx} className="showcase-files-container">
              <section className="top-container">
                <h1 className="topic">Showcase (Files) Managemnet </h1>

                <section className="setting-container">
                  <i
                    className="bi bi-three-dots"
                    onClick={() => setOpenShowFiles(!openShowFiles)}
                  ></i>

                  {openShowFiles && (
                    <ul className="setting-items">
                      <li>
                        <button
                          data-bs-toggle="modal"
                          data-bs-target="#modal-edit-showcase"
                          onClick={() => [
                            setOpenModal("modal-edit-showcase"),
                            setModalInfo(showcaseInfo),
                          ]}
                        >
                          Edit Information
                        </button>
                      </li>
                    </ul>
                  )}
                </section>
              </section>
              <div className="hr"></div>

              <section className="info-container">
                <h1 className="topic">
                  Topic: <span>{showcaseInfo.topic}</span>
                </h1>
                <p className="desc">
                  Description: <span>{showcaseInfo.description}</span>
                </p>
              </section>

              <section className="showcase-container row m-0">
                {showcase.length === 0 ? (
                  <img
                    src={notFound}
                    alt="No showcase items found"
                    className="notFoundImg-home"
                  />
                ) : (
                  showcase.map((showcaseItem, idx) => {
                    const showcaaseImages = images.filter(
                      (img) => img.id === showcaseItem.id
                    );
                    return (
                      <section key={idx} className="col-sm-12 col-md-6">
                        <section className="showcase-card">
                          {showcaaseImages.length > 0 && (
                            <img
                              key={showcaseItem.id}
                              src={showcaaseImages[0].image}
                              alt={`img-${showcaaseImages[0].id}`}
                              className="showcase-image"
                            />
                          )}
                          <section className="text-container">
                            {showcaseItem.status === "Approved" ? (
                              <span
                                className={`status
                                  ${
                                    showcaseItem.status === "Approved"
                                      ? "Approved"
                                      : ""
                                  }
                                `}
                              >
                                <i className="bi bi-check-circle-fill"></i>
                                {showcaseItem.status}
                              </span>
                            ) : (
                              <span
                                className={`status
                                  ${
                                    showcaseItem.status === "Waiting"
                                      ? "Waiting"
                                      : ""
                                  }
                                `}
                                data-bs-toggle="modal"
                                data-bs-target="#modal-approve"
                                onClick={() => setApproveItem(showcaseItem)}
                              >
                                <i className="bi bi-clock-fill"></i>
                                {showcaseItem.status}
                              </span>
                            )}

                            <section>
                              <p className="id">
                                Student ID: {showcaseItem.studentID}
                              </p>
                              <h1 className="topic">{showcaseItem.topic}</h1>
                              <p className="desc">{showcaseItem.description}</p>
                            </section>
                          </section>
                        </section>
                      </section>
                    );
                  })
                )}
              </section>
            </section>
          ))}

          {showTiktokInfo.map((showtiktokInfo, idx) => (
            <section key={idx} className="showtiktok-files-container">
              <section className="top-container">
                <h1 className="topic">Showcase (Files) Managemnet </h1>
                <section className="setting-container">
                  <i
                    className="bi bi-three-dots"
                    onClick={() => setOpenShowTiktok(!openShowTiktok)}
                  ></i>

                  {openShowTiktok && (
                    <ul className="setting-items">
                      <li>
                        <button
                          data-bs-toggle="modal"
                          data-bs-target="#modal-edit-showtiktok"
                          onClick={() => [
                            setOpenModal("modal-edit-showtiktok"),
                            setModalInfo(showtiktokInfo),
                          ]}
                        >
                          Edit Information
                        </button>
                      </li>
                    </ul>
                  )}
                </section>
              </section>
              <div className="hr"></div>

              <section className="info-container">
                <h1 className="topic">
                  Topic: <span>{showtiktokInfo.topic}</span>
                </h1>
                <p className="desc">
                  Description: <span>{showtiktokInfo.description}</span>
                </p>
              </section>

              <section className="showtiktok-container row m-0">
                {showTiktok.length === 0 ? (
                  <img
                    src={notFound}
                    alt="No showTiktok items found"
                    className="notFoundImg-home"
                  />
                ) : (
                  showTiktok.map((showTiktokItem, idx) => (
                    <section key={idx} className="col-lg-12">
                      <section className="showtiktok-card">
                        <section
                          className="content-tiktok"
                          key={idx}
                          dangerouslySetInnerHTML={{
                            __html: showTiktokItem.embed,
                          }}
                        />

                        <section className="text-container">
                          {showTiktokItem.status === "Approved" ? (
                            <span
                              className={`status
                                    ${
                                      showTiktokItem.status === "Approved"
                                        ? "Approved"
                                        : ""
                                    }
                                  `}
                            >
                              <i className="bi bi-check-circle-fill"></i>
                              {showTiktokItem.status}
                            </span>
                          ) : (
                            <span
                              className={`status
                                    ${
                                      showTiktokItem.status === "Waiting"
                                        ? "Waiting"
                                        : ""
                                    }
                                  `}
                              data-bs-toggle="modal"
                              data-bs-target="#modal-approve"
                              onClick={() => setApproveItem(showTiktokItem)}
                            >
                              <i className="bi bi-clock-fill"></i>
                              {showTiktokItem.status}
                            </span>
                          )}

                          <section>
                            <p className="id">
                              Student ID: {showTiktokItem.studentID}
                            </p>
                            <h1 className="topic">{showTiktokItem.topic}</h1>
                            <p className="desc">{showTiktokItem.description}</p>
                          </section>
                        </section>
                      </section>
                    </section>
                  ))
                )}
              </section>
            </section>
          ))}
        </section>
      </article>

      {/*  */}
      <Modal
        modalID={openModal}
        modalHeaderStyle="d-none"
        modalFooterStyle="d-none"
        modalBodyContent={
          <form className="a-home-form">
            <h1 className="topic">Edit Information</h1>

            <div className="input-box">
              <label htmlFor="topicCase" className="form-label mb-2">
                * Topic
              </label>
              <input
                type="text"
                name="topicCase"
                id="topicCase"
                placeholder={modalInfo.topic}
                className="form-control mb-3"
                onChange={(e) =>
                  openModal === "modal-edit-showcase"
                    ? setNewTopicCase(e.target.value)
                    : openModal === "modal-edit-showtiktok"
                    ? setNewTopicTiktok(e.target.value)
                    : openModal === "modal-edit-highlight"
                    ? setNewTopicHighlight(e.target.value)
                    : openModal === "modal-edit-ourTeam"
                    ? setNewTopicOurTeam(e.target.value)
                    : null
                }
              />
            </div>

            <div className="input-box">
              <label htmlFor="descCase" className="form-label mb-2">
                * Description
              </label>
              <textarea
                type="text"
                name="descCase"
                id="descCase"
                placeholder={modalInfo.description}
                className="form-control mb-3"
                onChange={(e) =>
                  openModal === "modal-edit-showcase"
                    ? setNewDescCase(e.target.value)
                    : openModal === "modal-edit-showtiktok"
                    ? setNewDescTiktok(e.target.value)
                    : openModal === "modal-edit-highlight"
                    ? setNewDescHighlight(e.target.value)
                    : openModal === "modal-edit-ourTeam"
                    ? setNewDescOurTeam(e.target.value)
                    : null
                }
              ></textarea>
            </div>

            <section className="btn-container">
              <button
                data-bs-dismiss="modal"
                className="btn btn-cancel"
                onClick={handleCancel}
              >
                Cancel
              </button>

              <button
                type="button"
                className="btn btn-update"
                onClick={
                  openModal === "modal-edit-showcase"
                    ? handlePostCaseInfo
                    : openModal === "modal-edit-showtiktok"
                    ? handlePostTiktokInfo
                    : openModal === "modal-edit-highlight"
                    ? handlePostHighlightInfo
                    : openModal === "modal-edit-ourTeam"
                    ? handlePostOurTeamInfo
                    : null
                }
              >
                Update
              </button>
            </section>
          </form>
        }
      />

      {/* Modal - Header */}
      <Modal
        modalID="modal-edit-header"
        modalHeaderStyle="d-none"
        modalFooterStyle="d-none"
        modalBodyContent={
          <form className="a-home-form">
            <h1 className="topic">Edit Information</h1>

            <div className="input-box">
              <label htmlFor="titleTH" className="form-label mb-2">
                * Title (TH)
              </label>
              <input
                type="text"
                name="titleTH"
                id="titleTH"
                placeholder={modalHeaderInfo.title_th}
                className="form-control mb-3"
                onChange={(e) => setNewTitleTH(e.target.value)}
              />
            </div>

            <div className="input-box">
              <label htmlFor="titleEN" className="form-label mb-2">
                * Title (EN)
              </label>
              <input
                type="text"
                name="titleEN"
                id="titleEN"
                placeholder={modalHeaderInfo.title_en}
                className="form-control mb-3"
                onChange={(e) => setNewTitleEN(e.target.value)}
              />
            </div>

            <div className="input-box">
              <label htmlFor="headerDesc" className="form-label mb-2">
                * Description
              </label>
              <textarea
                type="text"
                name="headerDesc"
                id="headerDesc"
                placeholder={modalHeaderInfo.description}
                className="form-control mb-3"
                onChange={(e) => setNewHeaderDesc(e.target.value)}
              ></textarea>
            </div>

            <div className="input-box">
              <label htmlFor="linkApply" className="form-label mb-2">
                * Link Apply To Study
              </label>
              <input
                type="text"
                name="linkApply"
                id="linkApply"
                placeholder={modalHeaderInfo.link_apply_to_study}
                className="form-control mb-3"
                onChange={(e) => setNewLinkApply(e.target.value)}
              />
            </div>

            <div className="input-box">
              <label htmlFor="linkScholarship" className="form-label mb-2">
                * Link Scholarship
              </label>
              <input
                type="text"
                name="linkScholarship"
                id="linkScholarship"
                placeholder={modalHeaderInfo.link_scholarship}
                className="form-control mb-3"
                onChange={(e) => setNewLinkScholarship(e.target.value)}
              />
            </div>

            <section className="btn-container">
              <button
                data-bs-dismiss="modal"
                className="btn btn-cancel"
                onClick={handleCancel}
              >
                Cancel
              </button>

              <button
                type="button"
                className="btn btn-update"
                onClick={handlePostHeaderInfo}
              >
                Update
              </button>
            </section>
          </form>
        }
      />

      {/* Modal - Contact */}
      <Modal
        modalID="modal-edit-contact"
        modalHeaderStyle="d-none"
        modalFooterStyle="d-none"
        modalBodyContent={
          <form className="a-home-form">
            <h1 className="topic">Edit Information</h1>

            <div className="input-box">
              <label htmlFor="contactTopic" className="form-label mb-2">
                * Topic
              </label>
              <input
                type="text"
                name="contactTopic"
                id="contactTopic"
                placeholder={modalContactInfo.topic}
                className="form-control mb-3"
                onChange={(e) => setNewContactTopic(e.target.value)}
              />
            </div>

            <div className="input-box">
              <label htmlFor="contactDesc" className="form-label mb-2">
                * Description
              </label>
              <textarea
                type="text"
                name="contactDesc"
                id="contactDesc"
                placeholder={modalContactInfo.description}
                className="form-control mb-3"
                onChange={(e) => setNewContactDesc(e.target.value)}
              ></textarea>
            </div>

            <div className="input-box">
              <label htmlFor="contactAddress" className="form-label mb-2">
                * Address
              </label>
              <input
                type="text"
                name="contactAddress"
                id="contactAddress"
                placeholder={modalContactInfo.address}
                className="form-control mb-3"
                onChange={(e) => setNewAddress(e.target.value)}
              />
            </div>

            <div className="input-box">
              <label htmlFor="contactMobile" className="form-label mb-2">
                * Mobile
              </label>
              <input
                type="text"
                name="contactMobile"
                id="contactMobile"
                placeholder={`0${modalContactInfo.mobile}`}
                className="form-control mb-3"
                onChange={(e) => setNewMobile(e.target.value)}
              />
            </div>

            <div className="input-box">
              <label htmlFor="contactAvailable" className="form-label mb-2">
                * Available
              </label>
              <input
                type="text"
                name="contactAvailable"
                id="contactAvailable"
                placeholder={modalContactInfo.available}
                className="form-control mb-3"
                onChange={(e) => setNewAvailable(e.target.value)}
              />
            </div>

            <div className="input-box">
              <label htmlFor="contactEmail" className="form-label mb-2">
                * Email
              </label>
              <input
                type="email"
                name="contactEmail"
                id="contactEmail"
                placeholder={modalContactInfo.email}
                className="form-control mb-3"
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </div>

            <section className="btn-container">
              <button
                data-bs-dismiss="modal"
                className="btn btn-cancel"
                onClick={handleCancel}
              >
                Cancel
              </button>

              <button
                type="button"
                className="btn btn-update"
                onClick={handlePostContactInfo}
              >
                Update
              </button>
            </section>
          </form>
        }
      />

      {/* Modal - Preview Info */}
      <Modal
        modalID="modal-preview"
        modalHeaderStyle="preview-topic-container"
        modalTitleStyle="preview-topic"
        modalTitle={"Information"}
        modalFooterStyle="d-none"
        modalSize="modal-lg"
        modalBodyContent={
          <article className="preview-info-container">
            <img
              src={selectedImage.image}
              alt={selectedInfo.name}
              className="content-img"
            />
            <p className="position">{selectedInfo.position}</p>
            <h6 className="name">{selectedInfo.name}</h6>

            <h6 className="edu-topic">วุฒิการศึกษา: </h6>
            {Array.isArray(selectedInfo.educations) ? (
              selectedInfo.educations.map((edu, idx) => (
                <p key={idx} className="edu">
                  {edu}
                </p>
              ))
            ) : (
              <p className="edu">{selectedInfo.educations}</p>
            )}

            {Array.isArray(selectedInfo.expertises) &&
              selectedInfo.expertises.length !== 0 && (
                <ol className="expt-list">
                  <h6 className="expt-topic">ความถนัด:</h6>
                  {selectedInfo.expertises.map((expt, idx) => (
                    <li key={idx} className="expt">
                      {expt}
                    </li>
                  ))}
                </ol>
              )}

            {Array.isArray(selectedInfo.expLocations) &&
              selectedInfo.expLocations.length !== 0 &&
              Array.isArray(selectedInfo.expPositions) &&
              selectedInfo.expPositions.length !== 0 && (
                <>
                  <h6 className="exp-topic">ประสบการณ์:</h6>
                  {selectedInfo.expLocations.map((expLocat, idx) => (
                    <section key={idx}>
                      <p className="exp m-0">{expLocat}</p>
                      <p className="exp">{selectedInfo.expPositions[idx]}</p>
                    </section>
                  ))}
                </>
              )}

            {Array.isArray(selectedInfo.researchs) &&
              selectedInfo.researchs.length !== 0 && (
                <>
                  <h6 className="res-topic">ผลงานวิจัย:</h6>
                  {selectedInfo.researchs.map((res, idx) => (
                    <p key={idx} className="res">
                      {res}
                    </p>
                  ))}
                </>
              )}

            <p className="tels">tels: {selectedInfo.tels}</p>
            {Array.isArray(selectedInfo.emails) &&
            selectedInfo.emails.length > 1 ? (
              <>
                <p className="emails">emails: {selectedInfo.emails[0]}</p>
                <p className="emails">emails: {selectedInfo.emails[1]}</p>
              </>
            ) : (
              <p className="emails">
                emails:{" "}
                {Array.isArray(selectedInfo.emails)
                  ? selectedInfo.emails[0]
                  : selectedInfo.emails}
              </p>
            )}
            <p className="websites">websites: {selectedInfo.websites}</p>
          </article>
        }
      />
    </main>
  );
};

export default A_Home;
