import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Icon,
  Flex,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";
import { FiFileText } from "react-icons/fi";

const ImportDataModal = ({ isOpen, onClose, onSubmit, templateLink }) => {
  const [spreadsheetURL, setSpreadsheetURL] = React.useState("");
  const [error, setError] = React.useState("");

  const validateLink = (link) => {
    // Regex for validating a Google Spreadsheet link
    const urlRegex =
      /https:\/\/docs\.google\.com\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/;

    if (!link) {
      return "Spreadsheet URL cannot be empty.";
    }
    if (!urlRegex.test(link)) {
      return "Please provide a valid Google Spreadsheet link.";
    }
    return "";
  };

  const handleSubmit = () => {
    const validationError = validateLink(spreadsheetURL);
    if (validationError) {
      setError(validationError);
    } else {
      setError("");
      onSubmit(spreadsheetURL);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Enter Spreadsheet Link</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb={4}>
            To import a list of startups, enter a link to the spreadsheet with
            their details.
          </Text>

          <FormControl mb={4}>
            <FormLabel>Spreadsheet URL</FormLabel>
            <Input
              placeholder="https://yourspreadsheetlink.com"
              value={spreadsheetURL}
              onChange={(e) => setSpreadsheetURL(e.target.value)}
              isInvalid={error}
            />
          </FormControl>

          {error && (
            <Alert status="error" borderRadius="md" mb={4}>
              <AlertIcon />
              {error}
            </Alert>
          )}

          <Flex align="center" mb={6}>
            <Icon as={WarningIcon} color="orange.400" mr={2} />
            <Text fontSize="sm">
              **NOTE:** Please make sure the spreadsheet is public and
              accessible to everyone.
            </Text>
          </Flex>

          <Box display="flex" alignItems="center" bg="#EDF1F8" p={3} borderRadius="md">
            <Flex align="center" mr={3}>
              <Icon as={FiFileText} boxSize={6} color="#809BCE" />
            </Flex>
            <Box flex="1">
              <Text fontSize="sm" fontWeight="bold">
                Spreadsheet Template
              </Text>
              <Text fontSize="sm" color="gray.600">
                Download this spreadsheet template and fill in the product
                details.
              </Text>
            </Box>
            <Button
              variant="link"
              color="#809BCE"
              onClick={() => window.open(templateLink, "_blank")}
            >
              Download
            </Button>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button bg="#809BCE" color="white" onClick={handleSubmit}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};


ImportDataModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  templateLink: PropTypes.string.isRequired,
};

export default ImportDataModal;


/* EXAMPLE USAGE 
    <ImportDataModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        templateLink="https://docs.google.com/spreadsheets/d/your-template-id/export?format=xlsx"
      />

*/
