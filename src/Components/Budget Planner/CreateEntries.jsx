import axios from "axios";
import { useState } from "react";

function CreateEntries() {

    const [takeHomePay, setTakeHomePay] = useState('');
    const [additionalIncome, setAdditionalIncome] = useState('');
    const [name, setName] = useState('');
    const [cost, setCost] = useState('');

    const handleSubmitPay = (event) => {
        event.preventDefault();
        axios.post("http://localhost:3031/Income", {takeHomePay, additionalIncome})
        .then((response) => {
            console.log(response);
            setTakeHomePay(""); 
            setAdditionalIncome("");
        })
        .catch((error) => console.log(error));
    
    };

    const handleSubmitOutgoing = (event) => {
        event.preventDefault();
        axios.post("http://localhost:3031/Outgoings", {name, cost})
        .then((response) => {
            console.log(response);
            setName(""); 
            setCost("");
        })
        .catch((error) => console.log(error));
        
    };
    return ( 

<>
        <form onSubmit={handleSubmitPay}>
            <label>
                Take Home Pay:
                <input type="number" value={takeHomePay} onChange={e => setTakeHomePay(e.target.value)} />
            </label>
            <label>
                Additional Income:
                <input type="number" value={additionalIncome} onChange={e => setAdditionalIncome(e.target.value)} />
            </label>
            <button type="submit">Submit</button>
        </form>
        <form onSubmit={handleSubmitOutgoing}>
            <label>
                Outgoing Name:
                <input type="text" value={name} onChange={e => setName(e.target.value)} />
            </label>
            <label>
                Outgoing Cost:
                <input type="number" value={cost} onChange={e => setCost(e.target.value)} />
            </label>
            <button type="submit">Submit</button>
        </form>

        </>

     );
}

export default CreateEntries;