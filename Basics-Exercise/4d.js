    function SignUp(){

        const [showPassword, setShowPassword] = React.useState(true);

        
 
        function showPasswordButton(){
            setShowPassword(!showPassword)
            
        }



        return(
            <>
            <p 
            className="header"
            >Hello, welcome to my website
            </p>

            <div className="input-email">
                <input
                placeholder="Email"
            ></input>
            
            </div>

            <div className="input-pass">
                <input
                placeholder="Password"
                type={showPassword ? "password" : "text"}
            ></input>
            <button 
            className="show-button"
            onClick={showPasswordButton}
            >{showPassword ? 'Show' : 'Hide'}</button>
            </div>

            <div className="SignUp-buttons">
                <button className="login-button">Login</button>
                <button className="signup-button">SignUp</button>
            </div>
            
            </>
        );
    }







    function App(){
        return(
        <>
        <SignUp/>
        </>
        );
    }


    const container = document.querySelector('.js-container');
    const root = ReactDOM.createRoot(container);
    root.render(<App />);