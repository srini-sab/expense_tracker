# expense_tracker
 Expense Tracker Web App
A simple yet powerful web appplication for tracking 
daily expenses. It features a clean user interface to add expenses by category and provides a real-time monthly summary and a visual breakdown with a dynamic pie chart. This project is built with a Node.js/Express backend and a vanilla JavaScript frontend.

✨ Screenshot
Here's a look at the application in action:
<img width="586" height="369" alt="img1" src="https://github.com/user-attachments/assets/96b924c8-8da6-406c-94b2-577f4dacb918" />
 <img width="503" height="425" alt="img2" src="https://github.com/user-attachments/assets/355b03d1-9c63-4874-99d5-d962b9d1bfe7" />

⭐ Features
Add Expenses: Easily add expenses with an amount and a predefined category.

View History: See a real-time, chronological list of all your entered expenses.

Monthly Summary: Track your total monthly spending against a set limit.

Visual Breakdown: Visualize your spending habits with a dynamic pie chart that groups expenses by category.

Real-time Updates: The expense list, summary, and chart all update instantly when a new expense is added.

🛠️ Tech Stack
Backend: Node.js, Express.js

Frontend: HTML5, CSS3, Vanilla JavaScript (ES6+)

Charting Library: Chart.js

🚀 Getting Started
Follow these instructions to get a copy of the project up and running on your local machine.

Prerequisites
Make sure you have Node.js and npm installed on your system. You can check their versions with the following commands:

Bash

node -v
npm -v
Installation & Setup
Clone the repository to your local machine:

Bash

git clone https://github.com/G-Assist/expense-tracker-js-chart.git
Navigate into the project directory:

Bash

cd expense-tracker-js-chart
Install the necessary NPM packages:

Bash

npm install
Start the server:

Bash

npm start
View the application:
Open your favorite web browser and navigate to http://localhost:3000.

📁 File Structure
The project follows a standard structure for a simple full-stack application:

expense-tracker-js-chart/
├── public/             # Contains all static frontend files
│   ├── index.html      # The main HTML file for the UI
│   └── script.js       # The frontend JavaScript for interactivity
├── .gitignore          # Specifies files and folders to be ignored by Git
├── package.json        # Contains project metadata and dependency list
├── README.md           # You are reading this file!
└── server.js           # The Node.js/Express backend server and API logic
