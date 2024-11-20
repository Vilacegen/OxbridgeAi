import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import JudgesHeader from "../../components/components/JudgesHeader"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useState, useEffect } from "react"
import PropTypes from 'prop-types'
import { useNavigate } from "react-router-dom"

// Initial data definitions remain the same...
const initialScheduleData = [
  { id: "s1", startup: "DataViz AI", startTime: "09:00", endTime: "09:15", room: "Room A" },
  { id: "s2", startup: "AI Analytics", startTime: "10:30", endTime: "10:45", room: "Room B" },
  { id: "s3", startup: "Neural Systems", startTime: "11:15", endTime: "11:30", room: "Room A" },
  { id: "s4", startup: "ML Solutions", startTime: "13:00", endTime: "13:15", room: "Room C" },
  { id: "s5", startup: "Deep Learning Co", startTime: "14:20", endTime: "14:35", room: "Room B" },
  { id: "s6", startup: "AI Vision Corp", startTime: "15:00", endTime: "15:15", room: "Room A" },
  { id: "s7", startup: "Tech Innovators", startTime: "15:45", endTime: "16:00", room: "Room C" },
  { id: "s8", startup: "Data Minds", startTime: "16:30", endTime: "16:45", room: "Room B" },
  { id: "s9", startup: "Smart Systems", startTime: "17:15", endTime: "17:30", room: "Room A" }
].sort((a, b) => {
  const timeA = a.startTime.split(':').map(Number);
  const timeB = b.startTime.split(':').map(Number);
  if (timeA[0] !== timeB[0]) return timeA[0] - timeB[0];
  return timeA[1] - timeB[1];
});

const initialEvaluationsData = [
  { id: "e1", company: "AI Vision Corp", date: "2023-05-15", score: 4.5, nominated: true, toBeMentored: false, meetStartup: false },
  { id: "e2", company: "NLP Innovations", date: "2023-05-15", score: 4.5, nominated: false, toBeMentored: false, meetStartup: true },
  { id: "e3", company: "AI Vision Corp", date: "2023-05-15", score: 4.5, nominated: true, toBeMentored: false, meetStartup: false },
  { id: "e4", company: "AI Vision Corp", date: "2023-05-15", score: 4.5, nominated: false, toBeMentored: true, meetStartup: false },
  { id: "e5", company: "AI Vision Corp", date: "2023-05-15", score: 4.5, nominated: false, toBeMentored: false, meetStartup: true },
  { id: "e6", company: "AI Vision Corp", date: "2023-05-15", score: 4.5, nominated: true, toBeMentored: false, meetStartup: false }
];

// Define prop types for schedule data
const scheduleItemPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  startup: PropTypes.string.isRequired,
  startTime: PropTypes.string.isRequired,
  endTime: PropTypes.string.isRequired,
  room: PropTypes.string.isRequired,
});

// Define prop types for evaluation data
const evaluationItemPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  nominated: PropTypes.bool.isRequired,
  toBeMentored: PropTypes.bool.isRequired,
  meetStartup: PropTypes.bool.isRequired,
});

const useLocalStorageData = (key, initialData) => {
  const [data, setData] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialData;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialData;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, data]);

  return [data, setData];
};

const ScheduleTable = ({ scheduleData, setActiveTab }) => {
  const navigate = useNavigate();

  const handleScoreStartup = (id) => {
    setActiveTab("scoring")
    navigate(`/dashboard/score/${id}`);
  };

  return (
    <Card className="p-4 bg-[#F3F4F6] flex justify-center items-center w-full">
      <div className="w-10/12">
        <h2 className="text-2xl font-semibold mb-4">Today&apos;s Schedule</h2>
        <Table className="bg-white rounded-lg">
          <TableHeader>
            <TableRow>
              <TableHead>Startup</TableHead>
              <TableHead>Start time</TableHead>
              <TableHead>End Time</TableHead>
              <TableHead>Room</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="font-medium">
            {scheduleData.length > 0 ? (
              scheduleData.map((schedule) => (
                <TableRow key={schedule.id}>
                  <TableCell>{schedule.startup}</TableCell>
                  <TableCell>{schedule.startTime}</TableCell>
                  <TableCell>{schedule.endTime}</TableCell>
                  <TableCell>{schedule.room}</TableCell>
                  <TableCell>
                    <Button 
                      className="bg-[#282828] text-white hover:bg-[#282828] hover:opacity-90"
                      onClick={() => handleScoreStartup(schedule.id)}
                    >
                      Score Startup
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <div className="flex justify-center items-center w-full">
                <p className="text-muted-foreground">No schedules for today</p>
              </div>
            )}
          </TableBody>
        </Table>
      </div> 
    </Card>
  );
};


ScheduleTable.propTypes = {
  scheduleData: PropTypes.arrayOf(scheduleItemPropType).isRequired,
  setActiveTab: PropTypes.func.isRequired
};

const PastEvaluations = ({ evaluationsData }) => (
  <Card className="p-4 bg-[#F3F4F6]">
    <h2 className="text-lg font-semibold mb-4">Past Evaluations</h2>
    <Table className="bg-white rounded-lg">
      <TableHeader>
        <TableRow>
          <TableHead>Company</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Score</TableHead>
          <TableHead>Nominated</TableHead>
          <TableHead>To be Mentored</TableHead>
          <TableHead>Meet Startup</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {evaluationsData.map((evaluation) => (
          <TableRow key={evaluation.id}>
            <TableCell>{evaluation.company}</TableCell>
            <TableCell>{evaluation.date}</TableCell>
            <TableCell>
              <span className="rounded-full px-4 py-2 w-16 h-[30px] border-black border flex justify-center items-center gap-2">
                <img src="/star-01.svg" alt="star" width={16} height={16} /> 
                <p>{evaluation.score}</p>
              </span>
            </TableCell>
            <TableCell>
              <span className={`rounded-full px-4 py-2 ${
                evaluation.nominated ? 'bg-[#DCFCE7] text-[#65AF4F]' : 'bg-[#F4F4F5] text-black'
              }`}>
                {evaluation.nominated ? 'Yes' : 'No'}
              </span>
            </TableCell>
            <TableCell>
              <span className={`rounded-full px-4 py-2 ${
                evaluation.toBeMentored ? 'bg-[#DCFCE7] text-[#65AF4F]' : 'bg-[#F4F4F5] text-black'
              }`}>
                {evaluation.toBeMentored ? 'Yes' : 'No'}
              </span>
            </TableCell>
            <TableCell>
              <span className={`rounded-full px-4 py-2 ${
                evaluation.meetStartup ? 'bg-[#DCFCE7] text-[#65AF4F]' : 'bg-[#F4F4F5] text-black'
              }`}>
                {evaluation.meetStartup ? 'Yes' : 'No'}
              </span>
            </TableCell>
            <TableCell>
              <Button variant="secondary" size="sm" className="bg-[#387C80] text-white hover:bg-teal-700">
                Review and Edit
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <div className="mt-4 text-sm text-muted-foreground">
      Show {evaluationsData.length} of 20 evaluations
    </div>
  </Card>
);

PastEvaluations.propTypes = {
  evaluationsData: PropTypes.arrayOf(evaluationItemPropType).isRequired,
};

// Rest of the Dashboard component remains the same...
export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [scheduleData, setScheduleData] = useLocalStorageData("scheduleData", initialScheduleData);
  const [evaluationsData, setEvaluationsData] = useLocalStorageData("evaluationsData", initialEvaluationsData);

  useEffect(() => {
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!localStorage.getItem("scheduleData")) {
        setScheduleData(initialScheduleData);
      }
      if (!localStorage.getItem("evaluationsData")) {
        setEvaluationsData(initialEvaluationsData);
      }
    };

    loadData();
  }, [setEvaluationsData, setScheduleData]);

  
  const handleScoreNextStartup = () => {
    if (scheduleData.length > 0) {
      setActiveTab("scoring")
      navigate(`/dashboard/score/${scheduleData[0].id}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <JudgesHeader activeTab={activeTab} />
      
      <main className="container mx-auto p-6">
        <Tabs 
          defaultValue="dashboard" 
          className="w-full"
          onValueChange={setActiveTab}
        >
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            
            {activeTab === "dashboard" && (
              <Button onClick={()=> handleScoreNextStartup()} variant="sm" className="bg-[#387C80] text-white hover:bg-[#387C80] hover:opacity-85">
                Score next Startup
              </Button>
            )}
          </div>

          <TabsContent value="dashboard">
            <ScheduleTable scheduleData={scheduleData} setActiveTab={setActiveTab} />
          </TabsContent>

          <TabsContent value="history">
            <PastEvaluations evaluationsData={evaluationsData} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}