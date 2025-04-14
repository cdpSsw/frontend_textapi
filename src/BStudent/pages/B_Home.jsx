import React, { useState, useEffect } from "react";

import ev1 from "../../DAssets/exposter/ev1.png";
import ev2 from "../../DAssets/exposter/ev2.png";
import ev3 from "../../DAssets/exposter/ev3.png";
import notFound from "../../DAssets/svg/NotFound.svg";

// Components
import Modal from "../../EComponents/Modal";
import ModalDel from "../../EComponents/ModalDel";

import api from '../../api';

const B_Home = ({ id }) => {
  // Overlay
  const [selectedImg, setSelectedImg] = useState("");

  // -------------------------------------------------------------- GET -------------------------------------------------
  // GET ALL *SHOWCASE
  const [showcase, setShowcase] = useState([]);
  const handleGetShowcase = async () => {
    try {
      const res = await api.get(`/studentShowcase/${id}`, {
        withCredentials: true,
      });

      if (res.status === 200) {
        setShowcase(res.data);
      } else {
        alert(`Error to get Showcase, for this id: ${id}`);
      }
    } catch (err) {
      alert(`Internal server ${err}`);
    }
  };

  useEffect(() => {
    document.title = "Showcase (Files) | Admin";
    handleGetShowcase();
  }, []);

  const [images, setImages] = useState([]);
  // console.log(images)
  const handleGetImages = async () => {
    try {
      const res = await api.get(`/studentShowcase/images`, {
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

  // -------------------------------------------------------------- POST -------------------------------------------------
  // POST NEW *SHOWCASE
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState();

  const handlePostShowcase = async () => {
    try {
      const formData = new FormData();
      formData.append("studentID", id);
      formData.append("topic", topic);
      formData.append("description", description);
      formData.append("image", image);

      const res = await api.post(`/studentShowcase`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.status === 200) {
        alert(`Add New Showcase Succesful.`);
        location.reload();
      } else {
        alert(`Error to get Showcase, for this id: ${id}`);
        location.reload();
      }
    } catch (err) {
      alert(`Internal server ${err}`);
    }
  };

  // ... handleImg
  const handleImg = (e) => {
    setImage(e);
    setPreviewImage(URL.createObjectURL(e));
  };

  // -------------------------------------------------------------- PUT -------------------------------------------------
  // PUT *SHOWCASE
  const [oldInfo, setOldInfo] = useState([]);
  const [oldImage, setOldImage] = useState([]);
  const [newTopic, setNewTopic] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newImage, setNewImage] = useState();
  const [newPreviewImage, setNewPreviewImage] = useState();

  const handlePutShowcase = async () => {
    try {
      // ตรวจสอบค่าที่ได้จากการกรอกข้อมูล
      const updatedTopic = newTopic.trim() ? newTopic : oldInfo.topic;
      const updatedDescription = newDescription.trim()
        ? newDescription
        : oldInfo.description;
      const updatedImage = newImage ? newImage : oldInfo.image;

      const formData = new FormData();
      formData.append("topic", updatedTopic);
      formData.append("description", updatedDescription);
      formData.append("image", updatedImage);

      const res = await api.put(
        `/studentShowcase/${oldInfo.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        alert(`Update Showcase Successful.`);
        location.reload();
      } else {
        alert(`Error to Update Showcase, for this id: ${oldInfo.id}`);
        location.reload();
      }
    } catch (err) {
      alert(`Internal server error: ${err}`);
    }
  };

  // ... handleImg
  const handleNewImg = (e) => {
    setNewImage(e);
    setNewPreviewImage(URL.createObjectURL(e));
  };

  // DELETE *SHOWCASE
  const [delInfo, setDelInfo] = useState([]);

  // ------------------------------------- SHOWTikTok --------------------------------------------
  // const showTiktok = [
  //   {
  //     id: 1,
  //     studentID: "64053441",
  //     topic: "Ex Topic #1 ",
  //     description: "Description Support Topic",
  //     embed:
  //       '<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@impeanuts/video/7477057682168384786" data-video-id="7477057682168384786" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@impeanuts" href="https://www.tiktok.com/@impeanuts?refer=embed">@impeanuts</a> เด็กคอมรัน  เขียนโค้ด ❌ แก้โค้ด ✅ <a title="spu" target="_blank" href="https://www.tiktok.com/tag/spu?refer=embed">#spu</a> <a title="fyp" target="_blank" href="https://www.tiktok.com/tag/fyp?refer=embed">#fyp</a> <a target="_blank" title="♬ original sound - sp99d.s0ngs" href="https://www.tiktok.com/music/original-sound-7071809975861005099?refer=embed">♬ original sound - sp99d.s0ngs</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>',
  //     status: "Approved",
  //   },
  //   {
  //     id: 2,
  //     studentID: "64053441",
  //     topic: "Ex Topic #2 ",
  //     description: "Description Support Topic",
  //     embed:
  //       '<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@bunniebinie/video/7477156937201782024" data-video-id="7477156937201782024" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@bunniebinie" href="https://www.tiktok.com/@bunniebinie?refer=embed">@bunniebinie</a> <a title="cpe" target="_blank" href="https://www.tiktok.com/tag/cpe?refer=embed">#CPE</a> <a title="it_spu" target="_blank" href="https://www.tiktok.com/tag/it_spu?refer=embed">#it_spu</a> <a title="spu" target="_blank" href="https://www.tiktok.com/tag/spu?refer=embed">#spu</a> <a target="_blank" title="♬ original sound - Hellomello - Hellomellooo" href="https://www.tiktok.com/music/original-sound-Hellomello-7477157015078308624?refer=embed">♬ original sound - Hellomello - Hellomellooo</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>',
  //     status: "Approved",
  //   },
  //   {
  //     id: 3,
  //     studentID: "64053441",
  //     topic: "Ex Topic #1 ",
  //     description: "Description Support Topic",
  //     embed:
  //       '<blockquote class="tiktok-embed" cite="https://www.tiktok.com/@sripatum.spu/video/7368684229170957576" data-video-id="7368684229170957576" style="max-width: 605px;min-width: 325px;" > <section> <a target="_blank" title="@sripatum.spu" href="https://www.tiktok.com/@sripatum.spu?refer=embed">@sripatum.spu</a> <p>สาย IT ต้องห้ามพลาด‼️ คณะเทคโนฯ มัดรวมความรู้ จัดเต็มอัดแน่นมาให้น้องๆ แล้วว ถ้าเรื่อง IT มันใช่ มาสมัครเป็น DEK IT SPU ได้เลย #คณะเทคโนโลยีสารสนเทศ #มหาวิทยาลัยศรีปทุม #SPU #SripatumUniversity #Dek67 #TCAS67 #TGAT67 #TPAT67</p> <a target="_blank" title="♬ เสียงต้นฉบับ  - Sripatum University SPU" href="https://www.tiktok.com/music/เสียงต้นฉบับ-Sripatum-University-SPU-7368684324280896257?refer=embed">♬ เสียงต้นฉบับ  - Sripatum University SPU</a> </section> </blockquote> <script async src="https://www.tiktok.com/embed.js"></script>',
  //     status: "Waiting",
  //   },
  // ];

  // Get *ShowTiktok
  const [showTiktok, setShowTiktok] = useState([]);
  const handleShowTiktok = async () => {
    try {
      const res = await api.get(`/studentShowTiktok/${id}`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setShowTiktok(res.data);
      } else {
        alert(`Error to get *ShowTiktok, [Check/Log]`);
        return;
      }
    } catch (err) {
      alert(`Internal server ${err.message}`);
    }
  };

  useEffect(() => {
    document.title = "Showcase (Tiktok) | Admin";
    handleShowTiktok();
  }, []);

  // Post *ShowTiktok
  const [topicTT, setTopicTT] = useState("");
  const [embed, setEmbed] = useState("");

  const handlePostshowTiktok = async () => {
    try {
      const formData = new FormData();
      formData.append("studentID", id);
      formData.append("topic", topicTT);
      formData.append("embed", embed);

      const res = await api.post(`/studentshowTiktok`, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.status === 200) {
        alert(`Add New showTiktok Succesful.`);
        location.reload();
      } else {
        alert(`Error to get showTiktok, for this id: ${id}`);
        location.reload();
      }
    } catch (err) {
      alert(`Internal server ${err}`);
    }
  };

  // Put *Showcase
  const [oldShowTiktok, setOldShowTiktok] = useState([]);
  const [newTopicTT, setNewTopicTT] = useState("");
  const [newEmbed, setNewEmbed] = useState("");

  const handleUpdateShowTiktok = async () => {
    try {
      const updatedTopic = newTopicTT.trim() ? newTopicTT : oldShowTiktok.topic;
      const updatedEmbed = newEmbed.trim() ? newEmbed : oldShowTiktok.embed;

      const res = await api.put(
        `/studentShowTiktok/${oldShowTiktok.id}`,
        { topic: updatedTopic, embed: updatedEmbed },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        alert(`Edit Showcase (id: ${oldShowTiktok.id}) Successful.`);
        location.reload();
      } else {
        alert(`Error to get *Showcase, [Check/Log]`);
        return;
      }
    } catch (err) {
      alert(`Internal server ${err.message}`);
    }
  };

  // ---------------------------------------------------------------------------------------------------
  // Handle Cancel Button
  const handleClosedModal = () => {
    document.getElementById("studentID").value = "";
    document.getElementById("topic").value = "";
    document.getElementById("description").value = "";
    document.getElementById("image").value = "";
    document.getElementById("topic-tiktok").value = "";
    document.getElementById("embed-tiktok").value = "";
    document.getElementById("new-topic-tiktok").value = "";
    document.getElementById("new-embed-tiktok").value = "";
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
    <main className="stu-home-container">
      <h1 className="topic">Hi, {id}</h1>

      {/* ----------------------------------------- SHOWCASE ------------------------------------------------------------- */}
      <article className="content-container">
        <article className="showcase-container row m-0">
          <section className="top-container">
            <h1 className="topic">Showcase (Files) Management</h1>

            <section className="btn-container">
              <button
                data-bs-toggle="modal"
                data-bs-target="#modal-add-new"
                className="btn btn-add-new"
              >
                Add New
              </button>
            </section>
          </section>

          <hr />
          {showcase.length === 0 ? (
            <img
              src={notFound}
              alt="No showcase items found"
              className="notFoundImg-home"
            />
          ) : (
            showcase
              .slice()
              .reverse(0, 4)
              .map((showcaseItem, idx) => {
                const showcaaseImages = images.filter(
                  (img) => img.id === showcaseItem.id
                );
                if (idx <= 3) {
                  return (
                    <section className="col-sm-6 col-md-3" key={idx}>
                      <section className="showcase-card">
                        {showcaaseImages.length > 0 && (
                          <img
                            key={showcaseItem.id}
                            src={showcaaseImages[0].image}
                            alt={`img-${showcaaseImages[0].id}`}
                            className="showcase-img"
                            onClick={() => setSelectedImg(showcaaseImages[0])}
                          />
                        )}
                        <section className="text-container">
                          {showcaseItem.status === "Approved" ? (
                            <span
                              className={`status
                          ${
                            showcaseItem.status === "Approved" ? "Approved" : ""
                          }
                        `}
                            >
                              <i className="bi bi-check-circle-fill"></i>
                              {showcaseItem.status}
                            </span>
                          ) : (
                            <span
                              className={`status
                          ${showcaseItem.status === "Waiting" ? "Waiting" : ""}
                        `}
                            >
                              <i className="bi bi-clock-fill"></i>
                              {showcaseItem.status}
                            </span>
                          )}
                          <section className="text-container">
                            <p className="id">
                              Student ID: {showcaseItem.studentid}
                            </p>
                            <h1 className="topic">{showcaseItem.topic}</h1>
                            <p className="desc">{showcaseItem.description}</p>
                          </section>
                        </section>

                        <section className="edit-del-container">
                          <button
                            data-bs-toggle="modal"
                            data-bs-target="#modal-update"
                            className="btn btn-update"
                            onClick={() => [
                              setOldInfo(showcaseItem),
                              setOldImage(showcaaseImages[0]),
                            ]}
                          >
                            Update
                          </button>
                          <button
                            data-bs-toggle="modal"
                            data-bs-target="#modal-delete"
                            className="btn btn-del"
                            onClick={() => setDelInfo(showcaseItem)}
                          >
                            Delete
                          </button>
                        </section>
                      </section>
                    </section>
                  );
                } else {
                  return null;
                }
              })
          )}
        </article>
      </article>

      {/* Modal - Add *Showcase */}
      <Modal
        modalID="modal-add-new"
        modalHeaderStyle="d-none"
        modalFooterStyle="d-none"
        modalBodyContent={
          <form className="form">
            <h1 className="topic">Showcase</h1>

            {/* Student ID */}
            <div className="input-box">
              <label htmlFor="studentID" className="mb-2">
                * Student ID
              </label>
              <input
                type="text"
                name="studentID"
                id="studentID"
                className="form-control mb-3"
                placeholder={id}
                value={id}
                disabled
              />
            </div>

            {/* Topic */}
            <div className="input-box">
              <label htmlFor="topic" className="mb-2">
                * Topic
              </label>
              <input
                type="text"
                name="topic"
                id="topic"
                className="form-control mb-3"
                placeholder="ex. showcase #1"
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            {/* Description */}
            <div className="input-box">
              <label htmlFor="description" className="mb-2">
                * Description
              </label>
              <textarea
                type="text"
                name="description"
                id="description"
                className="form-control mb-3"
                placeholder="type description..."
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            {/* Image */}
            <div className="input-box">
              <label htmlFor="image" className="mb-2">
                * Image
              </label>
              <input
                type="file"
                name="image"
                id="image"
                className="form-control mb-3"
                onChange={(e) => handleImg(e.target.files[0])}
              />
            </div>

            {previewImage ? (
              <img src={previewImage} className="preview-image" />
            ) : null}

            <section className="btn-container">
              <button
                type="button"
                data-bs-dismiss="modal"
                onClick={handleClosedModal}
                className="btn btn-cancel"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handlePostShowcase}
                className="btn btn-add"
                disabled={
                  topic.trim() === "" || description.trim() === "" || !image
                }
              >
                Add New
              </button>
            </section>
          </form>
        }
      />

      {/* Modal - Update *Showcase */}
      <Modal
        modalID="modal-update"
        modalHeaderStyle="d-none"
        modalFooterStyle="d-none"
        modalBodyContent={
          <form className="form">
            <h1 className="topic">Showcase</h1>

            {/* Topic */}
            <div className="input-box">
              <label htmlFor="topic" className="mb-2">
                * Topic
              </label>
              <input
                type="text"
                name="topic"
                id="topic"
                className="form-control mb-3"
                placeholder={oldInfo.topic}
                onChange={(e) => setNewTopic(e.target.value)}
              />
            </div>

            {/* Description */}
            <div className="input-box">
              <label htmlFor="description" className="mb-2">
                * Description
              </label>
              <textarea
                type="text"
                name="description"
                id="description"
                className="form-control mb-3"
                placeholder={oldInfo.description}
                onChange={(e) => setNewDescription(e.target.value)}
              ></textarea>
            </div>

            {/* Image */}
            <div className="input-box">
              <label htmlFor="image" className="mb-2">
                * Image
              </label>
              <input
                type="file"
                name="image"
                id="image"
                className="form-control mb-3"
                onChange={(e) => handleNewImg(e.target.files[0])}
              />
            </div>

            {previewImage ? (
              <img src={previewImage} className="preview-image" />
            ) : null}

            {oldInfo ? (
              newPreviewImage ? (
                <img
                  src={newPreviewImage}
                  alt="New Preview"
                  className="preview-image"
                />
              ) : (
                <img
                  // src={oldInfo.image}
                  // src={`/images/stu_showcase/${oldInfo.image}`}
                  src={oldImage.image}
                  alt={oldInfo.topic}
                  className="preview-image"
                />
              )
            ) : null}

            <section className="btn-container">
              <button
                type="button"
                data-bs-dismiss="modal"
                onClick={handleClosedModal}
                className="btn btn-cancel"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handlePutShowcase}
                className="btn btn-update"
              >
                Update
              </button>
            </section>
          </form>
        }
      />

      {/* Modal - Delete *Showcase */}
      <ModalDel
        modalDelID="modal-delete"
        modalDelTitle="(Student) Showcase"
        modalDelContent={delInfo}
        modalDelPath="studentShowcase"
      />

      {/* Overlay */}
      {selectedImg && (
        <div className="overlay" onClick={() => setSelectedImg(null)}>
          <div className="overlay-content">
            <span className="close-btn" onClick={() => setSelectedImg(null)}>
              &times;
            </span>
            <img
              // src={selectedImg}
              // src={`/images/stu_showcase/${selectedImg}`}
              src={selectedImg.image}
              alt="Preview"
              className="original-img"
            />
          </div>
        </div>
      )}

      {/* ----------------------------------------- SHOWTIKTOK ------------------------------------------------------------- */}
      <article className="content-container">
        <article className="content-container">
          <article className="showcase-container row m-0">
            <section className="top-container">
              <h1 className="topic">Showcase (Tiktok) Management</h1>

              <section className="btn-container">
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#modal-add-new-tiktok"
                  className="btn btn-add-new"
                >
                  Add New
                </button>
              </section>
            </section>
            <hr />

            {showTiktok.length === 0 ? (
              <img
                src={notFound}
                alt="No showcase items found"
                className="notFoundImg-home"
              />
            ) : (
              showTiktok
                .slice()
                .reverse()
                .slice(0, 3)
                .map((ShowTiktokItem, idx) => (
                  <section key={idx} className="col-sm-12 col-md-4 custom-col">
                    <section className={`showtiktok-card`}>
                      <section
                        className="showtiktok-tiktok mx-5"
                        dangerouslySetInnerHTML={{
                          __html: ShowTiktokItem.embed,
                        }}
                      />

                      <section className="text-container">
                        {ShowTiktokItem.status === "Approved" ? (
                          <span className="status Approved">
                            <i className="bi bi-check-circle-fill"></i>
                            {ShowTiktokItem.status}
                          </span>
                        ) : (
                          <span className="status Waiting">
                            <i className="bi bi-clock-fill"></i>
                            {ShowTiktokItem.status}
                          </span>
                        )}
                        <p className="id">
                          Student ID: {ShowTiktokItem.studentid}
                        </p>
                        <h1 className="topic">{ShowTiktokItem.topic}</h1>
                      </section>

                      <section className="edit-del-container">
                        <button
                          data-bs-toggle="modal"
                          data-bs-target="#modal-update-tiktok"
                          className="btn btn-update"
                          onClick={() => setOldShowTiktok(ShowTiktokItem)}
                        >
                          Update
                        </button>
                        <button
                          data-bs-toggle="modal"
                          data-bs-target="#modal-delete"
                          className="btn btn-del"
                          onClick={() => setDelInfo(ShowTiktokItem)}
                        >
                          Delete
                        </button>
                      </section>
                    </section>
                  </section>
                ))
            )}
          </article>
        </article>
      </article>

      {/* Modal *Add New */}
      <Modal
        modalID="modal-add-new-tiktok"
        modalHeaderStyle="d-none"
        modalFooterStyle="d-none"
        modalBodyContent={
          <form className="form">
            <h1 className="topic">Showcase</h1>

            {/* Topic */}
            <div className="input-box">
              <label htmlFor="topic" className="mb-2">
                * Topic
              </label>
              <input
                type="text"
                id="topic-tiktok"
                className="form-control mb-3"
                placeholder="Ex. Topic #1"
                onChange={(e) => setTopicTT(e.target.value)}
              />
            </div>

            {/* Embed */}
            <div className="input-box">
              <label htmlFor="embed" className="mb-2">
                * Embed
              </label>
              <textarea
                type="text"
                id="embed-tiktok"
                className="form-control mb-3"
                placeholder="Place embed..."
                onChange={(e) => setEmbed(e.target.value)}
              ></textarea>
            </div>

            <section
              className="content-tiktok"
              dangerouslySetInnerHTML={{
                __html: newEmbed ? newEmbed : embed,
              }}
            />

            <section className="btn-container">
              <button
                type="button"
                data-bs-dismiss="modal"
                className="btn btn-cancel"
                onClick={handleClosedModal}
              >
                Cancel
              </button>

              <button
                type="button"
                className="btn btn-add"
                onClick={handlePostshowTiktok}
              >
                Add New
              </button>
            </section>
          </form>
        }
      />

      {/* Modal *Edit */}
      <Modal
        modalID="modal-update-tiktok"
        modalHeaderStyle="d-none"
        modalFooterStyle="d-none"
        modalBodyContent={
          <form className="form">
            <h1 className="topic">Edit *Showcase</h1>

            {/* New *Topic */}
            <div className="input-box">
              <label htmlFor="topic" className="mb-2">
                * New Topic
              </label>
              <input
                type="text"
                id="new-topic-tiktok"
                className="form-control mb-3"
                placeholder={oldShowTiktok.topic}
                onChange={(e) => setNewTopicTT(e.target.value)}
              />
            </div>

            {/* New *Embed */}
            <div className="input-box">
              <label htmlFor="embed" className="mb-2">
                * New Embed
              </label>
              <textarea
                type="text"
                id="new-embed-tiktok"
                className="form-control mb-3"
                placeholder={oldShowTiktok.embed}
                onChange={(e) => setNewEmbed(e.target.value)}
              ></textarea>
            </div>

            <section
              className="content-tiktok"
              dangerouslySetInnerHTML={{
                __html: newEmbed ? newEmbed : oldShowTiktok.embed,
              }}
            />

            <section className="btn-container">
              <button
                type="button"
                data-bs-dismiss="modal"
                className="btn btn-cancel"
                onClick={handleClosedModal}
              >
                Cancel
              </button>

              <button
                type="button"
                className="btn btn-update"
                onClick={handleUpdateShowTiktok}
              >
                Update
              </button>
            </section>
          </form>
        }
      />

      {/* Modal *Delete */}
      <ModalDel
        modalDelID="modal-delete"
        modalDelTitle="(Admin) Showcase"
        modalDelContent={delInfo}
        modalDelPath="studentShowTiktok"
      />
    </main>
  );
};

export default B_Home;
