/* eslint-disable react/prop-types */
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Box,
  Text,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

// In RoundsTable, update the onEdit function to pass the index instead of the round object
const RoundsTable = ({ rounds, onEdit, onDelete }) => {
  return (
    <Box overflowX="auto">
      {rounds.length === 0 ? (
        <Box textAlign="center" p={5} border="1px" borderColor="gray.200" borderRadius="md">
          <Text fontSize="lg" fontWeight="bold" mb={3}>
            Oops! Seems no round has been added.
          </Text>
        </Box>
      ) : (
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
                    onClick={() => onEdit(index)} // Pass index instead of round object
                  />
                  <IconButton
                    aria-label="Delete Round"
                    icon={<DeleteIcon />}
                    size="sm"
                    colorScheme="red"
                    onClick={() => onDelete(index)} // Pass index to delete
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default RoundsTable;