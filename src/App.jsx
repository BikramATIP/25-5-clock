import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faSync } from '@fortawesome/free-solid-svg-icons'
import { useReducer } from 'react'
import './App.css'

const STOPPED = 'stopped';
const SESSION = 'session';

export const ACTIONS = {
  INCREMENT_BREAK: 'increment-break',
  DECREMENT_BREAK: 'decrement-break',
  INCREMENT_SESSION: 'increment-session',
  DECREMENT_SESSION: 'decrement-session',
  STOPPED: 'stopped',
  SESSION: 'session',
  BREAK: 'break'
}

const initialState = {
  breakLength: 5,
  sessionLength: 25,
  timeLeft: 25 * 60,
  timerState: STOPPED,
  timerType: SESSION
}

 const reducer = (state, {type, payload: {}}) => {
  
 }

function App() {
 const [{breakLength, sessionLength, timeLeft, timerState, timerType}, dispatch] = useReducer(reducer, initialState)

 

  return (
    <>
    <div className="clock">
      <h1 className="title">25 + 5 Clock</h1>
      <div className="top-controls-container">
       <div className="break-length-container top-control">
        <span id="break-label" className="break-label">Break Length</span>
        <div className="break-controls">
          <button id="break-decrement" className="break-decrement">-</button>
          <span className="break-length length-time" id="break-length">{breakLength}</span>
          <button id="break-increment" className="break-increment">+</button>
        </div>
       </div>
       <div className="session-length-container top-control">
        <div className="session-controls">
         <span id="session-label" className="session-label">Session Length</span>
         <div className="session-controls">
          <button id="session-decrement" className="session-decrement">-</button>
          <span id="session-length" className="session-length length-time">{sessionLength}</span>
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
       <button id="start_stop" className='start_stop'
       onClick={() => null}
       ><FontAwesomeIcon icon={faPlay} /><FontAwesomeIcon icon={faPause} /></button>
       <button id="reset" className='reset'
       onClick={() => null}
       ><FontAwesomeIcon icon={faSync} /></button>
        </div>
    </div>
    </>
  )
}

export default App
