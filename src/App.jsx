import { useState } from 'react'
import './App.css'

function App() {


  return (
    <>
    <div className="clock">
      <h1 className="title">Title</h1>
      <div className="top-controls-container">
       <div className="break-length-container">
        <span id="break-label" className="break-label">Break Length</span>
        <div className="break-controls">
          <button id="break-decrement" className="break-decrement">-</button>
          <span className="break-length" id="break-length">5</span>
          <button id="break-increment" className="break-increment">+</button>
        </div>
       </div>
       <div className="session-length-container">
        <span id="session-label" className="session-label">Session Length</span>
        <div className="session-controls">
         <span id="session-label" className="session-label">Session Length</span>
         <div className="session-controls">
          <button id="session-decrement" className="session-decrement">-</button>
          <span id="session-length" className="session-length">25</span>
          <button id="session-increment" className="session-increment">+</button>
         </div>
        </div>
       </div>
      </div>   {/* end of top-controls-container */}
      <div className="timer-container">
       <div id="timer-label" classname="timer-label">Session</div>
       <div id="time-left" className="time-left">25:00</div>
      </div>
      <div className='bottom-controls-container'>
       <button id="start_stop" className='start_stop'>Start/Stop</button>
       <button id="reset" className='reset'>Reset</button>
        </div>
    </div>
    </>
  )
}

export default App
