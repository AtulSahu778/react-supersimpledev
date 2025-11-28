
function Button(){
    const [isButtonOn, setIsButtonOn] = React.useState(true);

    function switchButton(){
        setIsButtonOn(!isButtonOn)
        
    }
    

   return(
    <div>
        <button 
        className={isButtonOn ? "button-on" : "button-off"}
        onClick={switchButton}

        >{isButtonOn ? "ON" : "OFF"}</button>
    </div>
    
   ); 
}








function App(){
    return(
    <>
    <Button/>
    </>
    );
}


const container = document.querySelector('.js-container');
const root = ReactDOM.createRoot(container);
root.render(<App />);
