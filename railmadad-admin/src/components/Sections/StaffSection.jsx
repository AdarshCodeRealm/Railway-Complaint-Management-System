import  { useState } from 'react'
import { Search, ChevronDown, Plus, Upload, MoreVertical } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Mock data for employees
const mockEmployees = [
  { id: 1, name: 'Ethan Antonio', department: 'Admin', contact: { phone: '+1 404-233-7961', email: 'admin@centrovo.com' }, requests: 1, status: 'active', avatar: '/placeholder.svg?height=40&width=40' },
  { id: 2, name: 'Louis B. Kimble', department: 'Hardware', contact: { phone: '+1 404-233-7962', email: 'louis@centrovo.com' }, requests: 0, status: 'inactive', avatar: '/placeholder.svg?height=40&width=40' },
  { id: 3, name: 'Calvin C. Landry', department: 'Software', contact: { phone: '+1 404-233-7963', email: 'calvin@centrovo.com' }, requests: 0, status: 'busy', avatar: '/placeholder.svg?height=40&width=40' },
  { id: 4, name: 'Mabel L. Lee', department: 'Marketing', contact: { phone: '+1 404-233-7964', email: 'mabel@centrovo.com' }, requests: 3, status: 'active', avatar: '/placeholder.svg?height=40&width=40' },
]

function EmployeeManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [fieldFilter, setFieldFilter] = useState('All')

  const filteredEmployees = mockEmployees.filter(employee =>
    (employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
     employee.contact.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === 'All' || employee.status === statusFilter) &&
    (fieldFilter === 'All' || employee.department === fieldFilter)
  )

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
      case 'busy':
        return <Badge className="bg-yellow-100 text-yellow-800">Busy</Badge>
      default:
        return null
    }
  }

  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">COMPANY EMPLOYEES</h2>
        <div className="flex space-x-2">
          <Button variant="ghost" className="text-indigo-600 hover:text-indigo-800">Employees</Button>
          <Button variant="ghost" className="text-gray-600 hover:text-gray-800">Live View</Button>
          <Button variant="ghost" className="text-gray-600 hover:text-gray-800">Org Chart</Button>
        </div>
      </div>
      <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
        <div className="flex flex-wrap items-center space-x-2 gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search Employee"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-64"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center">
                Status: {statusFilter}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => setStatusFilter('All')}>All</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setStatusFilter('active')}>Active</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setStatusFilter('inactive')}>Inactive</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setStatusFilter('busy')}>Busy</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center">
                Field: {fieldFilter}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => setFieldFilter('All')}>All</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setFieldFilter('Admin')}>Admin</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setFieldFilter('Hardware')}>Hardware</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setFieldFilter('Software')}>Software</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setFieldFilter('Marketing')}>Marketing</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex space-x-2">
          <Button className="bg-green-500 hover:bg-green-600 text-white">
            <Plus className="mr-2 h-4 w-4" />
            Add Employees
          </Button>
          <Button variant="outline" className="text-gray-600">
            <Upload className="mr-2 h-4 w-4" />
            Import Employees
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Requests</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredEmployees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.id}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={employee.avatar} alt={employee.name} />
                    <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-indigo-600">{employee.name}</span>
                </div>
              </TableCell>
              <TableCell>{employee.department}</TableCell>
              <TableCell>
                <div>
                  <div>{employee.contact.phone}</div>
                  <div className="text-sm text-gray-500">{employee.contact.email}</div>
                </div>
              </TableCell>
              <TableCell>
                {employee.requests > 0 && (
                  <Badge className="bg-green-100 text-green-800">{employee.requests}</Badge>
                )}
              </TableCell>
              <TableCell>{getStatusBadge(employee.status)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default EmployeeManagement