# ⚙️ Expense Tracker Backend (AWS Lambda)

### 📌 Serverless Backend Layer  
A Python-based AWS Lambda function that handles backend logic for the expense tracking application, including CRUD operations and interaction with Amazon DynamoDB.

---

### 📝 Overview

This backend is implemented using AWS Lambda and is integrated with Amazon API Gateway to expose RESTful endpoints. It processes incoming HTTP requests, performs the required operations, and stores or retrieves data from DynamoDB.

The system follows a serverless architecture, ensuring scalability, reliability, and minimal operational overhead.

---

### ⚙️ Core Responsibilities

• Handle API requests from the frontend  
• Perform Create, Read, Update, and Delete (CRUD) operations  
• Interact with DynamoDB for persistent storage  
• Return structured JSON responses  
• Enable cross-origin resource sharing (CORS)  

---

### 🧠 Execution Flow

API Gateway → AWS Lambda → DynamoDB → Response  

• API Gateway receives an HTTP request  
• Lambda function is invoked  
• Logic is executed based on HTTP method  
• DynamoDB is queried or updated  
• Response is returned to the client  

---

### 🧩 Lambda Function Logic

The Lambda function determines the operation based on the HTTP method:

• POST → Creates a new expense record  
• GET → Retrieves an expense using expense_id  
• PUT → Updates an existing expense  
• DELETE → Deletes an expense  

All operations are implemented within a single handler function for simplicity.

---

### 🗃️ DynamoDB Table Schema

Table Name: Expenses

| Attribute    | Type   | Description                      |
|--------------|--------|----------------------------------|
| expense_id   | String | Unique identifier (UUID)         |
| amount       | String | Expense amount                   |
| category     | String | Expense category                 |
| date         | String | Date of the expense              |

---

### 🔌 API Endpoints

| Method  | Endpoint    | Description               |
|---------|------------|---------------------------|
| POST    | /expense   | Create a new expense      |
| GET     | /expense   | Retrieve expense by ID    |
| PUT     | /expense   | Update an expense         |
| DELETE  | /expense   | Delete an expense         |

---

### 📥 Sample Request (POST)

{
  "amount": "500",
  "category": "Food",
  "date": "2026-03-29"
}

---

### 📤 Sample Response

{
  "message": "Expense added",
  "id": "generated-uuid"
}

---

### 🔐 Security and Access

• IAM role is used to grant Lambda access to DynamoDB  
• Access follows the principle of least privilege  
• CORS headers are included for frontend integration  

---

### ⚠️ Important Notes

• GET and DELETE requests require expense_id as a query parameter  
• DynamoDB table must be created before invoking the Lambda function  
• API Gateway must have CORS properly configured  

---

### 🧠 Learning Outcomes

• Implementation of serverless backend using AWS Lambda  
• RESTful API design using API Gateway  
• Integration with DynamoDB using boto3  
• Handling JSON-based requests and responses  
• Managing cross-origin communication (CORS)  

---

### 🏁 Conclusion

This backend demonstrates a scalable and efficient serverless approach to handling application logic. It eliminates the need for server management while providing reliable and responsive API functionality.
