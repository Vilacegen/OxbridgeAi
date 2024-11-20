import { useState } from 'react'
import { Box, Button, Flex, Text} from '@chakra-ui/react'
import EvaluationCriteriaTable from './EvaluationCriteriaTable'
import AddEditCriteriaModal from './AddEditCriteriaModal'
import RoundsTable from './roundsTable'

const EvaluationCriteriaManager = () => {
  const [criteria, setCriteria] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [totalWeight, setTotalWeight] = useState(0)
  const [editingIndex, setEditingIndex] = useState(null)

  const openModal = (index = null) => {
    setEditingIndex(index)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingIndex(null)
  }

  const handleSubmit = (newCriteria) => {
    if (editingIndex === null) {
      setCriteria([...criteria, newCriteria])
      setTotalWeight(totalWeight + newCriteria.weight)
    } else {
      const updatedCriteria = [...criteria]
      updatedCriteria[editingIndex] = newCriteria
      setCriteria(updatedCriteria)
      const updatedTotalWeight = updatedCriteria.reduce((acc, item) => acc + item.weight, 0)
      setTotalWeight(updatedTotalWeight)
    }
  }

  const handleDelete = (index) => {
    const updatedCriteria = [...criteria]
    const removedWeight = updatedCriteria.splice(index, 1)[0].weight
    setCriteria(updatedCriteria)
    setTotalWeight(totalWeight - removedWeight)
  }

  return (
    <Box>
      <RoundsTable />
      <Box>
        <Flex>
            <Text fontSize="xl" fontWeight="bold" mb={4}>Evaluation Criteria</Text>
            <Button onClick={() => openModal()}>Add Criteria</Button>
        </Flex>
        <EvaluationCriteriaTable
            criteria={criteria}
            onEdit={openModal}
            onDelete={handleDelete}
        />
        <AddEditCriteriaModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onSubmit={handleSubmit}
            existingCriteria={editingIndex !== null ? criteria[editingIndex] : null}
            index={editingIndex}
            totalWeight={totalWeight}
        />
      </Box>
      <Flex>
            <Text fontSize="xl" fontWeight="bold" mb={4}>Total Weight</Text>
            <Button colorScheme="teal" onClick={() => openModal()}>{totalWeight}</Button>
        </Flex>
    </Box>
  )
}

export default EvaluationCriteriaManager
