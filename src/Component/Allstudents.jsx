import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Studentcontext } from "../App";

//Functional component for list of all students
function Allstudents() {
  //Accessing the student context value
  let context = useContext(Studentcontext);

  //To navigate to different url
  const navigate = useNavigate();

  function handleDelete(id) {
    //Delete request to delete specific row of user with id using axios
    axios
      .delete(`https://6199eedf9022ea0017a7af8a.mockapi.io/students/${id}`)
      .then((res) =>
        context.setStudents((prev) => prev.filter((res) => res.id !== id))
      );
    //re render the updated state
  }

  return (
    <div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Age</th>
            <th scope="col">Department</th>
            <th scope="col">Email</th>
            <th scope="col">Degree</th>
            <th scope="col">More Options</th>
          </tr>
        </thead>
        <tbody>
          {context.students.map((student, key) => {
            return (
              <tr>
                <th scope="row">{key + 1}</th>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.age}</td>
                <td>{student.department}</td>
                <td>{student.email}</td>
                <td>{student.degree}</td>
                <td>
                  <button
                    onClick={() => {
                      //Navigating to edit component with 2 query params
                      navigate(
                        "/editStudent/" + student.id + "/" + Number(key)
                      );
                    }}
                    className="btn btn-secondary mx-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(event) => {
                      //Calling function for delete specific data with id
                      handleDelete(student.id);
                    }}
                    className="btn btn-danger mx-3"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Allstudents;
