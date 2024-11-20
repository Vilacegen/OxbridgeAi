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

const Navbar = ({tagContent, menuItems }) => {
  return (
    <Box as="nav" bg="#252525" px={4} py={2} shadow="md" className="max-h-[58px]">
      <Flex alignItems="center">
        {/* Left: Logo */}
        <Box>
          <img src="/Icon.svg" alt="Company Logo" width={250} height={35} style={{ height: "40px" }} />
        </Box>
        <Spacer />
        {/* Right: Tag, Avatar, and Dropdown */}
        <Flex alignItems="center" gap={4}>
          {/* Tag */}
          <Tag size="lg" className="bg-white" borderRadius="full">
            <TagLabel>{tagContent}</TagLabel>
          </Tag>
          {/* Avatar */}
          <Avatar bg="white" size="sm" icon={<AiOutlineUser fontSize="1rem"  className="text-black" />} />
          {/* Dropdown Menu */}
          <Menu>
            <MenuButton>
              <Icon as={ChevronDownIcon} color="white"  className="text-white" w={8} h={8} />
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