import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  VStack,
  useToast,
  Link,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import AuthLayout from "../../components/components/authLayout";
import loginImage from "../../assets/oxbridgeAI.jpeg"; // Replace with your image path

const LoginPage = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email && password) {
      localStorage.setItem("isAuthenticated", "true");
      setIsAuthenticated(true); // Update authentication state
      toast({
        title: "Login Successful",
        description: "Welcome back!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/dashboard");
    } else {
      toast({
        title: "Login Failed",
        description: "Please provide both email and password.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <AuthLayout imageUrl={loginImage}>
      <VStack spacing={4} align="stretch">
        <Text fontSize="2xl" fontWeight="bold" textAlign="center">
          Log In
        </Text>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button
          color="white" bg="black"
          size="lg"
          width="100%"
          onClick={handleLogin}
        >
          Log In
        </Button>
        <Text fontSize="sm" textAlign="center">
          Don&apos;t have an account?{" "}
          <Link color="blue.500" href="/signup">
            Sign up
          </Link>
        </Text>
      </VStack>
    </AuthLayout>
  );
};

LoginPage.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default LoginPage;
