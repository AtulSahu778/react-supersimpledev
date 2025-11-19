const container = document.querySelector('.js-container');
const root = ReactDOM.createRoot(container).render('Welcome to SuperSimpleDev React Course, Hii I`m Atul');

const button = <button>Click me</button>


const paragraph = <p>Atul is the best coder and frontend developer in the world he knows javascript react three.js electron react native</p>


const div = (
    <div>
        <button>Click me</button>
        <p>Atul is the best coder and frontend developer in the world he knows javascript react three.js electron react native</p>
    </div>
);

root.render(div); 