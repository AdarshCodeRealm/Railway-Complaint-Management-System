import  { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Bot, X } from 'lucide-react'
import Chatbot from './Form/chatBot'
import { set } from 'date-fns'

export default function AIAssistantButton() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isClosed, setIsClosed] = useState(false)
  const [isChatBot, setIsChatBot] = useState(false)
  
  if (isClosed) return null

  return (
    <div 
      className="fixed bottom-4 left-4 z-50"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <Button 
        className={`bg-[#8B0000] hover:bg-[#A52A2A] text-white rounded-full p-4 shadow-lg transition-all duration-300 ease-in-out ${
          isExpanded ? 'w-64' : 'w-16'
        }`}
        onClick={() => {
          // Add your logic to open the AI assistant here
          setIsChatBot(!isChatBot)
          console.log('Opening AI assistant')
        }}
      >
        <Bot className="h-8 w-8" />
        {isExpanded && (
          <span className="ml-2 whitespace-nowrap overflow-hidden">
            Try our new AI Assistant!
          </span>
        )}
      </Button>
      {isExpanded && (
        <Button
          className="absolute top-0 left-0 bg-transparent hover:bg-[#A52A2A] text-white rounded-full p-1 transform -translate-x-1/2 -translate-y-1/2"
          onClick={(e) => {
            e.stopPropagation()
            setIsClosed(true)
           
          }}
        >
          <X  className="h-4 w-4" />
        </Button>
      )}
      {isChatBot && <Chatbot/>}
    </div>
  )
}