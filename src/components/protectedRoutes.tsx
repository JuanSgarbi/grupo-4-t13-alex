// import { Navigate, Outlet, useLocation } from "react-router-dom";
// import { useUser } from "../context/user.context";
// import { Flex, Spinner } from "@chakra-ui/react";

// const ProtectedRoutes = () => {
//   const location = useLocation();
//   const { user, loading } = useUser();

//   return user ? (
//     <Outlet />
//   ) : loading ? (
//     <Flex h="100vh" w="100vw" justifyContent="center" alignItems="center">
//       <Spinner />
//     </Flex>
//   ) : (
//     <Navigate to="/login" replace state={{ from: location }} />
//   );
// };

// export default ProtectedRoutes;
