export interface User {
  id: string,
  username: string,
  password: string
}

export interface UserAuth {
  status: number,
  token: string | null
}

export const createUser = async (username: string, password: string): Promise<number> => {
  return await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password })
  })
  .then((response) => {
    return response.status
  })
  .catch((err) => {
    console.error(err);
    throw new Error("error deleting user");
  });
};

export const getUsers = async (): Promise<User[]> => {
  return await fetch("http://localhost:3000/users")
    .then((response) => {
      if (response.status === 200) return response.text();
    })
    .then((data) => {
      if (data) {
        return JSON.parse(data);
      }
    }).catch((err) => {
      console.error(err);
      throw new Error("error retrieving users");
    });
};

export const updateUser = async (id: string, username: string, password: string): Promise<number> => {
  return await fetch(`http://localhost:3000/users/${id}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password })
  })
  .then((response) => {
    return response.status;
  })
  .catch((err) => {
    console.error(err);
    throw new Error("error updating user");
  });
}

export const deleteUser = async (id: string): Promise<number> => {
  return await fetch(`http://localhost:3000/users/${id}`, {
    method: "DELETE"
  })
  .then((response) => {
    return response.status
  })
  .catch((err) => {
    console.error(err);
    throw new Error("error deleting user");
  });
};

export const authUser = async (username: string, password: string): Promise<string> => {
  return await fetch("http://localhost:3000/users/auth", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password })
  })
  .then((response) => {
    if (response.status === 200) return response.text();
    else return "";
  })
  .then((data) => data)
  .catch((err) => {
    console.error(err);
    throw new Error("error deleting user");
  });
}
