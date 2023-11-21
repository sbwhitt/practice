import { useState } from "react";
import { createUser } from "../middleware/users";

export default function CreateForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const status = await createUser(username, password);
    if (status === 200) {
      setUsername("");
      setPassword("");
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
      <input
        placeholder="enter username"
        value={username}
        onChange={(e) => updateUsername(e)}/>
      <input
        placeholder="enter password"
        value={password}
        onChange={(e) => updatePassword(e)}/>
      <button onClick={(e) => submit(e)}>create user</button>
    </form>
  );
}
