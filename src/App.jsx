import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faSync } from '@fortawesome/free-solid-svg-icons'
import { useReducer, useEffect, useRef } from 'react'
import './App.css'
import IncrementDecrementButton from './incrementDecrementButton';
import FunctionButton from './FunctionButton';

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
  TICK: 'tick',
  RESET: 'reset'
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
  return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
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
      return {
        breakLength: initialState.breakLength,
        sessionLength: initialState.sessionLength,
        timeLeft: initialState.timeLeft,
        timerState: STOPPED,
        timerType: SESSION
      };
    case ACTIONS.TOGGLE_STATE:
      return {
        ...state, 
        timerState: state.timerState === STOPPED ? RUNNING : STOPPED
      }
    case ACTIONS.TICK:
      if (state.timeLeft === 0) {
        const newTimerType = state.timerType === SESSION ? BREAK : SESSION;
        const newTimeLeft = newTimerType === SESSION ? 
          state.sessionLength * 60 : 
          state.breakLength * 60;
        
        return {
          ...state,
          timerType: newTimerType,
          timeLeft: newTimeLeft
        };
      }
      return {
        ...state,
        timeLeft: Math.max(0, state.timeLeft - 1) 
      }
    default:
      return state;
  }
}


function App() {
  const [{breakLength, sessionLength, timeLeft, timerState, timerType}, dispatch] = useReducer(reducer, initialState);
  const audioRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (timerState === RUNNING) {
      intervalRef.current = setInterval(() => {
        dispatch({ type: ACTIONS.TICK });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [timerState]);

  useEffect(() => {
    if (timeLeft === 0) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  }, [timeLeft]);

  const handleReset = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    clearInterval(intervalRef.current);
    dispatch({ type: ACTIONS.RESET });
  };

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
       <div id="timer-label" className="timer-label">
         {timerType === SESSION ? 'Session' : 'Break'}
       </div>
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
       dispatch={handleReset}
       firstIcon={faSync}
      />

        </div>
        <audio
        id="beep"
        ref={audioRef}
        src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"
        preload="auto"
        />
    </div>
    </>
  )
}

export default App
