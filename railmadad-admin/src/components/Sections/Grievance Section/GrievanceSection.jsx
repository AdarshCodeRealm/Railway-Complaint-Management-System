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
import axios from "axios"
import { AlertTriangle, Clock, CheckCircle } from "lucide-react"
import { GrievanceDetailsSheet } from "./GrievanceDetailPopup"
import { useState, useEffect } from "react"
function GrievanceSection() {
  const [incidents, setIncidents] = useState([])

  useEffect(() => {
    const fetchIncidents = async () => {
      const response = await axios.get(
        "http://localhost:8000/api/v1/users/fetchForwadedGrievances"
      ) // Replace with your actual API endpoint
      console.log(response.data)
      console.log(response.data[0].grievance)

      setIncidents(response.data)
    }

    fetchIncidents()
  }, [])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [severityFilter, setSeverityFilter] = useState("All")
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

  const [selectedGrievance, setSelectedGrievance] = useState(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)


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
    <main className="flex-1 overflow-x-hidden overflow-y-scroll h-screen  pb-10 bg-gray-100">
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
              {incidents.filter((c) => c.status === "Open").length}
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
              {incidents.filter((c) => c.status === "In Progress").length}
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
              {incidents.filter((c) => c.status === "Closed").length}
            </p>
            <p className="text-sm text-gray-500">+10% from last month</p>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2 space-y-4 md:space-y-0">
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

          <p className="text-sm text-gray-500">
            Showing {incidents.filter((c) => c.status === "Open").length} of
            {incidents.length} complaints are open
          </p>
          {/* //section 3  */}
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Live Status</TableHead>
                  <TableHead>Assigned Staff</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {incidents.map((incidents) => (
                  <TableRow
                    key={incidents._id}
                    onClick={()=>{setSelectedGrievance(incidents); setIsSheetOpen(true);}}
                  >
                    <TableCell>{incidents.geminiRes.ID}</TableCell>
                    <TableCell>{incidents.geminiRes.Type}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(incidents.Status)}>
                        {incidents.geminiRes.Status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={getSeverityColor(
                          incidents.geminiRes.Severity
                        )}
                      >
                        {incidents.geminiRes.Severity}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(incidents.grievance.registerAt).toDateString()}
                      <br />
                      {new Date(
                        incidents.grievance.registerAt
                      ).toLocaleTimeString()}
                    </TableCell>
                    <TableCell>{incidents.geminiRes.Description}</TableCell>
                    <TableCell className="flex flex-row items-center gap-3">
                      {" "}
                      <div className=" bg-red-500 h-2 w-2 mt-1 rounded-full animate-ping  " />
                      Mumbai
                    </TableCell>
                    <TableCell>
                      {incidents.AssignedStaff || "Unassigned"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <GrievanceDetailsSheet
            isOpen={isSheetOpen}
            onClose={() => setIsSheetOpen(false)}
            grievance={selectedGrievance}
          />
        </div>
      </div>
    </main>
  )
}

export default GrievanceSection
