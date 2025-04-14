import React, { useEffect, useState } from "react";

import Modal from "../../EComponents/Modal";
import ModalDel from "../../EComponents/ModalDel";
import ModalApprove from "../../EComponents/ModalApprove";
import notFound from "../../DAssets/svg/NotFound.svg";

import api from '../../api';

const A_ShowCase = ({ id }) => {

  // Overlay
  const [selectedImg, setSelectedImg] = useState(null);

  // -------------------------------------------------------------- GET -------------------------------------------------
  // GET ALL *SHOWCASE
  // console.log(showcase)
  const [showcase, setShowcase] = useState([]);

  const handleGetShowcase = async () => {
    try {
      const res = await api.get(`/studentShowcase`, {
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

  // console.log(images)
  const [images, setImages] = useState([]);
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

  useEffect(() => {
    document.title = "Showcase (Files) | Admin";
    handleGetShowcase();
  }, []);

  // -------------------------------------------------------------- POST -------------------------------------------------
  // POST NEW *SHOWCASE
  const [studentID, setStudentID] = useState("");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState();
  const [previewImage, setPreviewImage] = useState();

  const handlePostShowcase = async () => {
    try {
      const formData = new FormData();
      formData.append("studentID", studentID);
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

  // -------------------------------------------------------------- SELECTED -------------------------------------------------
  // Post *Selected Showcase
  const [newSelect, setNewSelect] = useState([]);
  // console.log(newSelect)

  // GET SELECTED *SHOWCASE
  const handleGetSelectedShowcase = async () => {
    try {
      const res = await api.get(`/selectedShowcase`, {
        withCredentials: true,
      });

      if (res.status === 200) {
        setNewSelect(res.data);
      } else {
        alert(`Error to get Showcase, for this id: ${id}`);
      }
    } catch (err) {
      alert(`Internal server ${err}`);
    }
  };

  useEffect(() => {
    handleGetSelectedShowcase();
  }, []);

  const handleNewSelect = (newItem) => {
    const isAlreadySelected = newSelect.some(
      (selected) => selected.id === newItem.id
    );

    if (isAlreadySelected) {
      // ถ้าเลือกซ้ำให้ลบออกจาก newSelect
      setNewSelect(newSelect.filter((selected) => selected.id !== newItem.id));
    } else {
      if (newSelect.length < 3) {
        // ถ้ายังไม่ครบ 3 อัน ให้เพิ่มเข้าไป
        setNewSelect([...newSelect, newItem]);
      } else {
        alert(`Select only 3 Showcase for 'Show'`);
      }
    }
  };

  const handleSaveNewSelect = async () => {
    try {
      const res = await api.post(`/selectedShowcase`, newSelect, {
        withCredentials: true,
      });
      if (res.status === 200) {
        alert(`Save New "Selected Showcase" Sueccessful.`);
        location.reload();
      } else {
        alert(`Save New "Selected Showcase" Failed.`);
      }
    } catch (err) {
      alert(`Internal server error: ${err.message}`);
    }
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

  // Put Status (Approved)
  const [approveItem, setApproveItem] = useState([]);

  // DELETE *SHOWCASE
  const [delInfo, setDelInfo] = useState([]);

  // HANDLE *CANCEL MODAL
  const handleClosedModal = () => {
    document.getElementById("topic").value = "";
    document.getElementById("description").value = "";
    document.getElementById("image").value = "";
  };

  // Filter - Sub Menu [Status]
  const [filter, setFilter] = useState("All");
  const filteredShowcase = showcase.filter(
    (item) => filter === "All" || item.status === filter
  );

  return (
    <main className="a-showcase-container">
      <section className="top-container">
        <h1 className="topic">Showcase (Files)</h1>
        <hr />

        <section className="fil-save-select-container">
          <section className="filter-container">
            <button
              className={`btn btn-all
                ${filter === "All" ? "active" : ""}
              `}
              onClick={() => setFilter("All")}
            >
              All
            </button>
            <button
              className={`btn btn-approved
                ${filter === "Approved" ? "active" : ""}
              `}
              onClick={() => setFilter("Approved")}
            >
              Approved
            </button>
            <button
              className={`btn btn-waiting
                ${filter === "Waiting" ? "active" : ""}
              `}
              onClick={() => setFilter("Waiting")}
            >
              Waiting
            </button>
          </section>

          <section className="save-select-add-new-container">
            <button
              data-bs-toggle="modal"
              data-bs-target="#modal-add-new"
              className="btn btn-add-new"
            >
              Add New
            </button>
            <button
              data-bs-toggle="modal"
              data-bs-target="#modal-save-select"
              className="btn btn-save-select"
            >
              Save Select
            </button>
          </section>
        </section>
      </section>

      <article className="content-container row m-0">
        {showcase.length === 0 ? (
          <img
            src={notFound}
            alt="No showcase items found"
            className="notFoundImg"
          />
        ) : filteredShowcase.length === 0 ? (
          <img
            src={notFound}
            alt={`No ${filter} items found`}
            className="notFoundImg"
          />
        ) : (
          filteredShowcase.map((showcaseItem, idx) => {
            const showcaaseImages = images.filter(
              (img) => img.id === showcaseItem.id
            );
            return (
              <section key={idx} className="col-sm-6 col-md-3">
                <section
                  className={`content-card
                  ${
                    newSelect.some(
                      (selected) => selected.id === showcaseItem.id
                    )
                      ? "selected"
                      : ""
                  }  
                `}
                >
                  {showcaaseImages.length > 0 && (
                    <img
                      key={showcaseItem.id}
                      src={showcaaseImages[0].image}
                      alt={`img-${showcaaseImages[0].id}`}
                      className="content-img"
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
                        data-bs-toggle="modal"
                        data-bs-target="#modal-approve"
                        onClick={() => setApproveItem(showcaseItem)}
                      >
                        <i className="bi bi-clock-fill"></i>
                        {showcaseItem.status}
                      </span>
                    )}
                    <section onClick={() => handleNewSelect(showcaseItem)}>
                      <p className="id">Student ID: {showcaseItem.studentid}</p>
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
          })
        )}
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
                placeholder="ex. 699999999"
                onChange={(e) => setStudentID(e.target.value)}
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
                  // src={oldInfo.img}
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

      {/* Modal *Approve */}
      <ModalApprove
        approveItem={approveItem}
        approvePath="studentShowcase"
        approveTitle="Showcase"
      />

      {/* Modal *Save Select */}
      <Modal
        modalID="modal-save-select"   
        modalHeaderStyle="d-none"
        modalFooterStyle="d-none"
        modalBodyContent={
          <article className="modal-save-select">
            <h2 className="topic">Save Select For Show</h2>
            <p className="desc">
              Are you going to save select this 'Showcase' for show
            </p>

            {newSelect.map((newSelect, idx) => (
              <ul key={idx} className="select-list">
                <li className="select">{newSelect.topic}</li>
              </ul>
            ))}

            <section className="btn-container">
              <button className="btn btn-no" data-bs-dismiss="modal">
                No, Select New
              </button>

              <button
                className="btn btn-yes"
                type="button"
                disabled={newSelect.length !== 3}
                onClick={handleSaveNewSelect}
              >
                Yes, Select it!
              </button>
            </section>
          </article>
        }
      />

      {selectedImg && (
        <div className="overlay" onClick={() => setSelectedImg(null)}>
          <div className="overlay-content">
            <span className="close-btn" onClick={() => setSelectedImg(null)}>
              &times;
            </span>
            <img
              // src={selectedImg}
              src={`/images/stu_showcase/${selectedImg}`}
              alt="Preview"
              className="original-img"
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default A_ShowCase;
