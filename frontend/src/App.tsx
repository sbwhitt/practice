import { useState, useEffect } from "react";
import { User, deleteUser, getUsers } from "./middleware/users";
import CreateForm from "./components/CreateForm";

export default function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    updateUsers();
  }, []);

  const updateUsers = async () => {
    const users = await getUsers();
    setUsers(users);
  };

  const deleteSelected = async (id: string) => {
    const status = await deleteUser(id);
    if (status === 200) updateUsers();
  }

  const renderUsers = () => {
    return users.map((value: User, index) => {
      return (
        <div key={index}>
          <span>user {index+1}: {value.username} </span>
          <button onClick={() => deleteSelected(value.id)}>delete</button>
        </div>
      );
    });
  };

  return (
    <div>
      <h1>practice</h1>
      <CreateForm />
      <button onClick={updateUsers}>get users</button>
      <div>{renderUsers()}</div>
    </div>
  );
}
