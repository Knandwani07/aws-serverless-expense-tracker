# 🔄 Execution Flow

This section outlines the complete step-by-step process used to build and run the serverless expense tracking application on AWS. The workflow covers infrastructure setup, backend configuration, API integration, and frontend interaction.

---

### 🧱 Step 1: Create DynamoDB Table

• Open AWS Management Console  
• Navigate to DynamoDB and select "Create Table"  
• Configure:
  - Table Name: Expenses  
  - Partition Key: expense_id (String)  
• Select On-Demand capacity mode  
• Keep remaining settings as default and create the table  

This table serves as the primary data store for all expense records.

---

### 🔐 Step 2: Create IAM Role

• Navigate to IAM → Roles → Create Role  
• Select AWS Service → Lambda  
• Attach policies:
  - AmazonDynamoDBFullAccess  
  - AWSLambdaBasicExecutionRole  
• Assign a role name and create  

This role enables secure interaction between Lambda and other AWS services.

---

### ⚙️ Step 3: Create Lambda Function

• Navigate to AWS Lambda → Create Function  
• Choose "Author from scratch"  
• Configure:
  - Function Name: ExpenseHandler  
  - Runtime: Python 3.x  
• Attach the previously created IAM role  

Lambda acts as the backend engine for processing all requests.

---

### 🧠 Step 4: Add Backend Logic

• Implement CRUD operations inside Lambda:
  - POST → Add expense  
  - GET → Retrieve expense  
  - PUT → Update expense  
  - DELETE → Delete expense  
• Deploy the function after adding code  

This step defines the application logic and database interactions.

---

### 🌐 Step 5: Create API Gateway

• Navigate to API Gateway → Create API  
• Select HTTP API  
• Integrate with Lambda (ExpenseHandler)  
• Configure routes:
  - POST /expense  
  - GET /expense  
  - PUT /expense  
  - DELETE /expense  
• Create and deploy the API  

API Gateway acts as the entry point for all client requests.

---

### 🔓 Step 6: Enable CORS

• Open CORS settings in API Gateway  
• Configure:
  - Allow Origin: *  
  - Allow Methods: GET, POST, PUT, DELETE, OPTIONS  
  - Allow Headers: Content-Type  
• Save and deploy  

This allows the frontend application to communicate with the backend.

---

### 🧪 Step 7: Test the API

• Use Postman or similar tool  
• Send a POST request with:
  - amount  
  - category  
  - date  
• Verify that data is successfully stored in DynamoDB  

This ensures the backend and API are functioning correctly.

---

### 🎨 Step 8: Build Frontend

Create the following files:

• index.html  
• style.css  
• script.js  

Frontend features include:

• Form to add expenses  
• Table to display expenses  
• Total expense calculation  
• Delete functionality  

---

### 🔗 Step 9: Connect Frontend to Backend

• Update API endpoint URL in script.js  
• Ensure correct integration with API Gateway  

This connects the user interface with backend services.

---

### 🖥️ Step 10: Run the Application

• Open index.html in a browser  
• Add an expense using the form  
• View updates instantly in the table  

The system reflects changes in real time.

---

### 🎥 Step 11: Demo

The application can be demonstrated by performing CRUD operations through the UI and observing real-time updates.

---

### 🧹 Step 12: Cleanup

To avoid unnecessary AWS charges, delete:

• API Gateway  
• Lambda function  
• DynamoDB table  
• IAM role  
• CloudWatch logs  

---

### 🏁 Summary

This execution flow demonstrates how a complete serverless application is built using AWS services. By integrating Lambda, API Gateway, and DynamoDB, the system provides a scalable, efficient, and cost-effective solution without requiring server management.

The workflow reflects real-world cloud development practices and provides hands-on experience with serverless architecture, API design, and frontend-backend integration.
