"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, Option } from "@shadcn/ui"
import { Input } from "@shadcn/ui"
import { Text } from "@shadcn/ui"
import PropTypes from 'prop-types';


ScheduleForm.propTypes = {
    startups: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
    judges: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
    rooms: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
    rounds: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
    onSubmit: PropTypes.func.isRequired,
  }

export function ScheduleForm({ startups, judges, rooms, rounds, onSubmit }) {
  const [formData, setFormData] = useState({
    startup: "",
    judges: [],
    startDate: null,
    endDate: null,
    startTime: "",
    endTime: "",
    room: "",
    remoteLink: "",
    round: "",
  })

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    if (type === "checkbox") {
      setFormData((prevData) => {
        const updatedJudges = checked
          ? [...prevData.judges, value]
          : prevData.judges.filter((judge) => judge !== value)
        return { ...prevData, [name]: updatedJudges }
      })
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }))
    }
  }

  // Custom date logic to check if the end date/time is valid
  const validateTimes = () => {
    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      return false
    }
    if (
      new Date(formData.startDate).getTime() === new Date(formData.endDate).getTime() &&
      formData.startTime === formData.endTime
    ) {
      return false
    }
    return true
  }

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateTimes()) {
      alert("Invalid start or end time")
      return
    }

    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Startup Name */}
      <div className="flex flex-col">
        <label>Select Startup Name</label>
        <Select name="startup" value={formData.startup} onChange={handleChange}>
          <Option disabled>Select a startup</Option>
          {startups.map((startup) => (
            <Option key={startup.id} value={startup.id}>
              {startup.name}
            </Option>
          ))}
        </Select>
      </div>

      {/* Judges */}
      <div className="flex flex-col">
        <label>Select Judges</label>
        <Select
          name="judges"
          value={formData.judges}
          onChange={handleChange}
          multiple
        >
          {judges.map((judge) => (
            <Option key={judge.id} value={judge.id}>
              {judge.name}
            </Option>
          ))}
        </Select>
        <Text className="text-sm text-gray-500">* Minimum of 3 judges</Text>
      </div>

      {/* Start Date & Time */}
      <div className="flex gap-6">
        <div className="flex flex-col">
          <label>Start Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className="w-[240px] pl-3 text-left font-normal"
              >
                {formData.startDate
                  ? format(new Date(formData.startDate), "PPP")
                  : "Pick a start date"}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                selected={formData.startDate}
                onSelect={(date) => setFormData({ ...formData, startDate: date })}
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col">
          <label>Start Time</label>
          <Select
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
          >
            {["00:00", "00:30", "01:00", "01:30", "02:00", "02:30"].map((time) => (
              <Option key={time} value={time}>
                {time}
              </Option>
            ))}
          </Select>
        </div>
      </div>

      {/* End Date & Time */}
      <div className="flex gap-6">
        <div className="flex flex-col">
          <label>End Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className="w-[240px] pl-3 text-left font-normal"
              >
                {formData.endDate
                  ? format(new Date(formData.endDate), "PPP")
                  : "Pick an end date"}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                selected={formData.endDate}
                onSelect={(date) => setFormData({ ...formData, endDate: date })}
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col">
          <label>End Time</label>
          <Select
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
          >
            {["00:00", "00:30", "01:00", "01:30", "02:00", "02:30"].map((time) => (
              <Option key={time} value={time}>
                {time}
              </Option>
            ))}
          </Select>
        </div>
      </div>

      {/* Room */}
      <div className="flex flex-col">
        <label>Room</label>
        <Select
          name="room"
          value={formData.room}
          onChange={handleChange}
        >
          {rooms.map((room) => (
            <Option key={room.id} value={room.id}>
              {room.name}
            </Option>
          ))}
          <Option value="Remote">Remote Room</Option>
        </Select>
        {formData.room === "Remote" && (
          <div className="mt-2">
            <label>Room Link</label>
            <Input
              name="remoteLink"
              value={formData.remoteLink}
              onChange={handleChange}
              placeholder="Zoom/Google Meet link"
            />
          </div>
        )}
        <Text className="text-sm text-gray-500">* Paste room link if Remote</Text>
      </div>

      {/* Round */}
      <div className="flex flex-col">
        <label>Select Round</label>
        <Select
          name="round"
          value={formData.round}
          onChange={handleChange}
        >
          {rounds.map((round) => (
            <Option key={round.id} value={round.id}>
              {round.name}
            </Option>
          ))}
        </Select>
      </div>

      {/* Submit Button */}
      <Button type="submit">Schedule</Button>
    </form>
  )
}
