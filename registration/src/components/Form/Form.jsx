import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import './form.css'; // Import the CSS file

function Form() {
    const [formData, setFormData] = useState({
        studentName: '',
        rollNo: '',
        collegeName: '',
        branch: '',
        collegeEmail: '',
        personalEmail: '',
        phoneNumber: '',
        events: [],
    });
    const [users, setUsers] = useState([]); // To store users locally
    const [showPinPrompt, setShowPinPrompt] = useState(false); // To show/hide PIN input
    const [enteredPin, setEnteredPin] = useState(''); // To store the entered PIN
    const [error, setError] = useState(''); // To show error messages

    const adminPin = '1234'; // Replace with your actual PIN

    // Define events with their respective hours
    const eventsList = [
        { name: 'Plantation', hours: 8 },
        { name: 'Drawing Competition', hours: 8 },
        { name: 'Poster Making', hours: 8 },
        { name: 'Blood Donation', hours: 8 },
        { name: 'Report Writing', hours: 8 },
        { name: 'Nature Photography', hours: 8 },
        { name: 'Teaching', hours: 8 },
        { name: 'Slum Visit', hours: 8 },
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCheckboxChange = (event) => {
        const selectedEvents = [...formData.events];
        if (event.target.checked) {
            selectedEvents.push(event.target.value);
        } else {
            const index = selectedEvents.indexOf(event.target.value);
            if (index > -1) {
                selectedEvents.splice(index, 1);
            }
        }
        setFormData({ ...formData, events: selectedEvents });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if the Roll No already exists
        const existingUser = users.find(user => user.rollNo === formData.rollNo);
        if (existingUser) {
            setError('A user with this Roll No already exists.');
            return;
        }

        // Calculate attended and not attended events
        const attendedEvents = formData.events;
        const notAttendedEvents = eventsList.filter(event => !attendedEvents.includes(event.name));

        const totalAttendedHours = attendedEvents.reduce((sum, eventName) => {
            const event = eventsList.find((ev) => ev.name === eventName);
            return sum + (event ? event.hours : 0);
        }, 0);

        const totalNotAttendedHours = notAttendedEvents.reduce((sum, event) => {
            return sum + event.hours;
        }, 0);

        // Add new user to the list
        setUsers([...users, {
            ...formData,
            attendedEvents: attendedEvents.join(', '),
            totalAttendedHours,
            notAttendedEvents: notAttendedEvents.map(event => event.name).join(', '),
            totalNotAttendedHours
        }]);

        // Clear error and reset form fields
        setError('');
        setFormData({
            studentName: '',
            rollNo: '',
            collegeName: '',
            branch: '',
            collegeEmail: '',
            personalEmail: '',
            phoneNumber: '',
            events: [],
        });
        // Unselect checkboxes
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
    };

    const handleDownloadClick = () => {
        setShowPinPrompt(true);
    };

    const handlePinSubmit = (e) => {
        e.preventDefault();
        if (enteredPin === adminPin) {
            downloadExcel();
            setShowPinPrompt(false);
            setEnteredPin('');
            setError('');
        } else {
            setError('Incorrect PIN. Please try again.');
        }
    };

    const downloadExcel = () => {
        // Create a new workbook and worksheet
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(users);

        // Add the worksheet to the workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');

        // Generate a file and download it
        XLSX.writeFile(workbook, 'users.xlsx');
    };

    return (
        <div className="container">
            <h1>Event Registration</h1>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label>Name of the Student:</label>
                    <input
                        type="text"
                        name="studentName"
                        value={formData.studentName}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Roll No:</label>
                    <input
                        type="text"
                        name="rollNo"
                        value={formData.rollNo}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>College Name:</label>
                    <input
                        type="text"
                        name="collegeName"
                        value={formData.collegeName}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Branch:</label>
                    <input
                        type="text"
                        name="branch"
                        value={formData.branch}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>College Email ID:</label>
                    <input
                        type="email"
                        name="collegeEmail"
                        value={formData.collegeEmail}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Personal Email ID:</label>
                    <input
                        type="email"
                        name="personalEmail"
                        value={formData.personalEmail}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Phone Number:</label>
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Events:</label>
                    {eventsList.map((event) => (
                        <div key={event.name}>
                            <input
                                type="checkbox"
                                value={event.name}
                                onChange={handleCheckboxChange}
                            />
                            <label>{event.name} ({event.hours} hrs)</label>
                        </div>
                    ))}
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit" className="btn btn-submit">Submit</button>
            </form>

            <button onClick={handleDownloadClick} className="btn btn-download">Admin Download Excel File</button>

            {showPinPrompt && (
                <div className="pin-container">
                    <form onSubmit={handlePinSubmit} className="pin-form">
                        <div className="form-group">
                            <label>Enter PIN:</label>
                            <input
                                type="password"
                                value={enteredPin}
                                onChange={(e) => setEnteredPin(e.target.value)}
                                className="form-input"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-submit">Submit PIN</button>
                        {error && <p className="error">{error}</p>}
                    </form>
                </div>
            )}
        </div>
    );
}

export default Form;
