import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useLocalStorage } from "./useLocalStorage";

export interface User {
  username: string;
  image: string;
  name: string;
  authToken?: string;
}

export const useUser = () => {
  const { user, setUser } = useContext(AuthContext);
  const { setItem } = useLocalStorage();

  const addUser = (user: User) => {
    setUser(user);
    setItem("user", JSON.stringify(user));
  };

  const removeUser = () => {
    setUser(null);
    setItem("user", "");
  };

  return { user, addUser, removeUser };
};
