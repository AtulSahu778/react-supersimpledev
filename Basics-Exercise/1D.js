const container = document.querySelector('.js-container');
const root = ReactDOM.createRoot(container);

const socks = 10;
const tshirts = 8;

const productCost = ( socks * 1 ) + ( tshirts * 2);
const shippingCost = 5;

console.log(productCost);


const div1 = (
    <div>
        <p>Product Cost: {productCost}</p>
        <p>Shipping Cost: {shippingCost}</p>
        <p>Total Cost: { productCost + shippingCost}</p>
        
    </div>
);




setInterval(() => {
    const dateData = dayjs().format('HH:mm:ss')
    const div2 = (
    <div>
        <p>Today is {dateData}</p>
    </div>
)

root.render(div2);
}, 1000);

