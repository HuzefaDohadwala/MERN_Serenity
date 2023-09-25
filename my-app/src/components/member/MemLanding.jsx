import React, { useEffect, useState } from "react";
import MemLanding1 from "./MemLanding1";
import NavMem from "./NavMem";
import MemLanding2 from "./MemLanding2";
import MemLanding3 from "./MemLanding3";
import MemLanding4 from "./MemLanding4";
import axios from "axios";
axios.defaults.withCredentials = true;

const MemLanding = () => {
  // const [user, setUser] = useState();

  // const sednRequest = async () => {
  //   const res = await axios
  //     .get("http://localhost:5000/user", {
  //       withCredentials: true,
  //     })
  //     .catch((err) => console.log(err));
  //   const data = await res.data;
  //   return data;
  // };

  // useEffect(() => {
  //   sednRequest().then((data) => setUser(data.user));
  // }, []);

  // console.log(user);

  return (
    <div>
      <NavMem />
      {/* {user && <h1>{user.username}</h1>} */}
      <MemLanding1 />
      <MemLanding2 />
      <MemLanding3 />
      <MemLanding4 />
    </div>
  );
};

export default MemLanding;
