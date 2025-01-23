import { useState } from 'react'
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faSync } from '@fortawesome/free-solid-svg-icons'

function App() {


  return (
    <>
    <div className="clock">
      <h1 className="title">25 + 5 Clock</h1>
      <div className="top-controls-container">
       <div className="break-length-container top-control">
        <span id="break-label" className="break-label">Break Length</span>
        <div className="break-controls">
          <button id="break-decrement" className="break-decrement">-</button>
          <span className="break-length length-time" id="break-length">5</span>
          <button id="break-increment" className="break-increment">+</button>
        </div>
       </div>
       <div className="session-length-container top-control">
        <div className="session-controls">
         <span id="session-label" className="session-label">Session Length</span>
         <div className="session-controls">
          <button id="session-decrement" className="session-decrement">-</button>
          <span id="session-length" className="session-length length-time">25</span>
          <button id="session-increment" className="session-increment">+</button>
         </div>
        </div>
       </div>
      </div>   {/* end of top-controls-container */}
      <div className="timer-container">
       <div id="timer-label" className="timer-label">Session</div>
       <div id="time-left" className="time-left">25:00</div>
      </div>
      <div className='bottom-controls-container'>
       <button id="start_stop" className='start_stop'><FontAwesomeIcon icon={faPlay} /><FontAwesomeIcon icon={faPause} /></button>
       <button id="reset" className='reset'><FontAwesomeIcon icon={faSync} /></button>
        </div>
    </div>
    </>
  )
}

export default App
