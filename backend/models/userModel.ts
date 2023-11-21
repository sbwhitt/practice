import { db } from './db';

export const getUsers = async () => {
  try {
    return await new Promise(function (resolve, reject) {
      db.query(
        'SELECT * FROM users',
        (error, results) => {
          if (error) reject(error);
          if (results && results.rows) resolve(results.rows);
          else reject(new Error('no resutls'));
        });
    });
  }
  catch (e) {
    console.error(e);
    throw new Error("get internal server error");
  }
};

export const createUser = async (body: any) => {
  try {
    const { username, password } = body;
    return await new Promise(function (resolve, reject) {
      db.query(
        "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
        [username, password],
        (error, results) => {
          if (error) reject(error);
          if (results && results.rows) resolve(`A new user has been added: ${JSON.stringify(results.rows[0])}`);
          else reject(new Error("No results found"));
        }
      );
    });
  }
  catch (e) {
    console.error(e);
    throw new Error("create internal server error");
  }
};

export const deleteUser = async (id: string) => {
  try {
    return await new Promise(function (resolve, reject) {
      db.query(
        "DELETE FROM users WHERE id = $1",
        [id],
        (error, results) => {
          if (error) reject(error);
          else resolve(`user deleted with ID: ${id}`);
        }
      );
    });
  }
  catch (e) {
    console.error(e);
    throw new Error("delete internal server error");
  }
};

export const updateUser = async (id: string, body: any) => {
  try {
    const { username, password } = body;
    return await new Promise(function (resolve, reject) {
      db.query(
        "UPDATE users SET username = $1, password = $2 WHERE id = $3 RETURNING *",
        [username, password, id],
        (error, results) => {
          if (error) reject(error);
          else resolve(`user updated with ID: ${id}`);
        }
      );
    });
  }
  catch (e) {
    console.error(e);
    throw new Error("update internal server error");
  }
};
