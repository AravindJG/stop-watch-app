import React, { useEffect, useRef, useState } from 'react'

function StopWatch() {
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const interIdRef = useRef(null);
    const startIntervalRef = useRef(0);
    useEffect(()=>{
        if(isRunning){
            interIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startIntervalRef.current);
            }, 10);
        }
        return()=>{
            clearInterval(interIdRef.current);
        }
    },[isRunning])
    function start(){
        setIsRunning(true);
        startIntervalRef.current = Date.now() - elapsedTime;
    }
    function stop(){
        setIsRunning(false);
    }
    function reset(){
        setIsRunning(false);
        setElapsedTime(0);
    }
    function formatTime(){
        // let hours = Math.floor(elapsedTime/(1000 * 60 * 60));
        let minutes = Math.floor(elapsedTime/(1000 * 60) % 60);
        let seconds = Math.floor(elapsedTime/(1000) % 60);
        let milliseconds = Math.floor((elapsedTime % 1000) / 10);
        // hours = String(hours).padStart(2,"0");
        minutes = String(minutes).padStart(2,"0");
        seconds = String(seconds).padStart(2,"0");
        milliseconds = String(milliseconds).padStart(2,"0");

        return `${minutes}:${seconds}:${milliseconds}`
    }
  return (
    <div className='stop-watch'>
        <div className='display'>{formatTime()}</div>
        <div className='controls'>
            <button className='start-button' 
                    onClick={start}
                    >Start</button>
            <button className='stop-button' 
                    onClick={stop}
                    >Stop</button>
            <button className='reset-button' 
                    onClick={reset}
                    >Reset</button>
        </div>
    </div>
  )
}

export default StopWatch