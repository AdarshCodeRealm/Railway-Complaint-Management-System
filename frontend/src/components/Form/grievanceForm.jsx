import { useState, useEffect } from "react"
import { format } from "date-fns"
import { toast } from "react-toastify"
import axios from "axios"
import { getCookie } from "@/firebaseConfig"
export default function GrievanceForm() {
  const [mobileNo, setMobileNo] = useState("")
  const [showOtp, setShowOtp] = useState(false)
  const [otp, setOtp] = useState("")
  const [journeyDetails, setJourneyDetails] = useState("")
  const [pnrNo, setPnrNo] = useState("")
  const [type, setType] = useState("")
  const [subType, setSubType] = useState("")
  const [isLogin, setIsLogin] = useState(null)
  
  const [incidentDate, setIncidentDate] = useState(
    new Date("2024-09-24T19:08:00")
  )

  const [file, setFile] = useState(null)
  const [grievanceDescription, setGrievanceDescription] = useState("")

  const typeOptions = ["Housekeeping", "Security", "Staff"]
  const subTypeOptions = {
    Housekeeping: ["Toilet", "Seating"],
    Security: ["Girl Security", "Harassment"],
    Staff: typeOptions,
  }

  useEffect(() => { 
    setIsLogin(getCookie("accessToken"))
  }, [])

  async function sendPostRequest(e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append("mobileNo", mobileNo)


    // Journey Details
    const journeyDetails = {
      pnrNo: pnrNo,
      type: type,
      subType: subType,
      incidentDate: format(incidentDate, "yyyy-MM-dd'T'HH:mm"),
    }
    formData.append("journeyDetails", JSON.stringify(journeyDetails))
    // Attachment
    if (file) {
      formData.append("attachment", file)
    }
    // Grievance Description
    formData.append("grievanceDescription", grievanceDescription)
    const apiUrl =
      "https://railmadad-backend-fxtd.onrender.com/api/v1/users/grievanceRegister"
    // const apiUrl = "http://localhost:8000/api/v1/users/grievanceRegister"
    toast.info("Sending data...", { autoClose: 2000 })
    try {
      const response = await axios.post(apiUrl, formData)
      toast.success("Grievance registered successfully", { autoClose: 4000 })
      console.log(response.data)
      setMobileNo("")
      setPnrNo("")
      setType("")
      setSubType("")
      setIncidentDate(new Date("2024-09-24T19:08:00"))
      setFile(null)
      setGrievanceDescription("")
    } catch (error) {
      toast.error("Error: " + error.message, { autoClose: 2000 })
      console.error("Error:", error.message)
    }
  }
  const handleGetOtp = () => {
    setShowOtp(true)
  }

  const handleFileChange = (e) => {
    e.preventDefault()
    if (e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
    console.log(file)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center font-font1">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <div className="flex justify-between items-center  sm:flex-row flex-col">
          <h1 className="text-3xl font-bold text-[#8b0d32] mb-6">
            Grievance Detail
          </h1>
          <p className="text-sm text-red-500 mb-6">*Mandatory Fields</p>
        </div>
        <form onSubmit={sendPostRequest} className="space-y-6 text-slate-600">
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="flex" htmlFor="mobileNo">
                Mobile No. &nbsp;
                <p className="text-slate-400">(if not logged in ) </p>
              </label>
              <input
                id="mobileNo"
                value={mobileNo}
                type="number"
                placeholder="9811273615"
                onChange={(e) => setMobileNo(e.target.value)}
                className="bg-gray-100 w-full p-2 rounded"
              />
            </div>
            <button
              type="button"
              onClick={handleGetOtp}
              className="bg-[#8b0d32] hover:bg-[#6d0a27] text-white p-2 rounded"
            >
              Get OTP
            </button>
          </div>

          {showOtp && (
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label htmlFor="otp">OTP</label>
                <input
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="OTP"
                  className="w-full p-2 rounded border"
                />
              </div>
              <button
                type="button"
                className="bg-[#b5727e] hover:bg-[#a25d6a] text-white p-2 rounded"
              >
                Submit
              </button>
              <button
                type="button"
                className="bg-[#8b0d32] hover:bg-[#6d0a27] text-white p-2 rounded"
              >
                Resend OTP
              </button>
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="journeyDetails">Journey Details*</label>
              <select
                id="journeyDetails"
                value={journeyDetails}
                onChange={(e) => setJourneyDetails(e.target.value)}
                required
                className="w-full p-2 rounded border"
              >
                <option value="">Select journey details</option>
                <option value="PNR">PNR</option>
                <option value="UTS">UTS</option>
              </select>
            </div>
            <div className="flex-1">
              <label htmlFor="pnrNo">PNR No *</label>
              <input
                id="pnrNo"
                value={pnrNo}
                onChange={(e) => setPnrNo(e.target.value)}
                required
                className="w-full p-2 rounded border"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="type">Type *</label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
                className="w-full p-2 rounded border"
              >
                <option value="">Select type</option>
                {typeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label htmlFor="subType">Sub Type*</label>
              <select
                id="subType"
                value={subType}
                onChange={(e) => setSubType(e.target.value)}
                required
                className="w-full p-2 rounded border"
              >
                <option value="">Select sub type</option>
                {type &&
                  subTypeOptions[type].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="incidentDate">Incident Date *</label>
            <input
              type="datetime-local"
              id="incidentDate"
              value={format(incidentDate, "yyyy-MM-dd'T'HH:mm")}
              onChange={(e) => setIncidentDate(new Date(e.target.value))}
              required
              className="w-full p-2 rounded border"
            />
          </div>

          <div className="md:flex flex-row  justify-between items-center ">
            <div className="flex flex-row gap-2 md:w-2/5">
              <button type="button" className="p-2  border rounded">
                📷
              </button>
              <button type="button" className="p-2 border rounded">
                🎵
              </button>
              <button type="button" className="p-2 border rounded">
                🎥
              </button>
              <button type="button" className="p-2 border rounded">
                📄
              </button>
            </div>
            {/* <label htmlFor="file">Upload File</label> */}
            <div>
              <div className="flex gap-2 md:w-2/5">
                <input
                  type="text"
                  placeholder="Select your file"
                  value={file ? file.name : ""}
                  readOnly
                  className="flex-grow p-2 rounded border"
                />
                <button
                  type="button"
                  onClick={() => document.getElementById("file").click()}
                  className="bg-gray-300 hover:bg-gray-400 p-2 rounded"
                >
                  Browse
                </button>
              </div>

              <input
                id="file"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="grievanceDescription">Grievance Description*</label>
            <textarea
              id="grievanceDescription"
              value={grievanceDescription}
              onChange={(e) => setGrievanceDescription(e.target.value)}
              required
              className="w-full p-2 rounded border"
              rows="4"
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="submit"
              className={`${isLogin?"bg-[#8b0d32] hover:bg-[#6d0a27]":"bg-[#b5727e] hover:bg-[#a25d6a]"}  text-white p-2 rounded`}
            >
              Submit
            </button>
            <button
              type="reset"
              className="bg-gray-300 hover:bg-gray-400 p-2 rounded"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
