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
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";

// Dummy data for schedule table
const scheduleData = [
  { startup: "DataViz AI", startTime: "09:00", endTime: "09:15", room: "Room A" },
  { startup: "AI Analytics", startTime: "10:30", endTime: "10:45", room: "Room B" },
  { startup: "Neural Systems", startTime: "11:15", endTime: "11:30", room: "Room A" },
  { startup: "ML Solutions", startTime: "13:00", endTime: "13:15", room: "Room C" },
  { startup: "Deep Learning Co", startTime: "14:20", endTime: "14:35", room: "Room B" },
  { startup: "AI Vision Corp", startTime: "15:00", endTime: "15:15", room: "Room A" },
  { startup: "Tech Innovators", startTime: "15:45", endTime: "16:00", room: "Room C" },
  { startup: "Data Minds", startTime: "16:30", endTime: "16:45", room: "Room B" },
  { startup: "Smart Systems", startTime: "17:15", endTime: "17:30", room: "Room A" }
].sort((a, b) => {
  // Convert time strings to comparable values for sorting
  const timeA = a.startTime.split(':').map(Number);
  const timeB = b.startTime.split(':').map(Number);
  
  // Compare hours first
  if (timeA[0] !== timeB[0]) {
    return timeA[0] - timeB[0];
  }
  // If hours are equal, compare minutes
  return timeA[1] - timeB[1];
});

// Dummy data for evaluations
const evaluationsData = [
  { company: "AI Vision Corp", date: "2023-05-15", score: 4.5, nominated: true, toBeMentored: false, meetStartup: false },
  { company: "NLP Innovations", date: "2023-05-15", score: 4.5, nominated: false, toBeMentored: false, meetStartup: true },
  { company: "AI Vision Corp", date: "2023-05-15", score: 4.5, nominated: true, toBeMentored: false, meetStartup: false },
  { company: "AI Vision Corp", date: "2023-05-15", score: 4.5, nominated: false, toBeMentored: true, meetStartup: false },
  { company: "AI Vision Corp", date: "2023-05-15", score: 4.5, nominated: false, toBeMentored: false, meetStartup: true },
  { company: "AI Vision Corp", date: "2023-05-15", score: 4.5, nominated: true, toBeMentored: false, meetStartup: false }
];

const ScheduleTable = () => (
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
            scheduleData.map((schedule, index) => (
              <TableRow key={index}>
                <TableCell>{schedule.startup}</TableCell>
                <TableCell>{schedule.startTime}</TableCell>
                <TableCell>{schedule.endTime}</TableCell>
                <TableCell>{schedule.room}</TableCell>
                <TableCell>
                  <Button className="bg-[#282828] text-white hover:bg-[#282828] hover:opacity-90">
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

const PastEvaluations = () => (
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
        {evaluationsData.map((evaluation, index) => (
          <TableRow key={index}>
            <TableCell>{evaluation.company}</TableCell>
            <TableCell>{evaluation.date}</TableCell>
            <TableCell>
              <span className="rounded-full px-4 py-2 w-16 h-[30px] border-black border flex justify-center items-center gap-2">
                <img src="/star-01.svg" alt="star" width={16} height={16} /> 
                <p>{evaluation.score}</p></span>
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
      Show 6 of 20 evaluations
    </div>
  </Card>
);

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

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
              <Button variant="sm" className="bg-[#387C80] text-white hover:bg-[#387C80] hover:opacity-85">
                Score next Startup
              </Button>
            )}
          </div>

          <TabsContent value="dashboard">
            <ScheduleTable />
          </TabsContent>

          <TabsContent value="history">
            <PastEvaluations />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}