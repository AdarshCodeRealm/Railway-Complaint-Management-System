import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  TrainIcon,
  SendIcon,
  ImageIcon,
  MicIcon,
  VideoIcon,
} from "lucide-react"

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      content: {
        type: "text",
        content:
          "Hello! How can I assist you with your railway-related query today?",
      },
      isBot: true,
    },
  ])
  const [input, setInput] = useState("")
  const fileInputRef = useRef(null)

  const handleSend = () => {
    if (input.trim()) {
      sendMessage({ type: "text", content: input })
      setInput("")
    }
  }

  const handleFileUpload = (event, type) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target.result
        sendMessage({ type, content })
      }
      reader.readAsDataURL(file)
    }
  }

  const sendMessage = (content) => {
    setMessages((prev) => [...prev, { content, isBot: false }])
    // Here you would typically send the content to your AI backend
    // and then add the response to the messages
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          content: {
            type: "text",
            content:
              "Thank you for your message. Our team is processing your request. Is there anything else I can help you with?",
          },
          isBot: true,
        },
      ])
    }, 1000)
  }

  const renderMessage = (message) => {
    switch (message.content.type) {
      case "image":
        return (
          <img
            src={message.content.content}
            alt="User uploaded image"
            className="max-w-full h-auto rounded-lg"
          />
        )
      case "audio":
        return (
          <audio
            controls
            src={message.content.content}
            className="max-w-full"
          />
        )
      case "video":
        return (
          <video
            controls
            src={message.content.content}
            className="max-w-full h-auto rounded-lg"
          />
        )
      default:
        return message.content.content
    }
  }

  return (
    <Card className="   min-h-screen  flex flex-col ">
      <CardHeader className="bg-[#8B0000]  lg:rounded-xl text-white">
        <CardTitle className="flex items-center ">
          <TrainIcon className="mr-2" />
          RailMadad Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden p-0">
        <ScrollArea className="h-full p-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 p-2 rounded-lg ${
                message.isBot
                  ? "bg-gray-100 text-gray-800"
                  : "bg-[#8B0000] text-white ml-auto"
              } max-w-[80%] ${message.isBot ? "" : "float-right clear-both"}`}
            >
              {renderMessage(message)}
            </div>
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter className="border-t p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSend()
          }}
          className="flex w-full items-center space-x-2"
        >
          <Input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button type="submit" size="icon">
            <SendIcon className="h-4 w-4" />
          </Button>
          <input
            type="file"
            accept="image/*,audio/*,video/*"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) {
                if (file.type.startsWith("image/")) {
                  handleFileUpload(e, "image")
                } else if (file.type.startsWith("audio/")) {
                  handleFileUpload(e, "audio")
                } else if (file.type.startsWith("video/")) {
                  handleFileUpload(e, "video")
                }
              }
            }}
            hidden
            ref={fileInputRef}
          />
          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
          >
            <ImageIcon className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
          >
            <MicIcon className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
          >
            <VideoIcon className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}
