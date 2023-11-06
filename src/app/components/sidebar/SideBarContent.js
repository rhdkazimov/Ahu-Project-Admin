import {
  Box,
  CloseButton,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  FiHome,
  FiSettings,
  FiUsers,
  FiBell,
  FiFileText,
  FiFilter,
  FiList,
  FiAward,
  FiBook,
  FiPenTool,
  FiUserCheck,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const LinkItems = [
  { name: "Əsas Səhifə", icon: FiHome, route: "/admin/home" },
  { name: "Brendlər", icon: FiAward, route: "/admin/brands" },
  { name: "Kateqoriyalar", icon: FiAward, route: "/admin/categorys" },
  { name: "Məhsullar", icon: FiAward, route: "/admin/products" },
];

export const SidebarContent = ({ onClose, ...rest }) => {
  const NavItem = ({ icon, children, ...rest }) => {
    return (
      <Box
        as="a"
        href="#"
        style={{ textDecoration: "none" }}
        _focus={{ boxShadow: "none" }}
      >
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: "cyan.400",
            color: "white",
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: "white",
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Box>
    );
  };

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <Link key={link.name} to={link.route}>
          <NavItem icon={link.icon}>{link.name}</NavItem>
        </Link>
      ))}
    </Box>
  );
};
