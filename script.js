const form = document.getElementById("memberForm");
const tableBody = document.querySelector("#recordsTable tbody");

let contributions = JSON.parse(localStorage.getItem("contributions")) || [];

function renderTable() {
  tableBody.innerHTML = "";
  contributions.forEach(({ name, amount, coin }) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${name}</td><td>${amount}</td><td>${coin}</td>`;
    tableBody.appendChild(row);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("memberName").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const coin = document.getElementById("coin").value;

  if (name && amount) {
    contributions.push({ name, amount, coin });
    localStorage.setItem("contributions", JSON.stringify(contributions));
    renderTable();
    showMockTransaction(name, amount, coin);
    form.reset();
  }
});

function showMockTransaction(name, amount, coin) {
  const txHash = Math.random().toString(16).substring(2, 10);
  document.getElementById("mockTransaction").innerText = 
    `${amount} ${coin} contributed by ${name}. Tx Hash: 0x${txHash}`;
}

function exportCSV() {
  let csv = "Member,Amount,Coin\n";
  contributions.forEach(({ name, amount, coin }) => {
    csv += `${name},${amount},${coin}\n`;
  });
  const blob = new Blob([csv], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "chama_contributions.csv";
  link.click();
}

renderTable();
