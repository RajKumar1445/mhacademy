/* =========================================
   FALLING STARS BACKGROUND (THREE JS)
========================================= */

let scene, camera, renderer, stars;

function initStars() {

const container = document.getElementById("three-bg");
if (!container) return;

scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / window.innerHeight,
1,
3000
);

camera.position.z = 1000;

renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

const starGeometry = new THREE.BufferGeometry();
const starCount = 8000;

const positions = new Float32Array(starCount * 3);

for (let i = 0; i < starCount; i++) {

positions[i * 3] = (Math.random() - 0.5) * 2000;
positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
positions[i * 3 + 2] = Math.random() * -3000;

}

starGeometry.setAttribute(
"position",
new THREE.BufferAttribute(positions, 3)
);

const starMaterial = new THREE.PointsMaterial({
color: 0x00f7ff,
size: 2,
transparent: true,
opacity: 0.9
});

stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

animateStars();
}

function animateStars() {

if (!stars) return;

const positions = stars.geometry.attributes.position.array;

for (let i = 0; i < positions.length; i += 3) {

positions[i + 2] += 5;   // speed

if (positions[i + 2] > 1000) {
positions[i + 2] = -3000;
}

}

stars.geometry.attributes.position.needsUpdate = true;

renderer.render(scene, camera);
requestAnimationFrame(animateStars);
}

window.addEventListener("resize", () => {

if (!camera || !renderer) return;

camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth, window.innerHeight);

});

initStars();


/* =========================================
   COUNTER ANIMATION
========================================= */

const counters = document.querySelectorAll(".counter");

window.addEventListener("scroll", () => {

counters.forEach(counter => {

if (counter.innerText !== "0") return;

const target = +counter.dataset.target;
let count = 0;
const speed = target / 120;

function update() {
count += speed;

if (count < target) {
counter.innerText = Math.ceil(count);
requestAnimationFrame(update);
} else {
counter.innerText = target;
}
}

update();

});

});


/* =========================================
   PROGRAM SLIDER (ARROWS WORKING)
========================================= */

let current = 0;
const slides = document.querySelectorAll(".program-card");

function showSlide(index) {

if (slides.length === 0) return;

slides.forEach(slide => slide.classList.remove("active"));
slides[index].classList.add("active");

}

function nextProgram() {

if (slides.length === 0) return;

current++;
if (current >= slides.length) current = 0;
showSlide(current);

}

function prevProgram() {

if (slides.length === 0) return;

current--;
if (current < 0) current = slides.length - 1;
showSlide(current);

}

if (slides.length > 0) {
showSlide(0);
}


/* =========================================
   WHATSAPP FUNCTION
========================================= */

function openWhatsApp() {

window.open(
"https://wa.me/917032932845?text=Hello I want details about courses",
"_blank"
);

}


/* =========================================
   ENROLL FUNCTION
========================================= */

function quickEnroll() {

window.location.href = "payment.html";

}


/* =========================================
   CHATBOT
========================================= */

function toggleChatbot() {

const box = document.getElementById("chatbot");
if (!box) return;

box.style.display =
box.style.display === "block" ? "none" : "block";

}

function botReply(type) {

const body = document.getElementById("chatBody");
if (!body) return;

let message = "";

if (type === "courses") {
message = "We offer AI/ML, MERN, Data Science, Cloud, Embedded, EV and more.";
}

if (type === "fees") {
message = "Course fees start from ₹10,000. Internship from ₹5,000.";
}

if (type === "internship") {
message = "1, 2 and 3 month internship programs available with certification.";
}

if (type === "placement") {
message = "Placement assistance available with top product and service companies.";
}

const p = document.createElement("p");
p.innerHTML = "<strong>AI:</strong> " + message;
body.appendChild(p);

body.scrollTop = body.scrollHeight;

}
/* ============================= */
/* CAROUSEL WORKING FINAL */
/* ============================= */

document.addEventListener("DOMContentLoaded", function(){

let index = 0;

const track = document.querySelector(".carousel-track");
const cards = document.querySelectorAll(".course-card-preview");

if(!track || cards.length === 0) return;

const visibleCards = 3; // how many visible at once
const cardWidth = cards[0].offsetWidth + 30; // width + gap

window.nextSlide = function(){
    index++;
    if(index > cards.length - visibleCards){
        index = 0;
    }
    track.style.transform = `translateX(-${index * cardWidth}px)`;
}

window.prevSlide = function(){
    index--;
    if(index < 0){
        index = cards.length - visibleCards;
    }
    track.style.transform = `translateX(-${index * cardWidth}px)`;
}

/* Auto Slide */
setInterval(function(){
    nextSlide();
}, 4000);

});
async function submitPayment(){
  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    contact: document.getElementById("contact").value,
    programType: document.getElementById("programType").value,
    course: document.getElementById("courseSelect").value,
    amount: 10000
  }

  try{
    const res = await fetch('/api/payment',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(data)
    })

    const result = await res.json()
    alert(result.message)

  }catch(error){
    alert("Error saving payment")
    console.log(error)
  }
}
// Course Fees
const courseFees = {
"Python Full Stack":15000,
"Java Full Stack":15000,
"Data Science":20000,
"Data Analytics":18000,
"AI & ML":25000,
"DevOps":18000,
"Cloud Computing":17000,
".NET":14000,
"Embedded Systems":22000,
"EV Technology":25000,
"VLSI":30000,
"AutoCAD":12000,
"Solar PV Systems":15000,
"MERN Full Stack":16000
};

const courseSelect = document.getElementById("courseSelect");

// Populate Courses
for(let course in courseFees){
let option = document.createElement("option");
option.value = course;
option.textContent = course;
courseSelect.appendChild(option);
}

// Initialize course amount
courseSelect.addEventListener("change", function(){
document.getElementById("amountField").value =
courseFees[this.value];
});

courseSelect.dispatchEvent(new Event("change"));

function toggleProgramType(){

const type = document.getElementById("programType").value;

if(type === "Course"){
document.getElementById("courseBox").classList.remove("hidden");
document.getElementById("internshipBox").classList.add("hidden");
courseSelect.dispatchEvent(new Event("change"));
}else{
document.getElementById("courseBox").classList.add("hidden");
document.getElementById("internshipBox").classList.remove("hidden");
updateInternshipFee();
}

}

function updateInternshipFee(){

const duration = document.getElementById("internDuration").value;

let amount = 0;

if(duration === "1") amount = 5000;
if(duration === "2") amount = 10000;
if(duration === "3") amount = 15000;

document.getElementById("amountField").value = amount;

}

function proceedToPay(){

const name = document.getElementById("studentName").value;
const email = document.getElementById("studentEmail").value;
const phone = document.getElementById("studentPhone").value;

if(name === "" || email === "" || phone === ""){
alert("Please fill all details first");
return;
}

document.getElementById("paymentOptions").classList.remove("hidden");

}

function showMethod(){

document.getElementById("upiBox").classList.add("hidden");
document.getElementById("qrBox").classList.add("hidden");
document.getElementById("cardBox").classList.add("hidden");

const method = document.getElementById("paymentMethod").value;

if(method==="upi")
document.getElementById("upiBox").classList.remove("hidden");

if(method==="qr")
document.getElementById("qrBox").classList.remove("hidden");

if(method==="card")
document.getElementById("cardBox").classList.remove("hidden");

}

function confirmPayment(){

if(document.getElementById("paymentMethod").value === ""){
alert("Select payment method");
return;
}

document.getElementById("paymentOptions").classList.add("hidden");
document.getElementById("successMessage").classList.remove("hidden");

}
/* Toggle Internship */
function toggleProgramType(){
const type=document.getElementById("programType").value;
document.getElementById("internshipBox").style.display =
type==="Internship"?"block":"none";
}

/* Show Payment Options */
function showPayment(){

const name=document.getElementById("studentName").value.trim();
const email=document.getElementById("studentEmail").value.trim();
const phone=document.getElementById("studentPhone").value.trim();

if(name==="" || email==="" || phone===""){
alert("Please fill all details");
return;
}

if(phone.length!==10){
alert("Contact must be 10 digits");
return;
}

document.getElementById("paymentOptions").style.display="block";
}

/* Show QR / UPI */
function showMethod(val){
document.getElementById("qrBox").style.display =
val==="qr"?"block":"none";
document.getElementById("upiBox").style.display =
val==="upi"?"block":"none";
}

/* 🔥 ACTUAL DATABASE SUBMIT */
async function submitPayment(){

const data = {
name: document.getElementById("studentName").value,
email: document.getElementById("studentEmail").value,
contact: document.getElementById("studentPhone").value,
programType: document.getElementById("programType").value,
course: document.getElementById("courseSelect").value,
internDuration: document.getElementById("internDuration")?.value || null,
amount: 10000
}

try{

const res = await fetch('/api/payment',{
method:'POST',
headers:{'Content-Type':'application/json'},
body: JSON.stringify(data)
})

const result = await res.json()

document.getElementById("successMessage").style.display="block"
document.getElementById("paymentOptions").style.display="none"

}catch(err){
alert("Error saving payment")
console.log(err)
}

}
/* Toggle Internship */
function toggleProgramType(){
const type=document.getElementById("programType").value;
document.getElementById("internshipBox").style.display =
type==="Internship"?"block":"none";
}

/* Show Payment Options */
function showPayment(){

const name=document.getElementById("studentName").value.trim();
const email=document.getElementById("studentEmail").value.trim();
const phone=document.getElementById("studentPhone").value.trim();

if(name==="" || email==="" || phone===""){
alert("Please fill all details");
return;
}

if(phone.length!==10){
alert("Contact must be 10 digits");
return;
}

document.getElementById("paymentOptions").style.display="block";
}

/* Show QR / UPI */
function showMethod(val){
document.getElementById("qrBox").style.display =
val==="qr"?"block":"none";
document.getElementById("upiBox").style.display =
val==="upi"?"block":"none";
}

/* 🔥 ACTUAL DATABASE SUBMIT */
async function submitPayment(){

const data = {
name: document.getElementById("studentName").value,
email: document.getElementById("studentEmail").value,
contact: document.getElementById("studentPhone").value,
programType: document.getElementById("programType").value,
course: document.getElementById("courseSelect").value,
internDuration: document.getElementById("internDuration")?.value || null,
amount: 10000
}

try{

const res = await fetch('/api/payment',{
method:'POST',
headers:{'Content-Type':'application/json'},
body: JSON.stringify(data)
})

const result = await res.json()

document.getElementById("successMessage").style.display="block"
document.getElementById("paymentOptions").style.display="none"

}catch(err){
alert("Error saving payment")
console.log(err)
}

}
/* Toggle Internship */
function toggleProgramType(){
const type=document.getElementById("programType").value;
document.getElementById("internshipBox").style.display =
type==="Internship"?"block":"none";
}

/* Show Payment Options */
function showPayment(){

const name=document.getElementById("studentName").value.trim();
const email=document.getElementById("studentEmail").value.trim();
const phone=document.getElementById("studentPhone").value.trim();

if(name==="" || email==="" || phone===""){
alert("Please fill all details");
return;
}

if(phone.length!==10){
alert("Contact must be 10 digits");
return;
}

document.getElementById("paymentOptions").style.display="block";
}

/* Show QR / UPI */
function showMethod(val){
document.getElementById("qrBox").style.display =
val==="qr"?"block":"none";
document.getElementById("upiBox").style.display =
val==="upi"?"block":"none";
}

/* 🔥 ACTUAL DATABASE SUBMIT */
async function submitPayment(){

const data = {
name: document.getElementById("studentName").value,
email: document.getElementById("studentEmail").value,
contact: document.getElementById("studentPhone").value,
programType: document.getElementById("programType").value,
course: document.getElementById("courseSelect").value,
internDuration: document.getElementById("internDuration")?.value || null,
amount: 10000
}

try{

const res = await fetch('/api/payment',{
method:'POST',
headers:{'Content-Type':'application/json'},
body: JSON.stringify(data)
})

const result = await res.json()

document.getElementById("successMessage").style.display="block"
document.getElementById("paymentOptions").style.display="none"

}catch(err){
alert("Error saving payment")
console.log(err)
}

}
