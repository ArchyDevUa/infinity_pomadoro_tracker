import React,{useState, useEffect} from 'react'

function Pomadoro() {
    const [minutes,setMinutes] = useState(24);
    const [seconds,setSeconds] = useState(59);
    const [displayMessage,setDisplayMessage] = useState(false);
    const [isPause,setIsPause] = useState(false)

    useEffect(() => {
        let interval = setInterval(()=>{
            clearInterval(interval)
            if(isPause === true){
                if(seconds === 0){
                    if(minutes !== 0){
                        setSeconds(59)
                        setMinutes(minutes-1)
                    }else{
                        let minutes = displayMessage ? 24 : 4;
                        let seconds = 59;
                        setSeconds(seconds);
                        setMinutes(minutes);
                        setDisplayMessage(!displayMessage);
                    }
                }else{
                    setSeconds(seconds - 1)
                }
            }
        },1000)
    }, [seconds,isPause])

    function changePause(){
        setIsPause(!isPause)
    }

    const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;
    
  return (
    <div className='pomadoro'>
        {displayMessage && (<div className="message">Время на перерыв, новая сессия начнется через</div>)}
        <div className="timer">{timerMinutes}:{timerSeconds}</div>
        <button 
            className="btn" 
            onClick={()=> changePause()}>
                {isPause ? ('Пауза') : ('Старт')}
                
        </button>
    </div>
  )
}

export default Pomadoro