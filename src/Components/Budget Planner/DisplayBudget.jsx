import axios from "axios";
import { useEffect, useState } from "react";

function DisplayBudget() {

    const [incomes, setIncomes] = useState();
    const [outgoings, setOutgoings] = useState();

    function getDisposableIncome() {
        axios.get("http://localhost:3031/Income")
            .then((response) => {
                console.log(response);
                setIncomes(response.data);
            })
            .catch((error) => console.log(error))


    }

    // let totalDisposableIncome = 0;
    // let totalIncome = 0;

    // for (const income of incomes) {
    //     totalIncome = income.takeHomePay + income.additionalIncome;
    //     totalDisposableIncome += totalIncome;

    // }


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






    return (
        <div>
            <h2>Current Outgoings</h2>
            <ul>
                {outgoings.map((outgoing) =>
                    <li>{outgoing.name} : {outgoing.cost}</li>)}
            </ul>
        </div>


    );
}

export default DisplayBudget;