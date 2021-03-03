import bcrypt from "bcryptjs";

//just play data.. not actually from a form
const users = [
  {
    name: "Admin User",
    email: "admin@a.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Mike Zhao",
    email: "zhao@a.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "zhour",
    email: "zhou@r.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
