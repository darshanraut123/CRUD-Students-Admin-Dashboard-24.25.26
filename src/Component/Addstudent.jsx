import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Studentcontext } from "../App";
import axios from "axios";

//This is the add student component which will return a simple div with text Add student
function Addstudent() {
  let context = useContext(Studentcontext);

  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [degree, setDegree] = useState("");
  const [age, setAge] = useState("");
  const [department, setDepartment] = useState("");
  let navigate = useNavigate();
  let handleSave = () => {
    ///students
    let data = {
      firstName,
      lastName,
      age,
      email,
      degree,
      department,
    };
    //Add to students api post request which returns id which used to update UI
    axios
      .post(`https://6199eedf9022ea0017a7af8a.mockapi.io/students`, data)
      .then((res) => {
        data.id = res.data.id;
        context.students.push(data);
        context.setStudents(context.students);
        let temp = context.students.filter((res) => res.name == "darshan");
        navigate("/allstudents");
      });
  };

  return (
    <div>
      <div className="form-group">
        <label for="firstName">First Name</label>
        <input
          onChange={(event) => {
            setFirstname(event.target.value);
          }}
          type="text"
          className="form-control"
          id="firstName"
          aria-describedby="firstNameHelp"
          placeholder="Enter First Name"
        />
      </div>

      <div className="form-group">
        <label for="firstName">Last Name</label>
        <input
          onChange={(event) => {
            setLastname(event.target.value);
          }}
          type="text"
          className="form-control"
          id="lastName"
          aria-describedby="lastNameHelp"
          placeholder="Enter Last Name"
        />
      </div>

      <div className="form-group">
        <label for="age">Age</label>
        <input
          onChange={(event) => {
            setAge(event.target.value);
          }}
          type="number"
          className="form-control"
          id="age"
          aria-describedby="ageHelp"
          placeholder="Enter age"
        />
      </div>

      <div className="form-group">
        <label for="department">Department</label>
        <input
          onChange={(event) => {
            setDepartment(event.target.value);
          }}
          type="text"
          className="form-control"
          id="department"
          aria-describedby="departmentHelp"
          placeholder="Enter department"
        />
      </div>

      <div className="form-group">
        <label for="email">Email</label>
        <input
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          type="email"
          className="form-control"
          id="email"
          aria-describedby="emailHelp"
          placeholder="Enter email"
        />
      </div>

      <div className="form-group">
        <label for="degree">Degree</label>
        <input
          onChange={(event) => {
            setDegree(event.target.value);
          }}
          type="text"
          className="form-control"
          id="degree"
          aria-describedby="degreeHelp"
          placeholder="Enter degree"
        />
      </div>

      <button onClick={handleSave} className="btn btn-primary">
        Submit
      </button>
    </div>
  );
}

export default Addstudent;
