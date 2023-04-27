import {
  createContext,
  useContext,
  useEffect,
  ReactNode,
  useState,
} from "react";
import { api } from "../services/axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ICreateUser } from "../pages/registerUser";
import { iAnnouncement } from "./announcements.context";

interface IUser {
  id?: string;
  fullName: string;
  cpf: string;
  cellphone: string;
  birthdate: string;
  password: string;
  confirmPassword?: string;
  email: string;
  bio: string;
  announcements: iAnnouncement[];
  address: IAddress;
  isAdvertise?: boolean;
}

interface IAddress {
  id?: string;
  zipCode: string;
  street: string;
  city: string;
  state: string;
  number: string;
  complement?: string;
}

interface ILogin {
  email: string;
  password: string;
}

interface IUserContext {
  loading: boolean;
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  isLogged: boolean;
  logout: () => void;
  registerUser: (payload: ICreateUser) => Promise<void>;
  loginUser: (payload: ILogin) => Promise<void>;
}

export const UserContext = createContext({} as IUserContext);

export const UserProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const restoreRoutine = async () => {
      setLoading(true);
      const token = localStorage.getItem("@TOKEN");

      if (token) {
        try {
          api.defaults.headers.authorization = `Berear ${token}`;
          const userData = await api.get("/users/profile");
          setUser(userData.data);
          setIsLogged(true);
        } catch (error) {
          navigate("/login");
          setLoading(false);
        }
      } else {
        setIsLogged(false);
        setLoading(false);
      }
      setLoading(false);
    };

    restoreRoutine();
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
    setUser(null);
    setIsLogged(false);
  };

  const registerUser = async (payload: ICreateUser) => {
    try {
      await api.post("/users", payload);
      toast({
        title: "Conta criada!",
        description: "Criamos sua conta para você.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: "E-mail já existe!",
        description: "E-mail já existe!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error(error);
    }
  };

  const loginUser = async (payload: ILogin) => {
    localStorage.clear();
    try {
      const res = await api.post("/login", payload);
      localStorage.setItem("@TOKEN", res.data.token);
      toast({
        title: "Conta logada!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      api.defaults.headers.authorization = `Berear ${res.data.token}`;
      const userData = await api.get("/users/profile");
      setUser(userData.data);
      setIsLogged(true);
      navigate("/");
    } catch (error) {
      toast({
        title: "Dados incorretos!",
        description: "Email e/ou senha estão incorretos.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        loading,
        user,
        setUser,
        isLogged,
        logout,
        registerUser,
        loginUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): IUserContext => useContext(UserContext);

export default UserProvider;
