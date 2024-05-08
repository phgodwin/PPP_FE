import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    return (
        <>
            <div id="home">
                <h1 id="title">Welcome to Penny Pinch Pal!</h1>
                <p id="description">This app is designed to help you manage your money better. You can use the Savings Calculator to see how much you can save over time, the Budget Planner to keep track of your expenses, and the Money Saving Tips for some helpful guidance on where you can make savings.</p>
            </div>
            <br />
            <div id="home">
                <button id="navbutton" onClick={() => navigate("/savings-calculator")}>Savings Calculator</button>
                <button id="navbutton" onClick={() => navigate("/budget-planner")}>Budget Planner</button>
                <button id="navbutton" onClick={() => navigate("/saving-tips")}>Money Saving Tips</button>
            </div>

            <button id="contactusbutton" onClick={() => navigate("/contact-us")}>Contact Us</button>

        </>


    );
}

export default Home;