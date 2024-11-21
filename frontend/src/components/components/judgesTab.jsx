import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  InputRightElement,
  InputGroup,
} from '@chakra-ui/react';
import { AddIcon, SearchIcon } from '@chakra-ui/icons';
import StartupTable from './startupsTable';
import { DownloadIcon, UploadIcon } from 'lucide-react';
import SpreadsheetLinkCard from '../components/importFromSpreadsheet';
import JudgesTable from './judgesTable';

const JudgesTab = () => {
  const [judges, setJudges] = useState([]); // Stores the startup list
  const [searchQuery, setSearchQuery] = useState(''); // Stores the search input
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [modalData, setModalData] = useState({ id: '',idNumber:"", name: '', expertise: '', email: '', currentLoad: '' }); // Modal form data
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const dummyJudges = [
    {
      id: '1',
      idNumber: 'JD001',
      name: 'John Doe',
      expertise: 'Technology',
      email: 'john.doe@example.com',
      currentLoad: 5,
    },
    {
      id: '2',
      idNumber: 'JD002',
      name: 'Jane Smith',
      expertise: 'Healthcare',
      email: 'jane.smith@example.com',
      currentLoad: 3,
    },
    {
      id: '3',
      idNumber: 'JD003',
      name: 'Michael Johnson',
      expertise: 'Finance',
      email: 'michael.johnson@example.com',
      currentLoad: 4,
    },
    {
      id: '4',
      idNumber: 'JD004',
      name: 'Emily Davis',
      expertise: 'Education',
      email: 'emily.davis@example.com',
      currentLoad: 2,
    },
    {
      id: '5',
      idNumber: 'JD005',
      name: 'William Taylor',
      expertise: 'Sustainability',
      email: 'william.taylor@example.com',
      currentLoad: 6,
    },
    {
      id: '6',
      idNumber: 'JD006',
      name: 'Olivia Martinez',
      expertise: 'Urban Planning',
      email: 'olivia.martinez@example.com',
      currentLoad: 4,
    },
    {
      id: '7',
      idNumber: 'JD007',
      name: 'James White',
      expertise: 'Agriculture',
      email: 'james.white@example.com',
      currentLoad: 3,
    },
    {
      id: '8',
      idNumber: 'JD008',
      name: 'Sophia Green',
      expertise: 'Retail',
      email: 'sophia.green@example.com',
      currentLoad: 5,
    },
    {
      id: '9',
      idNumber: 'JD009',
      name: 'Benjamin Scott',
      expertise: 'Construction',
      email: 'benjamin.scott@example.com',
      currentLoad: 2,
    },
    {
      id: '10',
      idNumber: 'JD010',
      name: 'Charlotte Lee',
      expertise: 'Healthcare',
      email: 'charlotte.lee@example.com',
      currentLoad: 3,
    },
  ];
    

  // Fetch startups (simulate API call)
  useEffect(() => {
    const fetchJudges = async () => {
      // Replace with API call
      const data = dummyJudges;
      setJudges(data);
    };
    fetchJudges();
  }, []);

  // Add or edit a startup
  const handleSaveStartup = () => {
    if (modalData.id) {
      // Edit logic
      setJudges((prev) =>
        prev.map((startup) =>
          startup.id === modalData.id ? { ...startup, ...modalData } : startup
        )
      );
    } else {
      // Add logic
      setJudges((prev) => [
        ...prev,
        { ...modalData, id: (Math.random() * 10000).toFixed(0) }, // Generate random ID
      ]);
    }
    setIsModalOpen(false);
    setModalData({ id: '',idNumber:"", name: '', expertise: '', email: '', currentLoad: '' });
  };

  // Delete a startup
  const handleDeleteStartup = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this judge?');
    if (confirmDelete) {
        setJudges((prev) => prev.filter((startup) => startup.id !== id));
      }
  };

  // Open modal for adding or editing
  const openJudgesModal = (startup = { id: '',idNumber: "",  name: '', expertise: '', email: '', currentLoad: '' }) => {
    setModalData(startup);
    setIsModalOpen(true);
  };

  // Filter startups based on search query
  const filteredJudges = judges.filter(
    (judge) =>
      judge.idNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      judge.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      judge.expertise.toLowerCase().includes(searchQuery.toLowerCase()) ||
      judge.email.toLowerCase().includes(searchQuery.toLowerCase())||
      judge.currentLoad == searchQuery
  );
  
  
  const openImportModal = () => setIsImportModalOpen(true);

  return (
    <Box>
      {/* Search and Buttons */}
      <Stack direction="row" spacing="4" justifyContent="space-between" marginY='10px'>
        <InputGroup w='400px'>
          <InputRightElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputRightElement>
          <Input
            variant="outline"
            placeholder="Search judges..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>
        <Box>
          <Button
            leftIcon={<AddIcon />}
            color="white"
            bg="black"
            mx="2"
            onClick={() => openJudgesModal()}
          >
            Add Judge
          </Button>
          <Button leftIcon={<DownloadIcon/>} color="white" bg="black" mx="2" onClick={openImportModal}>
            Import
          </Button>
          <Button leftIcon={<UploadIcon/>} color="white" bg="black" mx="2" >
            Export
          </Button>
        </Box>
      </Stack>

      {/* Table */}
      <Box bg="blackAlpha.100" paddingY="8px" paddingX="10%" borderRadius="10px">
        <JudgesTable
          judges={filteredJudges}
          onEdit={openJudgesModal}
          onDelete={handleDeleteStartup}
        />
      </Box>

      {/* Modal for Add/Edit */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalData.id ? 'Edit Judge' : 'Add Judge'}</ModalHeader>
          <ModalBody>
            <Stack spacing="4">
              <Input
                placeholder="idNumber"
                value={modalData.idNumber}
                onChange={(e) => setModalData({ ...modalData, idNumber: e.target.value })}
              />
              <Input
                placeholder="name"
                value={modalData.name}
                onChange={(e) => setModalData({ ...modalData, name: e.target.value })}
              />
              <Input
                placeholder="Expertise"
                value={modalData.expertise}
                onChange={(e) => setModalData({ ...modalData, expertise: e.target.value })}
              />
              <Input
                placeholder="Email"
                value={modalData.email}
                onChange={(e) => setModalData({ ...modalData, email: e.target.value })}
              />
              <Input
                placeholder="Current Load"
                value={modalData.currentLoad}
                onChange={(e) => setModalData({ ...modalData, currentLoad: e.target.value })}
              />
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSaveStartup}>
              Save
            </Button>
            <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Modal for Import */}
      <Modal isOpen={isImportModalOpen} onClose={() => setIsImportModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
            <SpreadsheetLinkCard 
                onClose={() => setIsImportModalOpen(false)} 
                templateUrl="https://docs.google.com/spreadsheets/d/.../edit?gid=0#gid=0" 
                descriptionText="To import a list of judges, enter in a link to the spreadsheet with their details." 
            />
        </ModalContent>
    </Modal>
    </Box>
  );
};

export default JudgesTab;
