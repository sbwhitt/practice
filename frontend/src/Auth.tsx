import { ReactElement, useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";

let loaded = false;

interface AuthProps {
  children: ReactElement
}

export default function Auth({ children }: AuthProps) {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    if (!loaded) {
      loaded = true;
      const storedToken = localStorage.getItem("token");
      if (storedToken !== null) {
        console.log("token found, authing");
        validate(storedToken);
      }
      else console.log("no token found");
    }
  });

  const validate = (token: string) => {
    if (token) {
      setLoggedIn(true);
    }
  };

  return (
    <span>
      {
        loggedIn ? children :
        <div>
          <h1>you are not logged in</h1>
          <LoginForm />
        </div>
      }
    </span>
  );
}
