# Fair Fund Global 💰  
*A Smart Loan Application Web App with Full CRUD Operations*  

## 🔗 Live Demo  
[🌐 View Live on GitHub Pages](https://tasha-maina.github.io/phase-1-fair-fund-global-project/)  
[📁 GitHub Repository](https://github.com/tasha-maina/phase-1-fair-fund-global-project)

---

## 📌 Project Overview  
**Fair Fund Global** is a user-friendly **loan application platform** that simulates real-world lending practices. Applicants are asked important financial questions, must pay a **5% non-refundable evaluation fee**, and can manage their applications in real time.

This project was built as a **Single Page Application (SPA)** using **HTML, CSS, JavaScript**, and a **JSON Server** mock API. All data communication is handled asynchronously using the **Fetch API** and JSON format.

---

## ✅ Features  

### 📝 Loan Application Form  
Users provide:
- Full Name  
- Email Address  
- Employment Status  
- Stable Income (Yes/No)  
- Previous Loan Repayment Status (Yes/No)  

🧮 A 5% **non-refundable evaluation fee** is calculated and displayed dynamically.  
📤 Form data is submitted using a **POST** request.

---

### 📄 My Applications Dashboard  
- View all submitted applications (**GET**)  
- Edit application details (**PATCH**)  
- Delete an application (**DELETE**)  

All interactions persist via **JSON Server** (mock backend).

---

## 🧰 Tech Stack  
- **Frontend:** HTML, CSS, JavaScript  
- **Mock Backend:** JSON Server (`db.json`)  
- **Data Handling:** Fetch API (`GET`, `POST`, `PATCH`, `DELETE`)

---

## 🧪 Event Listeners Used  
This application uses the following JavaScript event listeners:
- `DOMContentLoaded` — Load and render initial data  
- `submit` — Handle loan application form submission  
- `click` — Handle delete/edit button actions

---

## 🛠️ Getting Started  

### ⚙️ Prerequisites  
- Node.js installed  
- JSON Server installed (`npm install -g json-server`)

### 🚀 Setup Instructions  
1. **Clone the project**
```bash
git clone https://github.com/tasha-maina/phase-1-fair-fund-global-project.git
cd phase-1-fair-fund-global-project
json-server --watch db.json

##Open index.html directly in your browser
##Or use Live Server in your code editor

##📂 Project Structure
📁 phase-1-fair-fund-global-project  
├── index.html  
├── style.css  
├── script.js  
└── db.json  

##👨‍💻 Author
MAINA NATASHA ANASTASIA WANGARI
GitHub: @tasha-maina

##📜 License
© 2025 Fair Fund Global — All rights reserved.
This project is licensed under the MIT License.





