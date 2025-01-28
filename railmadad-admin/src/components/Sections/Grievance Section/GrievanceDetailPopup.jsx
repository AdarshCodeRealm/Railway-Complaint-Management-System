import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

import PropTypes from "prop-types"

export function GrievanceDetailsSheet({ isOpen, onClose, grievance }) {
  if (!grievance) return null
  console.log("isOpen:", isOpen)
  console.log("onClose:", onClose)
  console.log("grievance:", grievance)

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[50vh]">
        <SheetHeader className="mb-4">
          <SheetTitle>Grievance Details</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(50vh-80px)] px-1">
          <div className="flex flex-col  gap-4">
            <div className="flex flex-row justify-start space-x-40">
              {/* Employee Information */}
              <div className="flex flex-col  gap-1">
                <div className="text-sm font-medium text-blue-800">
                  Employee Information
                </div>
                <div className="flex flex-col gap-3">
                  <div>
                    <div className="text-sm text-muted-foreground">ID</div>
                    <div className="font-medium">{grievance.geminiRes.ID}</div>
                  </div>

                  {grievance.grievance.name ? (
                    <div>
                      <div className="text-sm text-muted-foreground">Name</div>
                      <div className="font-medium">Grievance</div>
                    </div>
                  ) : (
                    ""
                  )}
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Severity / Status
                    </div>
                    <div className="font-medium">
                      {grievance.geminiRes.Severity} /{" "}
                      {grievance.geminiRes.Status}
                    </div>
                  </div>
                </div>
              </div>

              {/* contact details */}
              <div className="flex flex-col gap-2">
                <div className="text-sm font-medium text-blue-800">
                  Contact Details
                </div>
                <div className="grid gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Phone</div>
                    <div className="font-medium">
                      {grievance.grievance.mobileNo
                        ? grievance.grievance.mobileNo
                        : "-"}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Email</div>
                    <div className="font-medium">
                      {grievance.grievance.email
                        ? grievance.grievance.email
                        : "-"}
                    </div>
                  </div>
                </div>
              </div>
              {/*  Grievance Details */}
              <div className="flex flex-col gap-2">
                <div className="text-sm font-medium text-blue-800">
                  Grievance Details
                </div>
                <div className="grid gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Department / Grievance Type
                    </div>
                    <div className="font-medium">
                      {grievance.geminiRes.Department} /{" "}
                      {grievance.geminiRes.Type}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Grievance Description
                    </div>
                    <div className="font-medium">
                      {grievance.geminiRes.Description}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-start">
              <div className="flex flex-col gap-2">
                <div className="text-sm font-medium text-blue-800">
                  Railway Details
                </div>
                <div className="flex flex-row gap-10 justify-evenly">
                  <div>
                    <div className="text-sm text-muted-foreground">
                      PNR / Train NO. /Train Name
                    </div>
                    <div className="font-medium">
                      {grievance.railApiRes.data.pnrNumber} /
                      {grievance.railApiRes.data.trainNumber} /
                      {grievance.railApiRes.data.trainName}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Distance / Class
                    </div>
                    <div className="font-medium">
                      {grievance.railApiRes.data.distance}KM /{" "}
                      {grievance.railApiRes.data.journeyClass}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Boarding / Destination
                    </div>
                    <div className="font-medium">
                      {grievance.railApiRes.data.boardingPoint} -{" "}
                      {grievance.railApiRes.data.destinationStation}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Boarding / Destination
                    </div>
                    <div className="font-medium">
                      {grievance.railApiRes.data.boardingPoint} -{" "}
                      {grievance.railApiRes.data.destinationStation}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Live Location
                    </div>
                    <div className="font-medium text-blue-500">
                      {grievance.LiveLocation ? grievance.LiveLocation : "-"}
                    </div>
                  </div>
                </div>
                <div className="flex flex-row gap-28">
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Date of Journey
                    </div>
                    <div className="font-medium">
                      {grievance.railApiRes.data.dateOfJourney}{" "}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Grievance Register At
                    </div>
                    <div className="font-medium">
                      {grievance.grievance.registerAt.slice(0, 10) +
                        " " +
                        grievance.grievance.registerAt.slice(11, 16)}
                      {grievance.grievance.registerAt.slice(11, 13) >= 12
                        ? "PM"
                        : "AM"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

GrievanceDetailsSheet.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,

  grievance: PropTypes.shape({
    // Define the expected shape of the grievance object
    ID: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    // Add more properties as needed
  }).isRequired,
}
