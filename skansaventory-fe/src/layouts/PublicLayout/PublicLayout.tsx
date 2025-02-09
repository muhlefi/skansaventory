import { memo } from "react";
import { Outlet } from "react-router-dom";
import { Box, Container, Heading } from "@chakra-ui/react";

const PublicLayout: React.FC = () => {
  return (
    <Container centerContent maxW="container.md">
      <Heading my={4}>Welcome to My App</Heading>
      <Box w="full" p={4} borderWidth={1} borderRadius="lg">
        <Outlet />
      </Box>
    </Container>
  );
};

export default memo (PublicLayout);
