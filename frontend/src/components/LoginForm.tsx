import { useState } from "react";
import { authUser } from "../middleware/users";

export default function LoginForm() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const submit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const res = await authUser(username, password);
    setUsername("");
    setPassword("");
    if (res) {
      localStorage.setItem("token", res);
      window.location.replace("/");
    }
  };

  const updateUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUsername(e.target.value);
  };

  const updatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  return (
    <form>
      <input type="text" placeholder="enter username" value={username} onChange={(e) => updateUsername(e)} />
      <input type="password" placeholder="enter password" value={password} onChange={(e) => updatePassword(e)} />
      <button onClick={(e) => submit(e)}>login</button>
    </form>
  );
}
