import { useEffect, useState } from "react";
import axios from "axios";
import AppBar from "./AppBar";
import RenderUsers from "./RenderUsers";
import SearchBar from "./SearchBar";
import Balance from "./Balance";
import LogOut from "./LogOut";

// Exporting fetchData to be used in other components
export const fetchData = async (token) => {
  try {
    const response = await axios.get("http://localhost:3000/api/v1/user/info", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return response.data.user; // Return the user data if successful
  } catch (e) {
    if (e.response && e.response.status === 401) {
      // If a 401 error occurs, return a specific value
      return "unauthorized";
    }
    console.log("An error occurred:", e.message);
    return null;
  }
};

export default function DashBoard() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [filter, setFilter] = useState("");

  const token = localStorage.getItem("token");
  console.log("token from dashboard: " + token);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await fetchData(token);
      if (userData && userData !== "unauthorized") {
        setUser(userData);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/user/bulk?filter=${filter}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        setUsers(response.data.users);
      } catch (e) {
        alert("An error occurred");
        console.log(e.message);
      }
    };

    fetchUserData();
    fetchUsers();
  }, [token, filter]);

  return (
    <>
      <div>
        <AppBar user={user} />
        <SearchBar
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        />
        <Balance />
        <div className="flex flex-col  ">
        <RenderUsers users={users} />
        <LogOut></LogOut>
        </div>
      </div>
      
    </>
  );
}
