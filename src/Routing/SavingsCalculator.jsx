import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./SavingsCalculator.css";

function SavingsCalculator() {
    const [savingsName, setSavingsName] = useState('');
    const [savingsGoal, setSavingsGoal] = useState(0);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [savingsSummary, setSavingsSummary] = useState(null);
    const [startCalendarVisible, setStartCalendarVisible] = useState(false);
    const [endCalendarVisible, setEndCalendarVisible] = useState(false);

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

    return (
        <div>
            <h1>Savings Calculator</h1>
            <div className="container_calculator">
                <label>Savings Name:</label>
                <input type="text" name="savingsName" value={savingsName} onChange={handleInputChange} />

                <label>Savings Goal (£):</label>
                <input type="number" min={0} name="savingsGoal" value={savingsGoal} onChange={handleInputChange} />

                <label>Save period:</label>
                <div className="date-range-picker">
                    <div>
                        <label>Start Date:</label>
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
                    </div>
                    <div>
                        <label>End Date:</label>
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
                                {savingsSummary.duration.remainingMonths > 0 && `${savingsSummary.duration.remainingMonths} month${savingsSummary.duration.remainingMonths > 1 ? 's' : ''},`}
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
