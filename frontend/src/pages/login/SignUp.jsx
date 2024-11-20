import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Link,
  useToast,
} from "@chakra-ui/react";
import AuthLayout from "../../components/components/authLayout";
import signUpImage from "../../assets/oxbridgeAI.jpeg"; // Import your image

const Signup = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate successful signup logic
    localStorage.setItem("isAuthenticated", "true"); // Mark the user as authenticated
    toast({
      title: "Account created.",
      description: "You have successfully signed up!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    navigate("/dashboard"); // Redirect to Dashboard
  };

  return (
    <AuthLayout imageUrl={signUpImage}>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <Text fontSize="2xl" fontWeight="bold" textAlign="center">
            Sign Up
          </Text>
          <FormControl isRequired>
            <FormLabel>Full Name</FormLabel>
            <Input placeholder="Enter your full name" name="name" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="Enter your email" name="email" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              name="password"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              placeholder="Confirm your password"
              name="confirmPassword"
            />
          </FormControl>
          <Button type="submit" color='white' bg="black" size="lg" width="100%">
            Sign Up
          </Button>
          <Text fontSize="sm" textAlign="center">
            Already have an account?{" "}
            <Link as={RouterLink} to="/login" color="blue.500">
              Log in
            </Link>
          </Text>
        </VStack>
      </form>
    </AuthLayout>
  );
};

export default Signup;
