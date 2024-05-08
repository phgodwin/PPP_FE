import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function BudgetPlanner() {


    const [outgoings, setOutgoings] = useState([]);
    const [takeHomePay, setTakeHomePay] = useState('');
    const [additionalIncome, setAdditionalIncome] = useState('');
    const [totalIncome, setTotalIncome] = useState('');
    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const navigate = useNavigate();



    function getOutgoings() {
        axios.get("http://localhost:8090/Outgoing/getOutgoings")
            .then((response) => {
                console.log(response);
                setOutgoings(response.data);
            })
            .catch((error) => console.log(error))
    }


    const handleSubmitPay = (event) => {
        event.preventDefault();
        setTakeHomePay(takeHomePay);
        setAdditionalIncome(additionalIncome);
        setTotalIncome(parseFloat(takeHomePay) + parseFloat(additionalIncome));
        setIsSubmitted(true);
    };

    const handleSubmitOutgoing = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8090/Outgoing/addOutgoing", { name, cost })
            .then((response) => {
                console.log(response);
                setName("");
                setCost("");
                getOutgoings();
            })
            .catch((error) => console.log(error));
    }

    function deleteOutgoing(id) {
        axios.delete("http://localhost:8090/Outgoing/deleteOutgoing/" + id)
            .then((response) => {
                console.log(response);
                getOutgoings();
            })
            .catch((error) => console.log(error));
    }


    useEffect(() => getOutgoings(), []);

    const totalOutgoings = outgoings.reduce((total, outgoing) => total + outgoing.cost, 0);
   

    return (
        <>
        <button id="homebutton" onClick={()=>navigate("/")}>&#11013;</button>

            <div id="home">
                <h1 id="title">Budget Planner</h1>
                <p id="description">Submit your income and expenditure below to calculate your disposable income and help keep track of your money!</p>
            </div>

            <div id="budgetentriescontainer">
                {!isSubmitted && (
                    <form id="budgetform" onSubmit={handleSubmitPay}>
                        <label>
                            Take Home Pay:
                        </label>
                        <input type="number" value={takeHomePay} onChange={e => setTakeHomePay(e.target.value)} />

                        <label>
                            Additional Income:
                        </label>
                        <input type="number" value={additionalIncome} onChange={e => setAdditionalIncome(e.target.value)} />

                        <button type="submit">Submit</button>
                    </form>
                )}
                {isSubmitted && (
                    <div id="budgetdisplay">
                        <h2 id="heading2">Your Total Income is </h2>
                        <h1>£{parseFloat(totalIncome).toFixed(2)}</h1>
                        <button onClick={() => setIsSubmitted(false)}>Edit</button>
                    </div>

                )}
                <form id="budgetform" onSubmit={handleSubmitOutgoing}>
                    <label>
                        Outgoing Name:
                    </label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} />

                    <label>
                        Outgoing Cost:
                    </label>
                    <input type="number" value={cost} minValue={0} onChange={e => setCost(e.target.value)} />

                    <button type="submit">Submit</button>
                </form>

            </div>

            <br></br>

            <div id="budgetcontainer">
                <div id="budgetdisplay">
                    <h2 id="heading2">Current Outgoings</h2>
                    <ul style={{fontSize: "20px", listStyleType: "none"}}>
                        {outgoings.map((outgoing) => (<li>{outgoing.name + ": £" + parseFloat(outgoing.cost).toFixed(2) + " "}<button onClick={()=>deleteOutgoing(outgoing.id)}>X</button></li>))}
                    </ul>
                    <h3>Total Outgoings: £{parseFloat(totalOutgoings).toFixed(2)}</h3>
                </div>
                <div id="budgetdisplay">
                    <h2 id="heading2"> Your Disposable Income Is</h2>
                    {isSubmitted ? (
                        (totalIncome - totalOutgoings) >= 0 ? (
                            <h1>£{parseFloat(totalIncome - totalOutgoings).toFixed(2)}</h1>
                        ) : (
                            <>
                            <h1 style={{ color: "red" }}>£{parseFloat(totalIncome - totalOutgoings).toFixed(2)}</h1>
                            <p style={{textAlign:'center'}}>Your outgoings are currently more than your income. Please see our money saving tips section for more support.</p>
                            </>
                        )
                    ) : (
                        <h3>Please Submit Your Pay Details Above</h3>
                    )}



                </div>
            </div>

        </>
    );
}

export default BudgetPlanner;