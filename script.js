const form = document.getElementById('loanForm');
const resultDiv = document.getElementById('result');
const errorDiv = document.getElementById('error');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  errorDiv.textContent = "";
  resultDiv.innerHTML = "";

  const fullName = document.getElementById('fullName').value.trim();
  const email = document.getElementById('email').value.trim();
  const amount = Number(document.getElementById('amount').value);
  const duration = Number(document.getElementById('duration').value);
  const employed = document.getElementById('employed').value;
  const stableIncome = document.getElementById('stableIncome').value;
  const previousLoans = document.getElementById('previousLoans').value;

  if (!fullName || !email || !amount || !duration || !employed || !stableIncome || !previousLoans) {
    errorDiv.textContent = "Please fill out all fields.";
    return;
  }

  const evaluationFee = +(amount * 0.05).toFixed(2);
  const monthlyRepayment = +(amount * 0.01).toFixed(2);

  const trustScore = [employed, stableIncome, previousLoans].filter(v => v === 'yes').length;
  const trustLevel = trustScore === 3 ? 'High' : trustScore === 2 ? 'Medium' : 'Low';
  const status = trustLevel === 'High' ? 'Approved' : 'Rejected';

  const application = {
    fullName,
    email,
    amount,
    duration,
    evaluationFee,
    monthlyRepayment,
    trustLevel,
    status,
    submittedAt: new Date().toISOString()
  };

  fetch('http://localhost:3000/applications', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(application)
  })
  .then(res => res.json())
  .then(data => {
    if (status === 'Approved') {
      resultDiv.className = "result-box success";
      resultDiv.innerHTML = `
        <h3>✅ Loan Approved</h3>
        <p>Thank you, <strong>${fullName}</strong>.</p>
        <p>Loan amount: KES <strong>${amount.toLocaleString()}</strong></p>
        <p>Repayment period: <strong>${duration} months</strong></p>
        <p>Monthly repayment (1%): KES <strong>${monthlyRepayment}</strong></p>
        <p>Evaluation fee paid: KES <strong>${evaluationFee}</strong></p>
        <p>We will contact you shortly via <strong>${email}</strong>.</p>
      `;
    } else {
      resultDiv.className = "result-box error";
      resultDiv.innerHTML = `
        <h3>❌ Application Not Approved</h3>
        <p>Sorry <strong>${fullName}</strong>, based on your application, you are not eligible for a loan at this time.</p>
        <p>If you believe this is a mistake, please contact support@fairfund.com.</p>
      `;
    }

    //reset form fields after submit
    form.reset();

    loadApplications();
  })
  .catch(err => {
    console.error(err);
    errorDiv.textContent = "Something went wrong. Please try again.";
  });
});
// Load and display all applications
function loadApplications() {
  fetch('http://localhost:3000/applications')
    .then(res => res.json())
    .then(applications => {
      // Clear previous applications but keep existing resultDiv content (e.g., form result)
  
      const formResult = resultDiv.innerHTML; 
      resultDiv.innerHTML = formResult + `<h3>📄 All Applications</h3>`;

      applications.forEach(app => {
        const appBox = document.createElement('div');
        appBox.className = "application";

        appBox.innerHTML = `
          <p><strong>Name:</strong> ${app.fullName || "N/A"}</p>
          <p><strong>Email:</strong> ${app.email || "N/A"}</p>
          <p><strong>Amount:</strong> KES ${app.amount?.toLocaleString() || "N/A"}</p>
          <p><strong>Status:</strong> <span style="color:${app.status === "Approved" ? "green" : app.status === "Rejected" ? "red" : "orange"}">${app.status || "Pending"}</span></p>
          <button onclick="updateStatus('${app.id}', 'Approved')">✅ Approve</button>
          <button onclick="updateStatus('${app.id}', 'Rejected')">❌ Reject</button>
          <button onclick="deleteApplication('${app.id}')">🗑️ Delete</button>
          <hr>
        `;

        resultDiv.appendChild(appBox);
      });
    })
    .catch(err => {
      console.error("Failed to fetch applications:", err);
      resultDiv.innerHTML += "<p>Error loading applications.</p>";
    });
}

// PATCH: Update loan status
function updateStatus(id, newStatus) {
  fetch(`http://localhost:3000/applications/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: newStatus })
  })
  .then(() => {
    // Refresh application list after status update
    resultDiv.innerHTML = "";
    loadApplications();
  })
  .catch(err => console.error("Failed to update status:", err));
}

// DELETE: Remove an application
function deleteApplication(id) {
  if (!confirm("Are you sure you want to delete this application?")) return;

  fetch(`http://localhost:3000/applications/${id}`, {
    method: "DELETE"
  })
  .then(() => {
    resultDiv.innerHTML = "";
    loadApplications();
  })
  .catch(err => console.error("Failed to delete application:", err));
}
loadApplications();
