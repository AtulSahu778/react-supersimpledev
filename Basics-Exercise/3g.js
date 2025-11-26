
function Input(){

    const [inputText, setInputText] = React.useState();
    const greet = 'Hello'

    function inputFunction(event){
        setInputText(event.target.value);
    }

    function resetText(){
        setInputText('')
    }

    function exampleUpdater(){
       const names = ["Atul", "Riya", "Karan", "Payal", "Sarthak", "Tanya"];
       const finalNames = names[Math.floor(Math.random() * names.length)];
       setInputText(finalNames)
    }


    return(
        <>
        <input 
        placeholder="Type a name here" 
        size={30} 
        value={inputText}
        onChange={inputFunction} 
        ></input>

        <button
        onClick={resetText}
        >Reset</button>

        <button
        onClick={exampleUpdater}
        >Example</button>

        <div>{greet} {inputText}</div>
        
        </>
    )
}


function App(){
    return(
        <Input></Input>
    )
}

const container = document.querySelector('.js-container');

const root = ReactDOM.createRoot(container);
root.render(<App />)