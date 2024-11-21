import { Table, Tbody, Td, Th, Thead, Tr, Slider, Button, Box, Text } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types'

const EvaluationCriteriaTable = ({ criteria, onEdit, onDelete }) => {
  return (
    <Box bg='white' border='1px' borderColor='black' padding='5px' borderRadius='md'>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        {/* Title on the Left */}
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Evaluation Criteria</h2>
      </div>

      {/* No Criteria Message */}
      {criteria.length === 0 ? (
        <Box textAlign="center" p={5} border="1px" borderColor="gray.200" borderRadius="md">
          <Text fontSize="lg" fontWeight="bold" mb={3}>Oops! Seems no criteria has been added.</Text>
        </Box>
      ) : (
        <Table variant="simple" colorScheme="teal">
          <Thead>
            <Tr>
              <Th></Th>
              <Th></Th>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {criteria.map((item, index) => (
              <Tr key={index}>
                <Td>
                  <div>{item.name}</div>
                  <div>
                    <Button variant="link" colorScheme="blue" isDisabled>
                      Subquestions
                    </Button>
                  </div>
                </Td>
                <Td>
                  <Slider value={item.weight} isReadOnly>
                    <Slider.Track>
                      <Slider.FilledTrack />
                    </Slider.Track>
                    <Slider.Thumb />
                  </Slider>
                </Td>
                <Td>{item.weight}%</Td>
                <Td>
                  <Button
                    leftIcon={<EditIcon />}
                    colorScheme="blue"
                    onClick={() => onEdit(index)}
                  >
                    Edit
                  </Button>
                  <Button
                    leftIcon={<DeleteIcon />}
                    colorScheme="red"
                    onClick={() => onDelete(index)}
                    ml={2}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  )
}

EvaluationCriteriaTable.propTypes = {
  criteria: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      weight: PropTypes.number.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default EvaluationCriteriaTable;
