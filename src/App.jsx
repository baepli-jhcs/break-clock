import { bindActionCreators } from '@reduxjs/toolkit';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { clockActions } from './state/slices/clock';
import { breakActions } from './state/slices/break';
import "./App.css";

function App() {
  const clockValue = useSelector(state => state.clockReducer);
  const breakValue = useSelector(state => state.breakReducer);
  const dispatch = useDispatch();
  const { incrementClock, decrementClock, restartClock, resetClock, timeClock } = bindActionCreators(clockActions, dispatch);
  const { incrementBreak, decrementBreak, restartBreak, resetBreak, timeBreak } = bindActionCreators(breakActions, dispatch);
  const [play, setPlay] = useState(false);
  const [settings, setSettings] = useState(false);
  const currentPlay = useRef("Session");
  const audio = useRef(<audio id="beep" preload="auto" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" />);
  const decreaseTime = () => {
    if (clockValue[1] === "00:00") {
      currentPlay.current = "Break";
      restartClock();
    } else if (breakValue[1] === "00:00") {
      currentPlay.current = "Session";
      restartBreak();
    } else if (currentPlay.current === "Session") {
      if (clockValue[1] === "00:01") document.getElementById('beep').play();
      timeClock();
    } else if (currentPlay.current === "Break") {
      if (breakValue[1] === "00:01") document.getElementById('beep').play();
      timeBreak();
    }
  }
  useEffect(() => {
    if (!play) return;
    const id = setInterval(decreaseTime, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line
  }, [play, clockValue[1], breakValue[1]]);
  return (
    <div className="container">
      <div className="main-container">
        <div className="timer-container">
          <div id="timer-label">
            {currentPlay.current === "Break" ? "Take a break!" : "Time to focus!"}
          </div>
          <div id="time-left">
            {currentPlay.current === "Break" ? breakValue[1] : clockValue[1]}
          </div>
          <button id="start_stop" className="main-controls" onClick={() => { setPlay(!play) }}>{play ? "Pause" : "Play"}</button>
          <button id="reset" className="main-controls" onClick={() => {
            document.getElementById("beep").pause();
            document.getElementById("beep").currentTime = 0;
            currentPlay.current = "Session";
            resetBreak();
            resetClock();
            setPlay(false);
          }}>Reset</button>
        </div>
        {
          <div id="timer-settings">
            <div id="session-label">
              Session Length:
              <div id="session-length">
                {parseInt(clockValue[0].substring(0, 2))}
              </div>
              <button id="session-increment" onClick={() => { if (!play && parseInt(clockValue[0].substring(0, 2)) < 60) incrementClock() }}>+</button>
              <button id="session-decrement" onClick={() => { if (!play && parseInt(clockValue[0].substring(0, 2)) > 1) decrementClock() }}>-</button>
            </div>
            <div id="break-label">
              Break Length:
              <div id="break-length">
                {parseInt(breakValue[0].substring(0, 2))}
              </div>
              <button id="break-increment" onClick={() => { if (!play && parseInt(breakValue[0].substring(0, 2)) < 60) incrementBreak() }}>+</button>
              <button id="break-decrement" onClick={() => { if (!play && parseInt(breakValue[0].substring(0, 2)) > 1) decrementBreak() }}>-</button>
            </div>
          </div>
        }
      </div>
      {audio.current}
    </div>
  );
}

export default App;
