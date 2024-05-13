import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function auth(e: any) {
    try {
      e.preventDefault();
      const credential = { username: username, password: password };
      const res = await fetch(`http://localhost:8081/api/auth`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credential),
      });
      if (res.status == 200) {
        return navigate("/program-manager-dashboard");
      } else if (res.status == 404) {
        window.alert("User not found");
      } else {
        window.alert("Something is wrong");
      }
    } catch (err: any) {
      window.alert(err.message);
    }
  }
  return (
    <>
      <div className="flex items-center text-center w-60 mx-auto h-screen">
        <form
          onSubmit={auth}
          className="flex flex-col h-fit shadow-blue-200 shadow-md rounded-2xl p-5"
        >
          <h1 className="text-lg font-semibold mb-5">Login</h1>
          <input
            required
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            className="block mb-3 p-3 rounded-xl"
          />
          <input
            required
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            className="block mb-3 p-3 rounded-xl"
            placeholder="Password"
          />
          <button className="block p-2 border-2 rounded-xl transition ease-in-out hover:border-2 hover:border-blue-500 duration-150 active:scale-110 text-blue-700">
            Login
          </button>
        </form>
      </div>
    </>
  );
}
