let expenses = [];

function addExpense() {
    const name = document.getElementById("expense-name").value;
    const amount = parseFloat(document.getElementById("expense-amount").value);
    const category = document.getElementById("expense-category").value;

    if (name && amount && category) {
        const expense = { name, amount, category };
        expenses.push(expense);
        displayExpenses();
        updateChart();
        updateTotal();
        clearForm();
    }
}

function displayExpenses() {
    const expenseList = document.getElementById("expense-list");
    expenseList.innerHTML = "";

    expenses.forEach((expense, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `${expense.name} - $${expense.amount} 
        <span>(${expense.category})</span>
        <button onclick="removeExpense(${index})">Delete</button>`;
        expenseList.appendChild(listItem);
    });
}

function removeExpense(index) {
    expenses.splice(index, 1);
    displayExpenses();
    updateChart();
    updateTotal();
}

function updateTotal() {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    document.getElementById("total-expense").innerText = total.toFixed(2);
}

function clearForm() {
    document.getElementById("expense-name").value = "";
    document.getElementById("expense-amount").value = "";
    document.getElementById("expense-category").value = "Food";
}

// Pie Chart
function updateChart() {
    const categories = expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
    }, {});

    const chartData = {
        labels: Object.keys(categories),
        datasets: [{
            data: Object.values(categories),
            backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff']
        }]
    };

    const ctx = document.getElementById("expense-chart").getContext("2d");
    if (window.expenseChart) {
        window.expenseChart.destroy();
    }
    window.expenseChart = new Chart(ctx, {
        type: 'pie',
        data: chartData,
    });
}
