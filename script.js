// public/script.js

document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('amount');
    const categoryInput = document.getElementById('category');
    const addButton = document.getElementById('addBtn');
    const expenseList = document.getElementById('expenseList');
    const monthlySummary = document.getElementById('monthlySummary');
    
    // ADDED: Variable to hold the chart instance
    let expensePieChart;

    async function loadExpenses() {
        try {
            const res = await fetch('/get-expenses');
            const data = await res.json();
            expenseList.innerHTML = '';
            data.forEach(renderExpense);
        } catch (error) {
            console.error('Failed to load expenses:', error);
        }
    }

    async function loadMonthlyTotal() {
        try {
            const res = await fetch('/monthly-total');
            const { total, limit } = await res.json();
            let summaryText = `This month's total: ₹${total.toFixed(2)} / ₹${limit}`;
            monthlySummary.innerHTML = `<span class="${total > limit ? 'warning' : ''}">${summaryText}</span>`;
            if (total > limit) {
                 monthlySummary.firstChild.textContent += ` 🔴 Limit Exceeded!`;
            }
        } catch (error) {
            console.error('Failed to load monthly total:', error);
        }
    }
    
    // ADDED: Function to fetch data and render the pie chart
    async function loadCategoryChart() {
        try {
            const res = await fetch('/category-summary');
            const data = await res.json();
            
            const ctx = document.getElementById('expenseChart').getContext('2d');
            const labels = Object.keys(data);
            const amounts = Object.values(data);

            // Destroy the old chart before drawing a new one
            if (expensePieChart) {
                expensePieChart.destroy();
            }

            expensePieChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Expenses by Category',
                        data: amounts,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.7)',
                            'rgba(54, 162, 235, 0.7)',
                            'rgba(255, 206, 86, 0.7)',
                            'rgba(75, 192, 192, 0.7)',
                            'rgba(153, 102, 255, 0.7)',
                            'rgba(255, 159, 64, 0.7)'
                        ],
                        borderColor: '#fff',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        }
                    }
                }
            });

        } catch(error) {
            console.error('Failed to load chart data:', error);
        }
    }


    function renderExpense(exp) {
        const div = document.createElement('div');
        div.innerHTML = `
            <span><strong>${exp.category}</strong>: ₹${exp.amount.toFixed(2)}</span>
            <span style="color: #888; font-size: 0.8em;">${exp.timestamp}</span>
        `;
        expenseList.prepend(div);
    }

    addButton.addEventListener('click', async () => {
        const amount = amountInput.value;
        const category = categoryInput.value;

        if (!amount || amount <= 0 || !category) {
            alert('Please enter a valid amount and select a category.');
            return;
        }

        try {
            const res = await fetch('/add-expense', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount, category })
            });

            const result = await res.json();
            if (res.ok) {
                amountInput.value = '';
                categoryInput.value = '';
                
                loadExpenses();
                loadMonthlyTotal();
                loadCategoryChart(); // ADDED: Update the chart when a new expense is added
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error('Failed to add expense:', error);
            alert('Could not connect to the server.');
        }
    });

    // Initial load when the page is ready
    loadExpenses();
    loadMonthlyTotal();
    loadCategoryChart(); // ADDED: Load the chart on page startup
});