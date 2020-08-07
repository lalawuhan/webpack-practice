import "./style.css";
import { getUsers } from "./common/usersAPI";

console.log("Hello webpack!");

getUsers().then((json) => console.log(json));
