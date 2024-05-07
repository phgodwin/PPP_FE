import axios from "axios";
import { useEffect, useState } from "react";

function DisplayBudget() {

    const [incomes, setIncomes] = useState([]);
    const [outgoings, setOutgoings] = useState([]);

    function getDisposableIncome() {
        axios.get("http://localhost:3031/Income")
            .then((response) => {
                console.log(response);
                setIncomes(response.data);
            })
            .catch((error) => console.log(error))


    }

    function getOutgoings() {
        axios.get("http://localhost:3031/Outgoings")
            .then((response) => {
                console.log(response);
                setOutgoings(response.data);
            })
            .catch((error) => console.log(error))

    }

    useEffect(() => getDisposableIncome(), [incomes]);

    useEffect(() => getOutgoings(), [outgoings]);


    const totalOutgoings = outgoings.reduce((total, outgoing) => total + outgoing.cost, 0);
    const totalIncome = incomes.reduce((total, income) => total + income.amount, 0);
    const disposableIncome = totalIncome - totalOutgoings;



    return (
        <div id="budgetcontainer">
            <div id="budgetdisplay">
            <h2>Current Outgoings</h2>
            <ul>
                {outgoings.map((outgoing) =>
                    <li>{outgoing.name} : {outgoing.cost}</li>)}
            </ul>
            </div>
            <div id="budgetdisplay">
            <h2>Disposable Income</h2>
            <p>{disposableIncome}</p>
        </div>
        </div>


    );
}

export default DisplayBudget;