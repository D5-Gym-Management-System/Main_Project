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
import '../UserDashboard/UserStyling/userhome.css'; // Import your CSS file
import { TrainerContext } from './trainercontext.js'; 


ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, PointElement,LinearScale);



const Trainerhome = () => {
    const user = {
        name: 'Jane Doe',
        profilePicture: 'https://via.placeholder.com/150',
        membershipStatus: 'Active',
        subscriptionData: [30000, 50055, 60075, 60000, 68000, 70000], // Example subscription amounts
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

    const { trainer } = useContext(TrainerContext);

    const chartData = {
        labels: user.months,
        datasets: [
            {
                label: ' Salary (₹)',
                data: user.subscriptionData,
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
                    label: (context) => `₹${context.raw}`,
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
                    <img src={user.profilePicture} alt="Profile" className="profile-image" />
                    <div className="profile-info">
                        <h1>{trainer.name}</h1>
                        <p>Status: {user.membershipStatus}</p>
                    </div>
                </div>
            </header>
            <div className="dashboard-content">
                <section className="workout-schedule">
                    <h2>Workout Schedule</h2>
                    <ul>
                        {user.workoutPlan.map((item, index) => (
                            <li key={index}>
                                <span>{item.day}:</span> {item.workout}
                            </li>
                        ))}
                    </ul>
                </section>
                <section className="progress-tracking">
                    <h2>Progress Tracking</h2>
                    <div className="progress-details">
                        <p><strong>Weight:</strong> {user.progress.weight}</p>
                        <p><strong>Height:</strong> {user.progress.height}</p>
                        <p><strong>BMI:</strong> {user.progress.bmi}</p>
                        <p><strong>Body Fat:</strong> {user.progress.bodyFat}</p>
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

export default Trainerhome;
