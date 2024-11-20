import { Table, Tbody, Td, Th, Thead, Tr, Tag, TagLabel, TagLeftIcon, Button } from "@chakra-ui/react"
import { StarIcon, ViewIcon } from "@chakra-ui/icons"
import PropTypes from 'prop-types';

const RankingsTable = ({ rankings }) => {
  return (
    <Table variant="simple" colorScheme="teal">
      <Thead>
        <Tr>
          <Th>Rank</Th>
          <Th>Startup Name</Th>
          <Th>Rating</Th>
          <Th></Th> {/* No title for the last column */}
        </Tr>
      </Thead>
      <Tbody>
        {rankings.map((ranking, index) => (
          <Tr key={ranking.id}>
            <Td>{index + 1}</Td>
            <Td>{ranking.startupName}</Td>
            <Td>
              <Tag size="lg" border="1px solid black" borderRadius="full">
                <TagLeftIcon color="yellow" as={StarIcon} />
                <TagLabel>{ranking.rating}</TagLabel>
              </Tag>
            </Td>
            <Td>
              <Button
                leftIcon={<ViewIcon />}
                variant="outline"
                colorScheme="teal"
                size="sm"
              >
                View Detailed Analysis
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}


RankingsTable.propTypes = {
  rankings: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      startupName: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default RankingsTable;
