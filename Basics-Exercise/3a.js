

function Counter(){

    const [count, setCount] = React.useState(0);
    const [timer, setTimer] = React.useState("time")

 function countUpdater(){
     
    const newCount = count + 1;
    setCount(newCount);

     if(newCount > 1){
        setTimer("times");
     }
     else{
        setTimer('time')
     }
    }

    function resetUpdate(){
        setCount(0);
        setTimer("time")
        
    }

    return (
    <>
        <button onClick={countUpdater}>
            Count: {count} {timer}
        </button>
        <button onClick={countUpdater}>
            Count: {count} {timer}
        </button>
        <button onClick={resetUpdate}>Reset</button>
    </>
    );
}


function App(){

    return(
    <>
        <Counter/>
        
        
    </>
    )
}

const container = document.querySelector('.js-container');

const root = ReactDOM.createRoot(container);

root.render(<App/>)