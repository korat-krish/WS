import { useState } from 'react'
import { io } from 'socket.io-client'
import { useEffect } from 'react'

function App() {
const [msg, setMsg] = useState("")
  useEffect(() => {
    const socket = io("http://localhost:3000")

    socket.on("connect", () => {
      console.log("Connected:", socket.id)
    })
    socket.on("message", (data) => {
      setMsg(data);
      console.log(msg);
      `Received message: ${data}`
    })
  }, [])

  return (
    <div className="App">
      <h1>Websocket</h1>
      <p>{msg}</p>
    </div>
  )
}

export default App