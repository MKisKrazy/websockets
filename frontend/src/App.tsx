
import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [messages,setMessages]=useState([]);

  const wsRef = useRef();

  useEffect(()=>{
    const ws = new WebSocket("ws://localhost:8080");
    ws.onmessage=(event)=>{
      setMessages(m=>[...m,event.data])
    }

    wsRef.current=ws;

    ws.onopen=()=>{
      ws.send(JSON.stringify({
        type:"join",
        payload:{
          roomId:"red"
        }
      }))
    }


 return()=>{
  ws.close();
 }
    
  },[])

  return (
      <div className='h-screen bg-black flex flex-col'>
        
        <div className='h-[90vh] m-2 mt-8'>
          {messages.map((message,msgIndex)=><div key={msgIndex} className=' font-mono mb-8'><span className='bg-white text-black rounded-sm p-4 text-center'>{message}</span></div>)}
        </div>

        <div className='flex justify-between m-2'>
          <input id='message' type='text' className='w-full p-3 rounded-md flex-1'   placeholder='type your message here' />
          <button className='bg-purple-400 rounded-md p-3 px-6' onClick={()=>{
            const message = document.getElementById('message')?.value;
            wsRef.current.send(JSON.stringify({
              type:"chat",
              payload:{
                message:message
              }
            }))
          }}>Send</button>
        </div>
        
      </div>
  )
}

export default App
