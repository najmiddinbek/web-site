// pages/index.js
import { useEffect } from 'react';
import io from 'socket.io-client';

const Home = () => {
    useEffect(() => {
        const socket = io('https://socket.example.com');

        socket.on('connect', () => {
            console.log('Connected to Socket.io server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from Socket.io server');
        });
        const fetchData = async () => {
            try {
                const response = await fetch('api/pupils', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        // Add any additional headers as needed
                    },
                    // You can include credentials like cookies, etc.
                    credentials: 'same-origin', // 'include', 'omit'
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log('Fetch API Response:', data);
            } catch (error) {
                console.error('Fetch API Error:', error);
            }
        };

        // Event listeners
        const buttonClickHandler = () => {
            fetchData(); // Using Fetch API
            sendSocketRequest(); // Using Socket.io
        };

        // Socket.io example
        const sendSocketRequest = () => {
            // Customize this event and payload based on your server's socket.io setup
            socket.emit('clientEvent', { message: 'Hello, server!' });
        };

        // Attach event listener
        const button = document.getElementById('sendRequestButton');
        button.addEventListener('click', buttonClickHandler);

        // Cleanup function
        return () => {
            // Remove event listener or perform cleanup if needed
            button.removeEventListener('click', buttonClickHandler);
        };
    }, []); // Empty dependency array to run the effect only once

    return (
        <div>
            <button id="sendRequestButton">
                Send Request
            </button>
            {/* Your other JSX content */}
        </div>
    );
};

export default Home;
