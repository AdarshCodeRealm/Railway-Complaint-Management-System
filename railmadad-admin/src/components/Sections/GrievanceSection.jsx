import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

import { AlertTriangle, Clock, CheckCircle } from "lucide-react"
import { useState } from "react"
function GrievanceSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [severityFilter, setSeverityFilter] = useState("All")
  const mockComplaints = [
    {
      id: 1,
      type: "Housekeeping",
      status: "Open",
      date: "2024-09-24",
      description: "A common grievance regarding Indian train toilets is the lack of cleanliness and proper hygiene maintenance. Passengers often encounter dirty floors, unclean toilets, unpleasant odors, and inadequate cleaning during long journeys.",
      severity: "Medium",
      assignedStaff: null,
    },
    {
      id: 2,
      type: "Cleanliness",
      status: "Closed",
      date: "2024-09-24",
      description: "Unclean compartment",
      severity: "Low",
      assignedStaff: "John Doe",
    },
    {
      id: 3,
      type: "Staff Behavior",
      status: "In Progress",
      date: "2024-09-23",
      description: "Rude staff member",
      severity: "High",
      assignedStaff: "Jane Smith",
    },
    {
      id: 4,
      type: "Reservation",
      status: "Open",
      date: "2024-09-22",
      description: "Incorrect seat allocation",
      severity: "Medium",
      assignedStaff: null,
    },
    {
      id: 5,
      type: "Food Quality",
      status: "Closed",
      date: "2024-09-21",
      description: "Poor quality of food served",
      severity: "Low",
      assignedStaff: "Mike Johnson",
    },
    {
      id: 6,
      type: "Delay",
      status: "Open",
      date: "2024-09-25",
      description: "Train delayed by 2 hours",
      severity: "Medium",
      assignedStaff: null,
    }
  ]

  const filteredComplaints = mockComplaints.filter(
    (complaint) =>
      complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === "All" || complaint.status === statusFilter) &&
      (severityFilter === "All" || complaint.severity === severityFilter)
  )

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Low":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "High":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Open":
        return "bg-blue-500 text-white"
      case "In Progress":
        return "bg-yellow-500 text-white"
      case "Closed":
        return "bg-green-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }
  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-700">
                Open Complaints
              </h2>
              <AlertTriangle className="h-8 w-8 text-blue-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {mockComplaints.filter((c) => c.status === "Open").length}
            </p>
            <p className="text-sm text-gray-500">+2% from last month</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-700">
                In Progress
              </h2>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {mockComplaints.filter((c) => c.status === "In Progress").length}
            </p>
            <p className="text-sm text-gray-500">-5% from last month</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-700">
                Closed Complaints
              </h2>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {mockComplaints.filter((c) => c.status === "Closed").length}
            </p>
            <p className="text-sm text-gray-500">+10% from last month</p>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
            <h2 className="text-2xl font-semibold text-gray-800">
              Recent Complaints
            </h2>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <Input
                type="text"
                placeholder="Search complaints..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border rounded-md p-2"
              >
                <option value="All">All Status</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
              <select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                className="border rounded-md p-2"
              >
                <option value="All">All Severity</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Assigned Staff</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredComplaints.map((complaint) => (
                  <TableRow key={complaint.id}>
                    <TableCell>{complaint.id}</TableCell>
                    <TableCell>{complaint.type}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(complaint.status)}>
                        {complaint.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getSeverityColor(complaint.severity)}>
                        {complaint.severity}
                      </Badge>
                    </TableCell>
                    <TableCell >{complaint.date}</TableCell>
                    <TableCell>{complaint.description}</TableCell>
                    <TableCell>
                      {complaint.assignedStaff || "Unassigned"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </main>
  )
}

export default GrievanceSection
