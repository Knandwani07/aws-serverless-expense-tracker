# Expense Dashboard Frontend

### 📌 UI Layer of the Serverless Expense Tracker  
A modern, responsive frontend built using HTML, CSS, and JavaScript that interacts with AWS APIs in real-time.

---

### ⚡ What This Frontend Does

This is where the magic becomes visible.

• Add and manage expenses through a clean UI  
• View total spending instantly  
• See category-wise breakdown (donut chart)  
• Delete expenses with smooth UI updates  
• Real-time sync with backend API  

---

### 🧠 How It Connects

Frontend → API Gateway → Lambda → DynamoDB  

• Sends HTTP requests to backend API  
• Receives JSON responses  
• Updates UI dynamically without reload  


---

### 🧩 Core Files

| File         | Purpose                                      |
|--------------|----------------------------------------------|
| index.html   | Structure and layout of the UI               |
| style.css    | Styling, animations, and responsive design  |
| script.js    | API calls, DOM updates, and logic handling  |

---

### ✨ UI Highlights

• Minimal black & white aesthetic with glow effects :contentReference[oaicite:1]{index=1}  
• Dynamic total spending display  
• Currency selector (₹, $, €, etc.)  
• Animated donut chart for category insights  
• Interactive table with delete functionality  
• Smooth transitions and micro-interactions  

---

### 🚀 Features in Action

• Add Expense → instantly appears in table  
• Delete Expense → updates UI + backend  
• Category Tracking → auto updates chart  
• Total Calculation → updates in real-time  

---

### 🖥️ How to Run

1. Open `index.html` in your browser  
2. Make sure API URL is correctly set in `script.js`  
3. Start adding expenses 

---

### ⚠️ Important Note

• Requires backend (AWS Lambda + API Gateway) to be active  
• CORS must be enabled on API Gateway  
• Internet connection required for API calls  

---

### 🧠 What This Teaches

• Frontend + serverless integration  
• API-based communication  
• DOM manipulation with real-time updates  
• Handling async requests (fetch API)  
• UI/UX design with modern styling  
