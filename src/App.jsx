import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faSync } from '@fortawesome/free-solid-svg-icons'
import { useReducer, useEffect } from 'react'
import './App.css'
import IncrementDecrementButton from './incrementDecrementButton';
import FunctionButton from './functionButton';

const STOPPED = 'stopped';
const RUNNING = 'running';
const SESSION = 'session';
const BREAK = 'break';

export const ACTIONS = {
  INCREMENT_BREAK: 'increment-break',
  DECREMENT_BREAK: 'decrement-break',
  INCREMENT_SESSION: 'increment-session',
  DECREMENT_SESSION: 'decrement-session',
  TOGGLE_STATE: 'toggle',
  TICK: 'tick'
}

const initialState = {
  breakLength: 5,
  sessionLength: 25,
  timeLeft: 1500,
  timerState: STOPPED,
  timerType: SESSION
}



const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${minutes}${seconds < 10 ? ':0' : ':'}${seconds}`;
}

const reducer = (state, {type}) => {
  switch(type) {
    case ACTIONS.INCREMENT_BREAK:
      if (state.timerState === RUNNING || state.breakLength === 60) return state;
      return {
        ...state,
        breakLength: state.breakLength + 1,
        timeLeft: state.timerType === BREAK ? (state.breakLength + 1) * 60 : state.timeLeft
      };
    case ACTIONS.DECREMENT_BREAK:
      if (state.breakLength === 1 ||
        state.timerState === RUNNING
      ) return state;
      return {
        ...state,
        breakLength: state.breakLength - 1,
        timeLeft: state.timerType === BREAK ? (state.breakLength - 1) * 60 : state.timeLeft
      }
    case ACTIONS.INCREMENT_SESSION:
      if (state.sessionLength === 60 ||
        state.timerState === RUNNING
      ) return state;
      return {
        ...state,
        sessionLength: state.sessionLength + 1,
        timeLeft: state.timerType === SESSION ? (state.sessionLength + 1) * 60 : state.timeLeft
      }
    case ACTIONS.DECREMENT_SESSION:
      if (state.sessionLength === 1 ||
        state.timerState === RUNNING
      ) return state;
      return {
        ...state,
        sessionLength: state.sessionLength - 1,
        timeLeft: state.timerType === SESSION ? (state.sessionLength - 1) * 60 : state.timeLeft
      }
      case ACTIONS.RESET:
        return initialState;
      case ACTIONS.TOGGLE_STATE:
        return {
          ...state, 
          timerState: state.timerState === STOPPED ? RUNNING : STOPPED
        }
      case ACTIONS.TICK:
        if (state.timeLeft === 0) {
          const audio = new Audio('https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav')
          audio.play();
          return {
            ...state,
            timerType: state.timerType === SESSION ? BREAK : SESSION,
            timeLeft: state.timerType === SESSION ? state.breakLength * 60 : state.sessionLength * 60
          }
        }
        return {
          ...state,
          timeLeft: state.timeLeft - 1
        }
    default:
      return state;
  }
}


function App() {
  const [{breakLength, sessionLength, timeLeft, timerState, timerType}, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let intervalId;
    if (timerState === RUNNING) {
      intervalId = setInterval(() => {
        dispatch({ type: ACTIONS.TICK });
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [timerState]);

  return (
    <>
    <div className="clock">
      <h1 className="title">25 + 5 Clock</h1>
      <div className="top-controls-container">
       <div className="break-length-container top-control">
        <span id="break-label" className="break-label">Break Length</span>
        <div className="break-controls">

          <IncrementDecrementButton
          id="break-decrement"
          className="break-decrement"
          digit="-"
          dispatch={dispatch}
          action={ACTIONS.DECREMENT_BREAK}
          />
 
          <span className="break-length length-time" id="break-length">{breakLength}</span>

          <IncrementDecrementButton
          id="break-increment"
          className="break-increment"
          digit="+"
          dispatch={dispatch}
          action={ACTIONS.INCREMENT_BREAK}
          />

        </div>
       </div>
       <div className="session-length-container top-control">
        <div className="session-controls">
         <span id="session-label" className="session-label">Session Length</span>
         <div className="session-controls">

         <IncrementDecrementButton
          id="session-decrement"
          className="session-decrement"
          digit="-"
          dispatch={dispatch}
          action={ACTIONS.DECREMENT_SESSION}
          />
          
          <span id="session-length" className="session-length length-time">{sessionLength}</span>

          <IncrementDecrementButton
          id="session-increment"
          className="session-increment"
          digit="+"
          dispatch={dispatch}
          action={ACTIONS.INCREMENT_SESSION}
          />

         </div>
        </div>
       </div>
      </div>   {/* end of top-controls-container */}
      <div className="timer-container">
       <div id="timer-label" className="timer-label">Session</div>
       <div id="time-left" className="time-left">{formatTime(timeLeft)}</div>
      </div>
      <div className='bottom-controls-container'>

      <FunctionButton 
       id="start_stop"
       className="start_stop"
       dispatch={dispatch}
       action={ACTIONS.TOGGLE_STATE}
       firstIcon={faPlay}
       secondIcon={faPause}
      />
      
      <FunctionButton
       id="reset"
       className="reset"
       dispatch={dispatch}
       action={ACTIONS.RESET}
       firstIcon={faSync}
      />

        </div>
    </div>
    </>
  )
}

export default App
