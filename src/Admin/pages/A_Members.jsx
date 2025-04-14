import React, { useEffect, useState } from "react";

import Modal from "../../EComponents/Modal";
import ModalDel from "../../EComponents/ModalDel";
import ModalApprove from "../../EComponents/ModalApprove";
import notFound from "../../DAssets/svg/NotFound.svg";

import api from '../../api';

const A_Members = () => {
  const membersA = [
    {
      studentID: "11111111",
      fname: "aaa",
      lname: "aaa",
      email: "aaa@aaa.com",
      role: "admin",
      status: "Approved",
    },
    {
      studentID: "22222222",
      fname: "bbb",
      lname: "bbb",
      email: "bbb@bbb.com",
      role: "student",
      status: "Waiting",
    },
    {
      studentID: "3333333",
      fname: "ccc",
      lname: "cccc",
      email: "ccc@ccc.com",
      role: "student",
      status: "Waiting",
    },
  ];

  // Get *Members
  const [members, setMembers] = useState([]);
  // console.log(members)
  const handleMembers = async () => {
    try {
      const res = await api.get(`/SignUp`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setMembers(res.data);
      } else {
        alert(`Getting Members failed, check log`);
      }
    } catch (err) {
      alert(`Internal Server Error: ${err.message}`);
    }
  };

  useEffect(() => {
    document.title = "Members | Admin";
    handleMembers();
  }, []);

  // Post (Add New) - Members
  const [studentID, setStudentID] = useState();
  const [role, setRole] = useState("student");
  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const emailPattern = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
      const passwordPattern =
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      if (!emailPattern.test(email)) {
        alert("กรุณาใส่อีเมลที่ถูกต้อง");
        return;
      }

      if (!passwordPattern.test(password)) {
        alert(
          "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร, ตัวพิมพ์เล็ก-ใหญ่, ตัวเลข และอักขระพิเศษ"
        );
        return;
      }

      const res = await api.post(`/signUp`, {
        studentID,
        role,
        fname,
        lname,
        email,
        password,
      });

      if (res.status === 200) {
        alert(`Waiting for approval.`);
        location.reload();
      } else {
        alert(`Sign Up failed, try again later...`);
      }
    } catch (err) {
      alert(`Internal server error: ${err}`);
    }
  };

  // Put (Update) - Member
  const [oldInfo, setOldInfo] = useState([]);
  // console.log(oldInfo)
  const [newStudentID, setNewStudentID] = useState();
  const [newFname, setNewFname] = useState("");
  const [newLname, setNewLname] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      if (newEmail || newPassword) {
        const emailPattern = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
        const passwordPattern =
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (newEmail && !emailPattern.test(newEmail)) {
          alert("กรุณาใส่อีเมลที่ถูกต้อง");
          return;
        }

        if (newPassword && !passwordPattern.test(newPassword)) {
          alert(
            "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร, ตัวพิมพ์เล็ก-ใหญ่, ตัวเลข และอักขระพิเศษ"
          );
          return;
        }
      }

      // ตรวจสอบค่าก่อนอัปเดต
      const updatedData = {
        studentID: newStudentID?.trim() || oldInfo.studentID,
        role: newRole?.trim() || oldInfo.role,
        fname: newFname?.trim() || oldInfo.fname,
        lname: newLname?.trim() || oldInfo.lname,
        email: newEmail?.trim() || oldInfo.email,
        password: newPassword?.trim() || oldInfo.password,
      };

      // console.log("Updating with:", updatedData);

      const res = await api.put(
        `/SignUp/${oldInfo.id}`,
        updatedData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        alert(`อัปเดตข้อมูลสำเร็จ รอการอนุมัติ`);
        location.reload();
      } else {
        alert(`อัปเดตข้อมูลล้มเหลว`);
      }
    } catch (err) {
      console.error("Update Error:", err);
      alert(`เกิดข้อผิดพลาด: ${err.message}`);
    }
  };

  // Put Status (Approved)
  const [approveItem, setApproveItem] = useState([]);

  // DELETE *SHOWCASE
  const [delInfo, setDelInfo] = useState([]);

  // HANDLE *CANCEL MODAL
  const handleClosedModal = () => {
    document.getElementById("studentID").value = "";
    document.getElementById("fname").value = "";
    document.getElementById("lname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
  };

  useEffect(() => {
    document.title = "Members | Admin";
  }, []);

  return (
    <main className="a-members-container">
      <section className="top-container">
        <h1 className="topic">Members Management</h1>
        <section className="add-new-container">
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

      <article className="content-container">
        {members.length === 0 ? (
          <img
            src={notFound}
            alt="No showcase items found"
            className="notFoundImg"
          />
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>No.</th>
                <th>StudetID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Optional</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{member.studentid}</td>
                  <td>
                    {member.fname} {member.lname}
                  </td>
                  <td>{member.email}</td>
                  <td>{member.role}</td>

                  <td className="option-container">
                    {member.status === "Approved" ? (
                      <button className="btn btn-approve">
                        <i className="bi bi-check-circle-fill"></i>
                        <span>Approve</span>
                      </button>
                    ) : (
                      <button
                        className="btn btn-waiting"
                        data-bs-toggle="modal"
                        data-bs-target="#modal-approve"
                        onClick={() => setApproveItem(member)}
                      >
                        <i className="bi bi-clock-fill"></i>
                        <span> Waiting </span>
                      </button>
                    )}

                    <button
                      className="btn btn-update"
                      data-bs-toggle="modal"
                      data-bs-target="#modal-update"
                      onClick={() => setOldInfo(member)}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button
                      className="btn btn-remove"
                      data-bs-toggle="modal"
                      data-bs-target="#modal-delete"
                      onClick={() => setDelInfo(member)}
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </article>

      {/* Modal *Approve */}
      <ModalApprove
        approveItem={approveItem}
        approvePath="SignUp"
        approveTitle="Member"
      />

      {/* Modal - Add *Showcase */}
      <Modal
        modalID="modal-add-new"
        modalHeaderStyle="d-none"
        modalFooterStyle="d-none"
        modalBodyContent={
          <form className="form">
            <h1 className="topic">Member</h1>

            {/* Student ID + Role */}
            <section className="name-container row m-0">
              <div className="input-box col-md-6 right">
                <label htmlFor="studentID" className="mb-2">
                  * Student ID
                </label>
                <input
                  type="text"
                  name="studentID"
                  id="studentID1"
                  className="form-control mb-3"
                  placeholder="ex. 6999999"
                  onChange={(e) => setStudentID(e.target.value)}
                />
              </div>
              <div className="input-box col-md-6 left">
                <label htmlFor="role" className="mb-2">
                  * Role
                </label>
                <select
                  onChange={(e) => setRole(e.target.value)}
                  className="form-select"
                >
                  <option value="Student">Student</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </section>

            {/* Name */}
            <section className="name-container row m-0">
              <div className="input-box col-md-6 right">
                <label htmlFor="fname" className="mb-2">
                  * First Name
                </label>
                <input
                  type="text"
                  name="fname"
                  id="fname1"
                  className="form-control mb-3"
                  placeholder="first name"
                  onChange={(e) => setFname(e.target.value)}
                />
              </div>
              <div className="input-box col-md-6 left">
                <label htmlFor="lname" className="mb-2">
                  * Last Name
                </label>
                <input
                  type="text"
                  name="lname1"
                  id="lname1"
                  className="form-control mb-3"
                  placeholder="last name"
                  onChange={(e) => setLname(e.target.value)}
                />
              </div>
            </section>

            {/* Email */}
            <div className="input-box">
              <label htmlFor="email" className="mb-2">
                * Email
              </label>
              <input
                type="email"
                name="email"
                id="email1"
                className="form-control mb-3"
                placeholder="ex. example@mail.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="input-box">
              <label htmlFor="password" className="mb-2">
                * Password
              </label>
              <input
                type="password"
                placeholder="Password"
                className="form-control mb-3"
                onChange={(e) => setPassword(e.target.value)}
                pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                title="รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร, ประกอบด้วยตัวพิมพ์เล็ก, ตัวพิมพ์ใหญ่, ตัวเลข และอักขระพิเศษ"
                required
              />
            </div>

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
                className="btn btn-add"
                onClick={handleSignUp}
                disabled={
                  !studentID?.trim() ||
                  !fname?.trim() ||
                  !lname?.trim() ||
                  !email?.trim() ||
                  !password?.trim()
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
            <h1 className="topic">Member</h1>

            {/* Student ID + Role*/}
            <section className="name-container row m-0">
              <div className="input-box col-md-6 right">
                <label htmlFor="studentID" className="mb-2">
                  * New Student ID
                </label>
                <input
                  type="text"
                  name="studentID2"
                  id="studentID"
                  className="form-control mb-3"
                  placeholder={oldInfo.studentid}
                  onChange={(e) => setNewStudentID(e.target.value)}
                />
              </div>
              <div className="input-box col-md-6 left">
                <label htmlFor="role" className="mb-2">
                  * New Role
                </label>
                <select
                  onChange={(e) => setNewRole(e.target.value)}
                  className="form-select"
                >
                  <option value={oldInfo.role} hidden>
                    {oldInfo.role}
                  </option>
                  <option value="Student">Student</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </section>

            {/* Name */}
            <section className="name-container row m-0">
              <div className="input-box col-md-6 right">
                <label htmlFor="fname" className="mb-2">
                  * New First Name
                </label>
                <input
                  type="text"
                  name="fname"
                  id="fname2"
                  className="form-control mb-3"
                  placeholder={oldInfo.fname}
                  onChange={(e) => setNewFname(e.target.value)}
                />
              </div>
              <div className="input-box col-md-6 left">
                <label htmlFor="lname" className="mb-2">
                  * New Last Name
                </label>
                <input
                  type="text"
                  name="lname"
                  id="lname2"
                  className="form-control mb-3"
                  placeholder={oldInfo.lname}
                  onChange={(e) => setNewLname(e.target.value)}
                />
              </div>
            </section>

            {/* Email */}
            <div className="input-box">
              <label htmlFor="email" className="mb-2">
                * New Email
              </label>
              <input
                type="email"
                name="email"
                id="email2"
                className="form-control mb-3"
                placeholder={oldInfo.email}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="input-box">
              <label htmlFor="password" className="mb-2">
                * New Password
              </label>
              <input
                type="password"
                placeholder="Password"
                className="form-control mb-3"
                onChange={(e) => setNewPassword(e.target.value)}
                pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                title="รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร, ประกอบด้วยตัวพิมพ์เล็ก, ตัวพิมพ์ใหญ่, ตัวเลข และอักขระพิเศษ"
                required
              />
            </div>

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
                onClick={handleUpdate}
                className="btn btn-update"
              >
                Update
              </button>
            </section>
          </form>
        }
      />

      {/* Modal - Delete *Member */}
      <ModalDel
        modalDelID="modal-delete"
        modalDelTitle="(Admin) Member"
        modalDelContent={delInfo}
        modalDelPath="SignUp"
      />
    </main>
  );
};

export default A_Members;
