import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "./SavingsCalculator.css";

function SavingsCalculator() {
    const [savingsName, setSavingsName] = useState('');
    const [savingsGoal, setSavingsGoal] = useState(0);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [savingsSummary, setSavingsSummary] = useState(null);

    useEffect(() => {
        handleSubmit(); // Trigger initial calculation
    }, [savingsGoal, startDate, endDate]); // Re-run whenever these values change

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
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
    };

    const calculateDuration = () => {
        if (!startDate || !endDate) return null;

        const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
        const totalWeeks = Math.floor(totalDays / 7);
        const remainingDays = totalDays % 7;
        const totalMonths = Math.floor(totalDays / 30);
        const remainingWeeks = totalWeeks % 4;
        const totalYears = Math.floor(totalDays / 365);

        return {
            totalDays,
            totalWeeks,
            remainingDays,
            totalMonths,
            remainingWeeks,
            totalYears
        };
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

    return (
        <div>
            <h1>Savings Calculator</h1>
            <div className="container_calculator">
                <label>Savings Name:</label>
                <input type="text" name="savingsName" value={savingsName} onChange={handleInputChange} />

                <label>Savings Goal (£):</label>
                <input type="number" min={0} name="savingsGoal" value={savingsGoal} onChange={handleInputChange} />

                <label>Save by? (date range):</label>
                <div className="date-range-picker">
                    <DatePicker
                        selected={startDate}
                        onChange={handleStartDateChange}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Start Date"
                    />
                    <DatePicker
                        selected={endDate}
                        onChange={handleEndDateChange}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="End Date"
                    />
                </div>

                {savingsSummary && (
                    <div className="summary">
                        <h2>Savings Summary</h2>
                        <p>Amount to save daily: £{savingsSummary.daily}</p>
                        <p>Amount to save weekly: £{savingsSummary.weekly}</p>
                        <p>Amount to save monthly: £{savingsSummary.monthly}</p>
                        <p>Amount to save yearly: £{savingsSummary.yearly}</p>
                        {savingsSummary.duration && (
                            <p>
                                It will take
                                {savingsSummary.duration.totalYears > 0 && `${savingsSummary.duration.totalYears} year${savingsSummary.duration.totalYears > 1 ? 's' : ''},`}
                                {savingsSummary.duration.totalMonths > 0 && `${savingsSummary.duration.totalMonths} month${savingsSummary.duration.totalMonths > 1 ? 's' : ''},`}
                                {savingsSummary.duration.remainingWeeks > 0 && `${savingsSummary.duration.remainingWeeks} week${savingsSummary.duration.remainingWeeks > 1 ? 's' : ''},`} and
                                {savingsSummary.duration.remainingDays > 0 && `${savingsSummary.duration.remainingDays} day${savingsSummary.duration.remainingDays > 1 ? 's' : ''}`} 
                                to achieve your goal.
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SavingsCalculator;
