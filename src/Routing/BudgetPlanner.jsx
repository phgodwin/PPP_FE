import React, { useState, useEffect } from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import axios from 'axios';
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

    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            backgroundColor: '#fff',
            padding: 20,
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1,

        },
        headingContainer: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        heading: {
            fontSize: 18,
            fontWeight: 'bold',
            color: '#333',
            textAlign: 'center',
            textDecoration: 'underline',
            marginTop: 10,
            marginBottom: 20,
            alignItems: 'center',
        },
        text: {
            fontSize: 18,
            marginBottom: 20,
            color: '#333',
            textAlign: 'left',
        },
    });


    useEffect(() => {
        
        getOutgoings();
        
        
        return () => {
            clearOutgoings(); 
        };
    }, []);

    function getOutgoings() {
        axios.get("http://localhost:8090/Outgoing/getOutgoings")
            .then((response) => {
                setOutgoings(response.data);
            })
            .catch((error) => console.log(error));
    }

    function handleSubmitPay(event) {
        event.preventDefault();
        setTotalIncome(parseFloat(takeHomePay) + parseFloat(additionalIncome));
        setIsSubmitted(true);
    }

    function handleSubmitOutgoing(event) {
        event.preventDefault();
        axios.post("http://localhost:8090/Outgoing/addOutgoing", { name, cost })
            .then((response) => {
                setName("");
                setCost("");
                getOutgoings();
            })
            .catch((error) => console.log(error));
    }

    function deleteOutgoing(id) {
        axios.delete("http://localhost:8090/Outgoing/deleteOutgoing/" + id)
            .then((response) => {
                getOutgoings();
            })
            .catch((error) => console.log(error));
    }

    const totalOutgoings = outgoings.reduce((total, outgoing) => total + outgoing.cost, 0);

    const MyDocument = (
        <Document>
            <Page style={styles.page}>
                <View style={styles.section}>
                    <Text style={[styles.heading, {}]}>Budget Summary</Text>
                    <Text style={styles.text}>Total <Text style={{ color: 'red', textDecoration: 'underline' }}>Income:</Text> £{totalIncome}</Text>
                    <Text style={styles.text}>Total <Text style={{ color: 'red', textDecoration: 'underline' }}>Outgoings:</Text> £{totalOutgoings}</Text>
                    <Text style={styles.text}>Disposable <Text style={{ color: 'red', textDecoration: 'underline' }}>Income:</Text> £{totalIncome - totalOutgoings}</Text>
                </View>
            </Page>
        </Document>
    );

    // Function to clear outgoings data
    function clearOutgoings() {
        axios.delete("http://localhost:8090/Outgoing/clearOutgoings")
            .then((response) => {
                setOutgoings([]); 
            })
            .catch((error) => console.log(error));
    }

    return (
        <>
            <button id="homebutton" onClick={() => navigate("/")}>&#11013;</button>
            <div id="home">
                <h1 id="title">Budget Planner</h1>
                <p id="description">Submit your income and expenditure below to calculate your disposable income and help keep track of your money!</p>
            </div>
            <div id="budgetentriescontainer">
                {!isSubmitted && (
                    <form id="budgetform" onSubmit={handleSubmitPay}>
                        <label>Take Home Pay:</label>
                        <input type="number" value={takeHomePay} onChange={e => setTakeHomePay(e.target.value)} />
                        <label>Additional Income:</label>
                        <input type="number" value={additionalIncome} onChange={e => setAdditionalIncome(e.target.value)} />
                        <button className='submitbutton' type="submit">Submit</button>
                    </form>
                )}
                {isSubmitted && (
                    <div id="budgetdisplay">
                        <h2 id="heading2">Your Total Income is </h2>
                        <h1>£{totalIncome}</h1>
                        <button className='editbutton' onClick={() => setIsSubmitted(false)}>Edit</button>
                    </div>
                )}
                <form id="budgetform" onSubmit={handleSubmitOutgoing}>
                    <label>Outgoing Name:</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} />
                    <label>Outgoing Cost:</label>
                    <input type="number" value={cost} min={0} onChange={e => setCost(e.target.value)} />
                    <button className='submitbutton' type="submit">Submit</button>
                </form>
            </div>
            <br />
            <div id="budgetcontainer">
                <div id="budgetdisplay">
                    <h2 id="heading2">Current Outgoings</h2>
                    <ul>
                        {outgoings.map((outgoing) => (
                            <li key={outgoing.id}>
                                {outgoing.name}: £{outgoing.cost}
                                <button onClick={() => deleteOutgoing(outgoing.id)}>X</button>
                            </li>
                        ))}
                    </ul>
                    <h3>Total Outgoings: £{totalOutgoings}</h3>
                </div>
                <div id="budgetdisplay">
                    <h2 id="heading2">Your Disposable Income Is</h2>
                    {isSubmitted ? (
                        (totalIncome - totalOutgoings) >= 0 ? (
                            <h1>£{totalIncome - totalOutgoings}</h1>
                        ) : (
                            <h1 style={{ color: "red" }}>£{totalIncome - totalOutgoings}</h1>
                        )
                    ) : (
                        <h3>Please Submit Your Pay Details Above</h3>
                    )}
                </div>
            </div>
            <div className="download-button" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <PDFDownloadLink document={MyDocument} fileName="budget_plan.pdf">
                    {({ blob, url, loading, error }) =>
                        <button>
                            {loading ? 'Loading document...' : 'Download your Budget plan here'}
                        </button>
                    }
                </PDFDownloadLink>
            </div>
        </>
    );
}

export default BudgetPlanner;
