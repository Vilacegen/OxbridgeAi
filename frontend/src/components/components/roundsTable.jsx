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
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import PropTypes from 'prop-types';

const RoundsTable = ({ rounds, onEdit, onDelete }) => {
  return (
    <Box overflowX="auto">
      <Table variant="simple" colorScheme="gray" size="md">
        <Thead>
          <Tr>
            <Th>Round Name</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {rounds.map((round, index) => (
            <Tr key={index}>
              <Td>{round.name}</Td>
              <Td>
                <IconButton
                  aria-label="Edit Round"
                  icon={<EditIcon />}
                  size="sm"
                  mr={2}
                  onClick={() => onEdit(round)}
                />
                <IconButton
                  aria-label="Delete Round"
                  icon={<DeleteIcon />}
                  size="sm"
                  colorScheme="red"
                  onClick={() => onDelete(round)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};


RoundsTable.propTypes = {
  rounds: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default RoundsTable;