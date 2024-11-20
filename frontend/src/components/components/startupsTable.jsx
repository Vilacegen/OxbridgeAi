import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Box,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import PropTypes from 'prop-types';

const StartupTable = ({ startups, onEdit, onDelete }) => {
  return (
    <Box overflowX="auto">
      <Table variant="striped" colorScheme="gray">
        <Thead bg="gray.100">
          <Tr>
            <Th>Startup Name</Th>
            <Th>Category</Th>
            <Th>Team Lead</Th>
            <Th>Email</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {startups.map((startup, index) => (
            <Tr key={index}>
              <Td>{startup.name}</Td>
              <Td>{startup.category}</Td>
              <Td>{startup.teamLead}</Td>
              <Td>{startup.email}</Td>
              <Td>
                <IconButton
                  aria-label="Edit"
                  icon={<EditIcon/>}
                  size="sm"
                  colorScheme="gray.100"
                  onClick={() => onEdit(startup.id)}
                  mr={2}
                />
                <IconButton
                  aria-label="Delete"
                  icon={<DeleteIcon/>}
                  size="sm"
                  colorScheme="gray.100"
                  onClick={() => onDelete(startup.id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};


StartupTable.propTypes = {
  startups: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      teamLead: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default StartupTable;
