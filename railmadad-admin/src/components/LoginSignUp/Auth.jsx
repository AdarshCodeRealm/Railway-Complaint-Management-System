import { useState } from "react"
import bgImg from "../../assets/body-bg.jpg"
import { Link } from "react-router-dom"
import trainIcon from "../../assets/train.png"
import { signUpWithGoogle  } from "@/Config"
export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [error, setError] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    // setError("")
    alert("Submit")

    if (isLogin) {
      //   try {
      //     const result = await signIn('credentials', {
      //       redirect: false,
      //       email,
      //       password,
      //     })
      //     if (result?.error) {
      //       setError(result.error)
      //     } else {
      //       router.push('/dashboard')
      //     }
      //   } catch (error) {
      //     setError('An unexpected error occurred')
      //   }
    } else {
      if (password !== confirmPassword) {
        setError("Passwords don't match")
        return
      }
      // Here you would typically call your API to create the user
      try {
        // Simulating API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        // router.push('/dashboard')
      } catch (error) {
        setError("An unexpected error occurred")
      }
    }
  }

  // const handleGoogleAuth = () => {
  //   // signIn('google', { callbackUrl: '/dashboard' })
  // }

  const handleSendVerification = async () => {
    setIsVerifying(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      alert("Verification code sent!")
    } catch (error) {
      setError("Failed to send verification code")
    } finally {
      setIsVerifying(false)
    }
  }

  const services = [
    {
      name: "Ticket Booking",
      color:
        "https://railmadad.indianrailways.gov.in/madad/final/images/booking-icon-1.png",
    },
    {
      name: "Train Enquiry",
      color:
        "https://railmadad.indianrailways.gov.in/madad/final/images/booking-icon-2.png",
    },
    {
      name: "Reservation Enquiry",
      color:
        "https://railmadad.indianrailways.gov.in/madad/final/images/booking-icon-3.png",
    },
    {
      name: "Retiring Room Booking",
      color:
        " https://railmadad.indianrailways.gov.in/madad/final/images/booking-icon-4.png",
    },
    {
      name: "Indian Railways",
      color:
        "https://railmadad.indianrailways.gov.in/madad/final/images/booking-icon-5.png",
    },
    {
      name: "UTS Ticketing",
      color:
        "https://railmadad.indianrailways.gov.in/madad/final/images/booking-icon-6.png",
    },
    {
      name: "Freight Business",
      color:
        "https://railmadad.indianrailways.gov.in/madad/final/images/booking-icon-7.png",
    },
    {
      name: "Railway Parcel Website",
      color:
        "https://railmadad.indianrailways.gov.in/madad/final/images/booking-icon-2.png",
    },
  ]
  return (
    <div
      style={{
        backgroundImage: `url("${bgImg}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",

        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        zIndex: "-100",
      }}
      className="min-h-screen  bg-gray-100 flex flex-row  py-12 sm:px-6 lg:px-8"
    >
      <div className="w-1/2 justify-center flex items-center">
        <div className="sm:mx-auto flex flex-col sm:w-full sm:max-w-md">
          <div className="flex flex-row  justify-center text-center items-center">
            <img
              className="mx-auto h-20 w-auto"
              src={trainIcon}
              alt="Rail Madad Logo"
            />
            <h2 className="mt-6 text-center text-4xl font-extrabold text-slate-300">
              Rail Madad Admin Panel
            </h2>
          </div>
          <p className="mt-2 text-center text-sm text-gray-400">
            Welcome to the Rail Madad administrative dashboard. This secure
            portal allows authorized personnel to manage and respond to
            passenger inquiries, grievances, and assistance requests
            efficiently.
          </p>
          <div className=" p-4  order-4 sm:order-1">
            <div className="grid grid-cols-4 gap-4 items-center mx-6 mt-10 ">
              {services.map((service, index) => (
                <div
                  key={index}
                  className={` rounded-full mx-3 items-center text-center flex flex-col `}
                >
                  <img src={service.color} className="text-2xl   " />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="my-auto w-1/2 flex justify-start sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white  py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <h2 className="mt-3 text-center text-3xl font-extrabold text-grey-900">
            {isLogin ? "Sign in to your account" : "Create your account"}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 mb-6">
            {isLogin
              ? "Access Rail Madad Dashboard"
              : "Join Rail Madad Dashboard"}
          </p>
          <form className="space-y-3" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            {!isLogin && (
              <>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number (optional)
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="tel"
                      name="phoneNumber"
                      id="phoneNumber"
                      autoComplete="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="+1 (555) 987-6543"
                    />
                    <button
                      type="button"
                      onClick={handleSendVerification}
                      disabled={isVerifying || !phoneNumber}
                      className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-500 text-sm hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      {isVerifying ? "Sending..." : "Verify"}
                    </button>
                  </div>
                </div>

                {phoneNumber && (
                  <div>
                    <label
                      htmlFor="verificationCode"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Verification Code
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="verificationCode"
                        id="verificationCode"
                        autoComplete="one-time-code"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Enter verification code"
                      />
                    </div>
                  </div>
                )}
              </>
            )}

            {error && <div className="text-red-600 text-sm">{error}</div>}

            <div>
              <Link to="/dashboard">
                {" "}
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {isLogin ? "Sign in" : "Sign up"}
                </button>
              </Link>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={signUpWithGoogle}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.3081 10.2303C20.3081 9.55056 20.253 8.86711 20.1354 8.19836H10.7031V12.0492H16.1046C15.8804 13.2911 15.1602 14.3898 14.1057 15.0879V17.5866H17.3282C19.2205 15.8449 20.3081 13.2728 20.3081 10.2303Z"
                    fill="#3F83F8"
                  />
                  <path
                    d="M10.7019 20.0006C13.3989 20.0006 15.6734 19.1151 17.3306 17.5865L14.1081 15.0879C13.2115 15.6979 12.0541 16.0433 10.7056 16.0433C8.09669 16.0433 5.88468 14.2832 5.091 11.9169H1.76562V14.4927C3.46322 17.8695 6.92087 20.0006 10.7019 20.0006V20.0006Z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.08857 11.9169C4.66969 10.6749 4.66969 9.33008 5.08857 8.08811V5.51233H1.76688C0.348541 8.33798 0.348541 11.667 1.76688 14.4927L5.08857 11.9169V11.9169Z"
                    fill="#FBBC04"
                  />
                  <path
                    d="M10.7019 3.95805C12.1276 3.936 13.5055 4.47247 14.538 5.45722L17.393 2.60218C15.5852 0.904587 13.1858 -0.0287217 10.7019 0.000673888C6.92087 0.000673888 3.46322 2.13185 1.76562 5.51234L5.08732 8.08813C5.87733 5.71811 8.09302 3.95805 10.7019 3.95805V3.95805Z"
                    fill="#EA4335"
                  />
                </svg>
                {isLogin ? "Sign in" : "Sign up"} with Google
              </button>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-center text-sm text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
