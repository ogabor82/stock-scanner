import { useState } from "react";
import { login, logout } from "../../store";
import { useDispatch } from "react-redux";

export function Auth() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function loginHandler() {
    dispatch(login());
  }

  function logoutHandler() {
    dispatch(logout());
  }

  return (
    <div className="border border-blue-800 flex flex-col gap-8 p-8">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={loginHandler}>Log in</button>
      <button onClick={logoutHandler}>Log out</button>
    </div>
  );
}
