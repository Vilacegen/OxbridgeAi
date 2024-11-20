import { Table, Tbody, Td, Th, Thead, Tr, Slider, Button} from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import PropTypes from 'prop-types'

const EvaluationCriteriaTable = ({ criteria, onEdit, onDelete }) => {
  return (
    <Table variant="simple" colorScheme="teal">
      <Thead>
        <Tr>
          <Th></Th> {/* No title for first column */}
          <Th></Th> {/* No title for second column */}
          <Th></Th> {/* No title for third column */}
          <Th></Th>{/* No title for fourth column */}
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
