import { useNavigate } from "react-router-dom"
export default function LogOut(){
  const nav = useNavigate()
  return<>
  <div className="flex flex-col justify-center items-center">
  <button className="bg-red-600 rounded-md px-1 py-2 w-16" onClick={()=>{
    alert("Bye")
    localStorage.removeItem("token")
    nav("/")
  }}>Logout</button>
  </div>
  </>
}