async function submitPayment() {

  const data = {
    name: document.getElementById("studentName").value,
    email: document.getElementById("studentEmail").value,
    phone: document.getElementById("studentPhone").value,
    programType: document.getElementById("programType").value,
    courseName: document.getElementById("courseSelect").value,
    internshipDuration: document.getElementById("internDuration")?.value,
    paymentMethod: "UPI",
    amount: 10000
  };

  try {
    const response = await fetch("/api/add-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    document.getElementById("successMessage").style.display = "block";

  } catch (err) {
    alert("Payment Error");
  }
}