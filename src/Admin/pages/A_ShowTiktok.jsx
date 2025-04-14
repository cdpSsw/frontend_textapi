import React, { useEffect, useState } from "react";

import Modal from "../../EComponents/Modal";
import ModalDel from "../../EComponents/ModalDel";
import ModalApprove from "../../EComponents/ModalApprove";
import notFound from "../../DAssets/svg/NotFound.svg";

import api from '../../api';

const A_ShowTiktok = ({ id }) => {

  // Get *ShowTiktok
  const [showTiktok, setShowTiktok] = useState([]);
  // console.log(showTiktok);
  const handleShowTiktok = async () => {
    try {
      const res = await api.get(`/studentShowTiktok`, {
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
  const [studentID, setStudentID] = useState("");
  const [topic, setTopic] = useState("");
  const [embed, setEmbed] = useState("");

  const handlePostshowTiktok = async () => {
    try {
      const formData = new FormData();
      formData.append("studentID", studentID);
      formData.append("topic", topic);
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
    } catch (err){
      alert(`Internal server ${err}`);
    }
  };

  // Post *Selected ShowTiktok
  const [newSelect, setNewSelect] = useState([]);
  // console.log(newSelect)

  const handleselectedShowTiktok = async () => {
    try {
      const res = await api.get(`/selectedShowTiktok`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setNewSelect(res.data);
      } else {
        alert(`Error to get *Showcase, [Check/Log]`);
        return;
      }
    } catch (err) {
      alert(`Internal server ${err.message}`);
    }
  };

  useEffect(() => {
    handleselectedShowTiktok();
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
      const res = await api.post(
        `/selectedShowTiktok`,
        newSelect,
        { withCredentials: true }
      );
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

  // Put *Showcase
  const [oldShowTiktok, setOldShowTiktok] = useState([]);
  const [newTopic, setNewTopic] = useState("");
  const [newEmbed, setNewEmbed] = useState("");

  const handleUpdateShowTiktok = async () => {
    try {
      const updatedTopic = newTopic.trim() ? newTopic : oldShowTiktok.topic;
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

  // Put Status (Approved)
  const [approveItem, setApproveItem] = useState([]);

  // Delete *Showcase
  const [delInfo, setDelInfo] = useState([]);

  // Filter - Sub Menu [Status]
  const [filter, setFilter] = useState("All");
  const filteredShowTiktok = showTiktok.filter(
    (item) => filter === "All" || item.status === filter
  );

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
    <main className="a-ShowTiktok-container">
      <section className="top-container">
        <h1 className="topic">Showcase (Tiktok)</h1>
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
        {showTiktok.length === 0 ? (
          <img
            src={notFound}
            alt="No showTiktok items found"
            className="notFoundImg"
          />
        ) : filteredShowTiktok.length === 0 ? (
          <img
            src={notFound}
            alt={`No ${filter} items found`}
            className="notFoundImg"
          />
        ) : (
          filteredShowTiktok.map((ShowTiktokItem, idx) => (
            <section key={idx} className="col-sm-12 col-md-4 custom-col">
              <section
                className={`content-card
                          ${
                            newSelect.some(
                              (selected) => selected.id === ShowTiktokItem.id
                            )
                              ? "selected"
                              : ""
                          }  
                        `}
              >
                <section
                  className="content-tiktok mx-5"
                  key={idx}
                  dangerouslySetInnerHTML={{ __html: ShowTiktokItem.embed }}
                />

                <section className="text-container">
                  {ShowTiktokItem.status === "Approved" ? (
                    <span
                      className={`status
                                  ${
                                    ShowTiktokItem.status === "Approved"
                                      ? "Approved"
                                      : ""
                                  }
                                `}
                    >
                      <i class="bi bi-check-circle-fill"></i>
                      {ShowTiktokItem.status}
                    </span>
                  ) : (
                    <span
                      className={`status
                                  ${
                                    ShowTiktokItem.status === "Waiting"
                                      ? "Waiting"
                                      : ""
                                  }
                                `}
                      data-bs-toggle="modal"
                      data-bs-target="#modal-approve"
                      onClick={() => setApproveItem(ShowTiktokItem)}
                    >
                      <i className="bi bi-clock-fill"></i>
                      {ShowTiktokItem.status}
                    </span>
                  )}
                  <section onClick={() => handleNewSelect(ShowTiktokItem)}>
                    <p className="id">Student ID: {ShowTiktokItem.studentid}</p>
                    <h1 className="topic">{ShowTiktokItem.topic}</h1>
                  </section>
                </section>

                <section className="edit-del-container">
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#modal-update"
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

      {/* Modal *Approve */}
      <ModalApprove
        approveItem={approveItem}
        approvePath="studentShowTiktok"
        approveTitle="Showcase"
      />

      {/* Modal *Add New */}
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
                className="form-control mb-3"
                placeholder="Ex. 69999999"
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
                className="form-control mb-3"
                placeholder="Ex. Topic #1"
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            {/* Embed */}
            <div className="input-box">
              <label htmlFor="embed" className="mb-2">
                * Embed
              </label>
              <textarea
                type="text"
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
        modalID="modal-update"
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
                className="form-control mb-3"
                placeholder={oldShowTiktok.topic}
                onChange={(e) => setNewTopic(e.target.value)}
              />
            </div>

            {/* New *Embed */}
            <div className="input-box">
              <label htmlFor="embed" className="mb-2">
                * New Embed
              </label>
              <textarea
                type="text"
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

      {/* Modal *Save Select */}
      <Modal
        modalID="modal-save-select"
        modalHeaderStyle="d-none"
        modalFooterStyle="d-none"
        modalBodyContent={
          <article className="modal-save-select">
            <h2 className="topic">Save Select For Show</h2>

            <p className="desc">
              Are you going to save select this 'ShowTiktok' for show
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
    </main>
  );
};

export default A_ShowTiktok;
