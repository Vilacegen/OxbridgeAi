import {
  Box,
  Flex,
  Spacer,
  Tag,
  TagLabel,
  Avatar,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import PropTypes from 'prop-types';
import { AiOutlineUser } from "react-icons/ai";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom"; // Import Link for routing

const Navbar = ({ logo, tagContent, menuItems }) => {
  return (
    <Box as="nav" bg="gray.50" px={4} py={2} shadow="md">
      <Flex alignItems="center">
        {/* Left: Logo */}
        <Box>
          <img src={logo} alt="Company Logo" style={{ height: "40px" }} />
        </Box>
        <Spacer />
        {/* Right: Tag, Avatar, and Dropdown */}
        <Flex alignItems="center" gap={4}>
          {/* Tag */}
          <Tag size="lg" colorScheme="red" borderRadius="full">
            <TagLabel>{tagContent}</TagLabel>
          </Tag>
          {/* Avatar */}
          <Avatar bg="gray.500" icon={<AiOutlineUser fontSize="1.5rem" />} />
          {/* Dropdown Menu */}
          <Menu>
            <MenuButton>
              <Icon as={ChevronDownIcon} w={8} h={8} />
            </MenuButton>
            <MenuList>
              {menuItems.map(({ label, to }, index) => (
                <MenuItem key={index}>
                  <Link to={to}>{label}</Link>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};


Navbar.propTypes = {
  logo: PropTypes.string.isRequired,
  tagContent: PropTypes.string.isRequired,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Navbar;


/*  EXAMPLE USAGE

const App = () => {
  const logoUrl = "https://via.placeholder.com/150"; // Replace with your company logo URL
  const tagContent = "Admin";
  const menuItems = [
    { label: "Home", to: "/" },
    { label: "Profile", to: "/profile" },
    { label: "Settings", to: "/settings" },
  ];

  return (
    <ChakraProvider>
      <Router>
        <Navbar logo={logoUrl} tagContent={tagContent} menuItems={menuItems} />
        <Routes>
*/