import { useNavigate } from "react-router-dom";
export default function RenderUsers({ users }) {
  const nav = useNavigate();
  return (
    <div>
      {users.map((user) => (
        <div key={user._id} className="flex items-center justify-between p-2">
          <div>
            {user.fName} {user.lName}
          </div>
          <button
            onClick={() => {
              nav(`/send?id=${user._id}&fName=${user.fName}&lName=${user.lName}`);
            }}
            className="ml-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Send
          </button>
        </div>
      ))}
    </div>
  );
}
