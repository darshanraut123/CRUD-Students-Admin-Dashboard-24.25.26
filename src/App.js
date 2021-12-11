import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Component/Sidebar";
import Dashboard from "./Component/Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Addstudent from "./Component/Addstudent";
import Allstudents from "./Component/Allstudents";
import EditStudent from "./Component/EditStudent";

let Studentcontext = React.createContext();

function App() {
  //This is the data we will be sending to dashboard component via routes
  // const myData = [
  //   {
  //   id:1,
  //    firstName : "Chaitanya",
  //    lastName : "Mendule",
  //    age :  "25",
  //    department: "Civil",
  //    email: "cmendule@live.com",
  //    degree : "BE"
  // },
  // {
  //   id:2,
  //   firstName : "Darshan",
  //   lastName: "Raut",
  //   age :  "27",
  //   department: "Computer",
  //   email: "darshanraut123@live.com",
  //   degree : "BE"
  // }
  // ,
  // {
  //   id:3,
  //   firstName : "Akshay",
  //   lastName: "Kadu",
  //   age :  "29",
  //   department: "Mechanical",
  //   email: "akadu@live.com",
  //   degree : "BTEC"
  // }]
  const [students, setStudents] = useState([]);

  useEffect(() => getData(), []);

  async function getData() {
    // Using fetch react-fetch api
    // let res = await fetch('https://6199eedf9022ea0017a7af8a.mockapi.io/students');
    // res = res.json();
    // res.then(res=>setStudents(res))
    // .catch(e=>console.log(e.messsage))

    // Make a request for a users with axios
    axios
      .get("https://6199eedf9022ea0017a7af8a.mockapi.io/students")
      .then(function (response) {
        setStudents(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  //Data for dashboard
  let data = { earning: "30,000", annual: "3,60,000", task: 20, pending: 26 };

  return (
    <div className="App">
      <Router>
        <div
          style={{ display: "grid", gridTemplateColumns: "17% 83%" }}
          className="pr-3"
        >
          {/*This sidebar component will be always visible*/}
          <div>
            <Sidebar />
          </div>
          <Studentcontext.Provider value={{ students, setStudents }}>
            {/*Using routes tag we are implementing redirects*/}
            <Routes>
              {/*When base url appended with /dashboard then Dashboard component will be active. We are passing data through props*/}
              <Route path="/" element={<Dashboard value={data} />}></Route>
              {/*When base url appended with /allstudents then Allstudent component will be active*/}
              <Route path="/allstudents" element={<Allstudents />}></Route>
              {/*When base url appended with /addstudent then Addstudent component will be active*/}
              <Route path="/addstudent" element={<Addstudent />}></Route>
              {/* To edit the student we can use this route*/}
              <Route
                path="/editstudent/:id/:key"
                element={<EditStudent />}
              ></Route>
              EditStudent
            </Routes>
          </Studentcontext.Provider>
        </div>
      </Router>
    </div>
  );
}

//Exports
export { Studentcontext };
export default App;
