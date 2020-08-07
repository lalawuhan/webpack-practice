import moment from "moment";
//with a dynamic import you can choose when to load code:
const getUserModule = () => import("./common/usersAPI");

//If you want to control the "chunk name"
//import(/* webpackChunkName: "usersAPI" */ "./common/usersAPI");

const btn = document.getElementById("btn");

btn.addEventListener("click", () => {
  //load module dynamically
  getUserModule().then(({ getUsers }) => {
    getUsers().then((json) => console.log(json));
  });
});

//initial code commented out to try code splitting with moment.js
// import "./style.css";
// import { getUsers } from "./common/usersAPI";

// console.log("Hello webpack!");

// getUsers().then((json) => console.log(json));
