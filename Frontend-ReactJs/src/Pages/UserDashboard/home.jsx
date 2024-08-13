import React, { useContext } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
} from 'chart.js';
import './UserStyling/userhome.css'; // Import your CSS file
import { UserContext } from './usercontext.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, PointElement,LinearScale);

const Userhome = () => {
    const { user } = useContext(UserContext);
    const userData = {
        name: user.name,
        profilePicture: 'https://via.placeholder.com/150',
        membershipStatus: 'Active',
        subscriptionData: [40, 55, 65, 60, 70, 75], // Example subscription amounts
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        workoutPlan: [
            { day: 'Monday', workout: 'Chest & Triceps' },
            { day: 'Tuesday', workout: 'Back & Biceps' },
            { day: 'Wednesday', workout: 'Legs' },
            { day: 'Thursday', workout: 'Shoulders & Abs' },
            { day: 'Friday', workout: 'Full Body' },
        ],
        progress: {
            weight: '70kg',
            height: '165cm',
            bmi: '25.7',
            bodyFat: '20%',
        }
    };

    const chartData = {
        labels: userData.months,
        datasets: [
            {
                label: 'Monthly Subscription ($)',
                data: userData.subscriptionData,
                borderColor: '#007bff',
                backgroundColor: 'rgba(0, 123, 255, 0.1)',
                borderWidth: 2,
                tension: 0.1,
                pointBorderColor: '#007bff',
                pointBackgroundColor: '#fff',
                pointHoverBackgroundColor: '#007bff',
                pointHoverBorderColor: '#fff',
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: (context) => `$${context.raw}`,
                },
            },
        },
        scales: {
            x: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                },
                ticks: {
                    color: '#fff',
                },
                title: {
                    display: true,
                    text: 'Month',
                    color: '#fff',
                },
            },
            y: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                },
                ticks: {
                    color: '#fff',
                },
                title: {
                    display: true,
                    text: 'Subscription Amount ($)',
                    color: '#fff',
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div className="profile-header">
                    <img src={userData.profilePicture} alt="Profile" className="profile-image" />
                    <div className="profile-info">
                        <h1>{userData.name}</h1>
                        <p>Status: {userData.membershipStatus}</p>
                    </div>
                </div>
            </header>
            <div className="dashboard-content">
                <section className="workout-schedule">
                    <h2>Workout Schedule</h2>
                    <ul>
                        {userData.workoutPlan.map((item, index) => (
                            <li key={index}>
                                <span>{item.day}:</span> {item.workout}
                            </li>
                        ))}
                    </ul>
                </section>
                <section className="progress-tracking">
                    <h2>Progress Tracking</h2>
                    <div className="progress-details">
                        <p><strong>Weight:</strong> {userData.progress.weight}</p>
                        <p><strong>Height:</strong> {userData.progress.height}</p>
                        <p><strong>BMI:</strong> {userData.progress.bmi}</p>
                        <p><strong>Body Fat:</strong> {userData.progress.bodyFat}</p>
                    </div>
                </section>
                <section className="subscription-graph">
                    <h2>Monthly Subscription Amount</h2>
                    <Line data={chartData} options={chartOptions} />
                </section>
            </div>
        </div>
    );
};

export default Userhome;
