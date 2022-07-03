import React,{useState, useEffect} from 'react';
import tomato from './assets/tomato.svg';

function Pomadoro() {
    const [minutes,setMinutes] = useState(60);
    const [seconds,setSeconds] = useState(0);
    const [displayMessage,setDisplayMessage] = useState(false);
    const [isPause,setIsPause] = useState(false)
    const [tomatoCount, setTomatoCount] = useState([])

    useEffect(() => {

        if(localStorage.getItem('tomato') !== null){
            setTomatoCount(localStorage.getItem('tomato').split(","))
        }

        let interval = setInterval(()=>{
            clearInterval(interval)
            if(isPause === true){
                if(seconds === 0){
                    if(minutes !== 0){
                        setSeconds(59)
                        setMinutes(minutes-1)
                    }else{
                        let minutes = displayMessage ? 59 : 4;
                        let seconds = 59;
                        setSeconds(seconds);
                        setMinutes(minutes);
                        setDisplayMessage(!displayMessage);
                        if(!displayMessage){
                            // setTomatoCount([...tomatoCount,'p'])
                            localStorage.setItem('tomato',[...tomatoCount,'p'])
                        }
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
        <div>
            
            {
                tomatoCount.map((pom,index) => {
                    return(
                        <img key={index} className="tomato_img" src={tomato}/>
                    )
                })
            }
        </div>
        
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