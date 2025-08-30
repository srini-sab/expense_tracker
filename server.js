
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

let expenses = [];
const monthlyLimit = 10000;

app.post('/add-expense', (req, res) => {
    const { amount, category } = req.body;
    if (!amount || !category) {
        return res.status(400).json({ message: 'Invalid input' });
    }
    const newExpense = {
        amount: parseFloat(amount),
        category,
        timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        month: new Date().getMonth(),
        year: new Date().getFullYear()
    };
    expenses.push(newExpense);
    res.status(200).json({ message: 'Expense added', data: newExpense });
});

app.get('/get-expenses', (req, res) => {
    res.json(expenses);
});

app.get('/monthly-total', (req, res) => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const total = expenses
        .filter(e => e.month === currentMonth && e.year === currentYear)
        .reduce((sum, e) => sum + e.amount, 0);
    res.json({ total, limit: monthlyLimit });
});

app.get('/category-summary', (req, res) => {
    // ADDED: A log to prove this endpoint is being called
    console.log('SUCCESS: The /category-summary API endpoint was reached!'); 
    
    const summary = expenses.reduce((acc, expense) => {
        const { category, amount } = expense;
        if (!acc[category]) {
            acc[category] = 0;
        }
        acc[category] += amount;
        return acc;
    }, {});
    res.json(summary);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    // ADDED: A log to prove you are running the newest version of the file
    console.log('SERVER VERSION 2 IS RUNNING (with chart endpoint)'); 
});



