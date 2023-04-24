import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/home";
import { AnnouncementDetail } from "../pages/announcementDetail";
import { Profile } from "../pages/profile";
import { RegisterUser } from "../pages/registerUser";
import { LoginUser } from "../pages/loginUser";
import ProtectedRoutes from "../components/protectedRoutes";
import {useEffect, useState} from "react";
import { useUser } from "../context/user.context";
import { Flex, Spinner } from "@chakra-ui/react";

export default function MakeRoutes(): JSX.Element {

  const [loaded, setLoaded] = useState(false);
  const { restoreRoutine } = useUser();

  useEffect(() => {
    restoreRoutine().then(() => setLoaded(true));
    return () => setLoaded(false);
  },[])

  return (
    <>
      {loaded ? (
        <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/announcement/:id" element={<AnnouncementDetail />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/login" element={<LoginUser />} />
      </Routes>
      ): (
        <Flex
          h="100vh"
          w="100vw"
          justifyContent="center"
          alignItems="center"
        >
          <Spinner />
        </Flex>
      )}
    </>
    
  );
}
