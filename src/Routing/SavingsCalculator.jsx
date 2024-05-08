import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'; // Import StyleSheet
import { useNavigate } from 'react-router-dom';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
});


function SavingsCalculator() {
    const [savingsName, setSavingsName] = useState('');
    const [savingsGoal, setSavingsGoal] = useState(0);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [savingsSummary, setSavingsSummary] = useState(null);
    const [startCalendarVisible, setStartCalendarVisible] = useState(false);
    const [endCalendarVisible, setEndCalendarVisible] = useState(false);

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
            marginBottom: 10,
            color: '#333',
            textAlign: 'center',

        },
        text: {
            fontSize: 12,
            marginBottom: 5,
            color: '#555', // Medium dark text color
        },
    });


    useEffect(() => {
        if (startDate && endDate) {
            handleSubmit(); // Trigger calculation when both start and end dates are selected
        }
    }, [startDate, endDate]);

    const handleStartDateChange = (date) => {
        setStartDate(date);
        setStartCalendarVisible(false); // Close start calendar after selecting date
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        setEndCalendarVisible(false); // Close end calendar after selecting date
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'savingsName':
                setSavingsName(value);
                break;
            case 'savingsGoal':
                setSavingsGoal(value);
                break;
            default:
                break;
        }

        // Trigger calculation whenever the savings goal input changes
        handleSubmit();
    };

    const handleSubmit = () => {
        // Perform any necessary calculations or actions with the input values
        const duration = calculateDuration();

        if (duration) { // Check if duration is not null
            setSavingsSummary({
                daily: Math.min(savingsGoal, savingsGoal / duration.totalDays).toFixed(2),
                weekly: Math.min(savingsGoal, savingsGoal / (duration.totalWeeks * 7)).toFixed(2),
                monthly: Math.min(savingsGoal, savingsGoal / duration.totalMonths).toFixed(2),
                yearly: Math.min(savingsGoal, savingsGoal / (duration.totalDays / 365)).toFixed(2),
                duration
            });
        } else {
            // Handle case when duration is null (e.g., when startDate or endDate is null)
            setSavingsSummary(null);
        }
    };

    const calculateDuration = () => {
        if (!startDate || !endDate) return null;

        const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
        const totalWeeks = Math.floor(totalDays / 7);
        const remainingDays = totalDays % 7;
        const totalMonths = Math.floor(totalDays / 30);
        const remainingWeeks = totalWeeks % 4;
        const totalYears = Math.floor(totalDays / 365);
        const remainingMonths = totalMonths % 12;
        const totalYearsFromMonths = Math.floor(totalMonths / 12);

        return {
            totalDays,
            totalWeeks,
            remainingDays,
            totalMonths,
            remainingWeeks,
            totalYears: totalYears + totalYearsFromMonths,
            remainingMonths: remainingMonths
        };
    };

    const MyDocument = (
        <Document>
            <Page style={styles.page}>
                <View style={styles.section}>
                    <Text style={[styles.heading, { marginBottom: 30, textDecoration: 'underline' }]}>Savings Summary</Text>
                    {savingsSummary && (
                        <View>
                            <Text style={{ marginBottom: 20 }}>
                                Amount to save <Text style={{ color: 'red', textDecoration: 'underline' }}>Daily:</Text> £{savingsSummary.daily}
                            </Text>
                            <Text style={{ marginBottom: 20 }}>
                                Amount to save <Text style={{ color: 'red', textDecoration: 'underline' }}>Weekly:</Text> £{savingsSummary.weekly}
                            </Text>
                            <Text style={{ marginBottom: 20 }}>
                                Amount to save <Text style={{ color: 'red', textDecoration: 'underline' }}>Monthly:</Text> £{savingsSummary.monthly}
                            </Text>
                            <Text style={{ marginBottom: 20 }}>
                                Amount to save <Text style={{ color: 'red', textDecoration: 'underline' }}>Yearly:</Text> £{savingsSummary.yearly}
                            </Text>
                            {savingsSummary.duration && (
                                <Text style={{ marginTop: 20 }}>
                                    It will take{' '}
                                    {savingsSummary.duration.totalYears > 0 && <Text>{savingsSummary.duration.totalYears} year{parseInt(savingsSummary.duration.totalYears) > 1 ? 's' : ''}</Text>}
                                    {savingsSummary.duration.remainingMonths > 0 && <Text>, {savingsSummary.duration.remainingMonths} month{parseInt(savingsSummary.duration.remainingMonths) > 1 ? 's' : ''}</Text>}
                                    {savingsSummary.duration.remainingWeeks > 0 && <Text>, {savingsSummary.duration.remainingWeeks} week{parseInt(savingsSummary.duration.remainingWeeks) > 1 ? 's' : ''}</Text>}
                                    {savingsSummary.duration.remainingDays > 0 && <Text>, and {savingsSummary.duration.remainingDays} day{parseInt(savingsSummary.duration.remainingDays) > 1 ? 's' : ''}</Text>}
                                    {' '}to achieve your goal.
                                </Text>
                            )}
                        </View>
                    )}
                </View>
            </Page>
        </Document>
    );

    return (
        <>
            <button id="homebutton" onClick={() => navigate("/")}>&#11013;</button>
            <div id="home">
                <h1 id="title">Savings Calculator</h1>
                <p id="description">Enter your savings goal and the period you want to save for to calculate how much you need to save daily, weekly, monthly, or yearly to achieve your goal. Once you're happy you can download your plan as a PDF document to keep for later!</p>
            </div>
            <br />
            <div id="savingsform">
                <label>Savings Name:</label>
                <input type="text" name="savingsName" value={savingsName} onChange={handleInputChange} />

                <label>Savings Goal (£):</label>
                <input type="number" min={0} name="savingsGoal" value={savingsGoal} onChange={handleInputChange} />




                <label>Saving Start Date:</label>
                <input
                    type="text"
                    value={startDate ? startDate.toLocaleDateString() : ''}
                    onClick={() => setStartCalendarVisible(true)}
                    readOnly
                />
                {startCalendarVisible && (
                    <Calendar
                        onChange={handleStartDateChange}
                        value={startDate}
                        onClickDay={() => setStartCalendarVisible(false)} // Close calendar after selecting date
                    />
                )}

                <label>Saving End Date:</label>
                <input
                    type="text"
                    value={endDate ? endDate.toLocaleDateString() : ''}
                    onClick={() => setEndCalendarVisible(true)}
                    readOnly
                />
                {endCalendarVisible && (
                    <Calendar
                        onChange={handleEndDateChange}
                        value={endDate}
                        onClickDay={() => setEndCalendarVisible(false)} // Close calendar after selecting date
                    />
                )}
            </div>
            <br/>
            <div id="savingsdisplay">
                {savingsSummary && (
                    <div>
                        <div className="summary">
                            <h2 id="heading2">Savings Summary</h2>
                            <p>Amount to save daily: <strong>£{savingsSummary.daily}</strong></p>
                            <p>Amount to save weekly: <strong>£{savingsSummary.weekly}</strong></p>
                            <p>Amount to save monthly: <strong>£{savingsSummary.monthly}</strong></p>
                            <p>Amount to save yearly: <strong>£{savingsSummary.yearly}</strong></p>
                            {savingsSummary.duration && (
                                <p>
                                    It will take{' '}
                                    {savingsSummary.duration.totalYears > 0 && `${savingsSummary.duration.totalYears} year${savingsSummary.duration.totalYears > 1 ? 's' : ''}`}
                                    {savingsSummary.duration.remainingMonths > 0 && `, ${savingsSummary.duration.remainingMonths} month${savingsSummary.duration.remainingMonths > 1 ? 's' : ''}`}
                                    {savingsSummary.duration.remainingWeeks > 0 && `, ${savingsSummary.duration.remainingWeeks} week${savingsSummary.duration.remainingWeeks > 1 ? 's' : ''}`}
                                    {savingsSummary.duration.remainingDays > 0 && `, and ${savingsSummary.duration.remainingDays} day${savingsSummary.duration.remainingDays > 1 ? 's' : ''}`}
                                    {' '}to achieve your goal.
                                </p>
                            )}
                        </div>
                        <div className="download-button">
                            <PDFDownloadLink document={MyDocument} fileName="savings_plan.pdf">
                                {({ blob, url, loading, error }) =>
                                    loading ? 'Loading document...' : 'Download Your Plan Here'
                                }
                            </PDFDownloadLink>
                        </div>
                    </div>
                )}
            </div>





        </>
    );
}

export default SavingsCalculator;
