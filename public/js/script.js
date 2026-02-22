/* ===============================
   COURSE SELECTION
================================ */
function selectCourse(course, amount = "") {
    localStorage.setItem("payCourse", course);
    localStorage.setItem("programType", "Course");

    if (amount !== "") {
        localStorage.setItem("payAmount", amount);
        window.location = "payment.html";
    } else {
        window.location = "fees.html";
    }
}

/* ===============================
   INTERNSHIP SELECTION
================================ */
function selectInternMonths(months) {

    localStorage.setItem("payCourse", "Internship Program");
    localStorage.setItem("programType", months + " Month Internship");

    let fee =
        months == 1 ? 3000 :
        months == 2 ? 6000 : 9000;

    localStorage.setItem("payAmount", fee);

    window.location = "payment.html";
}

/* ===============================
   AUTO FILL PAYMENT PAGE
================================ */
window.addEventListener("load", () => {
    if (document.getElementById("payCourse")) {

        document.getElementById("payCourse").value =
            localStorage.getItem("payCourse") || "";

        document.getElementById("programType").value =
            localStorage.getItem("programType") || "Course";

        document.getElementById("payAmount").value =
            localStorage.getItem("payAmount") || "";
    }
});

/* ===============================
   PAYMENT PROCESS
================================ */
document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("paymentForm");
    if (!form) return;

    let paymentStep = 0;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("payName").value;
        const email = document.getElementById("payEmail").value;
        const course = document.getElementById("payCourse").value;
        const programType = document.getElementById("programType").value;
        const amount = document.getElementById("payAmount").value;

        /* STEP 1: SHOW QR PAYMENT */
        if (paymentStep === 0) {
            showUPIQR(name, amount);
            paymentStep = 1;
            alert("Scan QR or pay using UPI ID.");
            return;
        }

        /* STEP 2: SAVE ENROLLMENT & RECEIPT */
        const enrollment = {
            receiptNo: generateReceiptNo(),
            name,
            email,
            course,
            programType,
            amount,
            date: new Date().toLocaleString()
        };

        saveEnrollment(enrollment);
        generateReceipt(enrollment);

        alert("Enrollment successful!");
    });
});

/* ===============================
   SAVE ENROLLMENT LOCAL
================================ */
function saveEnrollment(data) {

    let list = JSON.parse(localStorage.getItem("enrollments")) || [];
    list.push(data);

    localStorage.setItem("enrollments", JSON.stringify(list));
}

/* ===============================
   RECEIPT NUMBER
================================ */
function generateReceiptNo() {
    return "RCPT" + Math.floor(100000 + Math.random() * 900000);
}

/* ===============================
   RECEIPT GENERATION
================================ */
function generateReceipt(data) {

    const win = window.open("", "_blank");

    win.document.write(`
        <html>
        <head>
            <title>Payment Receipt</title>
            <style>
                body{font-family:Arial;padding:30px}
                h2{text-align:center}
                table{width:100%;border-collapse:collapse;margin-top:20px}
                td{padding:10px;border-bottom:1px solid #ddd}
            </style>
        </head>
        <body>

        <h2>Learning Academy Receipt</h2>

        <table>
            <tr><td>Receipt No</td><td>${data.receiptNo}</td></tr>
            <tr><td>Name</td><td>${data.name}</td></tr>
            <tr><td>Email</td><td>${data.email}</td></tr>
            <tr><td>Program</td><td>${data.course}</td></tr>
            <tr><td>Type</td><td>${data.programType}</td></tr>
            <tr><td>Amount Paid</td><td>₹${data.amount}</td></tr>
            <tr><td>Date</td><td>${data.date}</td></tr>
        </table>

        <p style="margin-top:30px;">
            Thank you for enrolling with Learning Academy.
        </p>

        <script>
            window.print();
        <\/script>

        </body>
        </html>
    `);

    win.document.close();
}

/* ===============================
   UPI QR GENERATION
================================ */
function showUPIQR(name, amount) {

    const upiId = "learningacademy@upi";

    const upiLink =
        `upi://pay?pa=${upiId}&pn=Learning Academy&am=${amount}&cu=INR&tn=Course Payment by ${name}`;

    const section = document.getElementById("upiSection");
    if (!section) return;

    section.style.display = "block";

    document.getElementById("qrcode").innerHTML = "";

    new QRCode(document.getElementById("qrcode"), {
        text: upiLink,
        width: 220,
        height: 220
    });
}

/* ===============================
   CHATBOT
================================ */
function toggleChat(){
    let chat=document.getElementById("chatbot-container");
    chat.style.display = chat.style.display==="flex"?"none":"flex";
}

function sendMessage(){
    let input=document.getElementById("chatbot-input");
    let msg=input.value.trim();
    if(!msg) return;

    addMessage(msg,"user");
    input.value="";

    setTimeout(()=>addMessage(botReply(msg),"bot"),500);
}

function addMessage(text,type){
    let box=document.getElementById("chatbot-messages");
    let div=document.createElement("div");
    div.className="message "+type;
    div.innerText=text;
    box.appendChild(div);
    box.scrollTop=box.scrollHeight;
}

function botReply(msg){
    msg=msg.toLowerCase();

    if(msg.includes("course"))
        return "We offer Python, Java, AI/ML, Data Science, DevOps, Cloud and more.";

    if(msg.includes("fee"))
        return "Open Fees page and select course.";

    if(msg.includes("internship"))
        return "1 month no stipend. 2–3 months stipend up to ₹5000.";

    if(msg.includes("payment"))
        return "Payment page auto fills after selecting course.";

    return "Ask about courses, fees, internships or payment.";
}
