import React, { useLayoutEffect, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Studentcontext } from "../App";
import axios from "axios";

function EditStudent() {
  //Context object from app.js
  let context = useContext(Studentcontext);
  //Params object from queryparams
  let params = useParams();
  //All states for edit component
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [age, setAge] = useState("");
  let [department, setDepartment] = useState("");
  let [email, setEmail] = useState("");
  let [degree, setDegree] = useState("");
  let navigate = useNavigate();

  //Setting all states in mount
  useLayoutEffect(() => {
    let temp = context.students.filter((res) => res.id === params.id);
    setFirstName(temp[0].firstName);
    setLastName(temp[0].lastName);
    setAge(temp[0].age);
    setDepartment(temp[0].department);
    setEmail(temp[0].email);
    setDegree(temp[0].degree);
  }, []);

  //Function for edit submit
  function editStud() {
    let data = {
      firstName,
      lastName,
      age,
      department,
      email,
      degree,
    };

    //PUT request to update student with id using axios
    axios
      .put(
        `https://6199eedf9022ea0017a7af8a.mockapi.io/students/${params.id}`,
        data
      )
      .then((response) => {
        context.students[params.key] = data;
        context.setStudents(context.students);
        //Navigate back to all students
        navigate("/allstudents");
      });
  }

  return (
    <>
      <div>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            onChange={(event) => setFirstName(event.target.value)}
            type="text"
            value={firstName}
            className="form-control"
            id="firstName"
            aria-describedby="firstNameHelp"
            placeholder="Enter First Name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="firstName">Last Name</label>
          <input
            type="text"
            onChange={(event) => setLastName(event.target.value)}
            value={lastName}
            className="form-control"
            id="lastName"
            aria-describedby="lastNameHelp"
            placeholder="Enter Last Name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            onChange={(event) => setAge(event.target.value)}
            type="number"
            value={age}
            className="form-control"
            id="age"
            aria-describedby="ageHelp"
            placeholder="Enter age"
          />
        </div>

        <div className="form-group">
          <label htmlFor="department">Department</label>
          <input
            onChange={(event) => setDepartment(event.target.value)}
            type="text"
            value={department}
            className="form-control"
            id="department"
            aria-describedby="departmentHelp"
            placeholder="Enter department"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            value={email}
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="degree">Degree</label>
          <input
            onChange={(event) => setDegree(event.target.value)}
            type="text"
            value={degree}
            className="form-control"
            id="degree"
            aria-describedby="degreeHelp"
            placeholder="Enter degree"
          />
        </div>

        <button onClick={editStud} className="btn btn-primary">
          Submit
        </button>
      </div>
    </>
  );
}

export default EditStudent;
