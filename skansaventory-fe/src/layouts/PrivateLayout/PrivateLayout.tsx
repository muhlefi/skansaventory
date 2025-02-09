import { Outlet } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";

const PrivateLayout: React.FC = () => {
  return (
    <Flex h="100vh">
      {/* <Sidebar />  */}
      ini private layout
      <Box flex="1" p={4}>
        {/* <Navbar />  */}
        <Outlet /> {/* Render halaman Dashboard/Profile */}
      </Box>
    </Flex>
  );
};

export default PrivateLayout;
