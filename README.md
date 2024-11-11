______________________________________________________________________________________________________________________________________________________________________
Project/app name: Jaddu Inc.
Current version 2.0
______________________________________________________________________________________________________________________________________________________________________

Project Overview:

The Employee International Payments Portal is a secure, efficient platform designed to handle the payment processing for employees working internationally. The portal enables the management of sensitive financial transactions, ensuring the protection of employees data while adhering to industry best practices for security and code quality.
______________________________________________________________________________________________________________________________________________________________________

 Contents:

 1. Features
 2. Technologies
 3. Security Measures
 4. Installation
 5. Hardware Specs
 6. Software Specs
 7. How to download the project from GitHub
 8. Running the Application using the terminal 
 9. How to use the application
    - Register
    - Login
 10. Login Credentials
 11. FAQs
 12. Code Attributions
 13. Developer Team Info
 14. GitHub Links

______________________________________________________________________________________________________________________________________________________________________

Features:

- No user registration required
- Password security with Hashing and Salting
- Input validation via RegEx Patterns
- SSL Encryption for secure communication
- Protection against common attacks
- User authentication and authorization
- CI/CD Pipeline with CircleCI
- SonarQube code quality analysis
____________________________________________________________________________________________________________________________________________________

Technologies:

Frontend: React 
Backend: Node.js, Express.js
Database: MongoDB
Security: bcrypt for password hashing, RegEx for input validation, and SSL for secure traffic, SonarQube
Development Tools: Visual Studio Code (VS Code), Postman (for API testing) 
Code Quality Analysis: SonarQube
Pipeline: CircleCI
______________________________________________________________________________________________________________________________________________________________________
 
Security Measures:

Password Security:
Passwords are hashed and salted using bcrypt before being stored in the database.

Input Whitelisting:
All user input is sanitized and validated using RegEx patterns to prevent malicious data from entering the system.

SSL/TLS Encryption:
The application is served over HTTPS to ensure that all traffic is encrypted and secure.

Protection against common attacks:
Prevents SQL Injection: By using MongoDB and validating all input, the risk of SQL   injection is eliminated.
______________________________________________________________________________________________________________________________________________________________________

Installation Instructions:
Before you can run this project, ensure you have the following installed:

Node.js (v14+) 
[https://nodejs.org/en/download/package-manager]

npm (Node Package Manager)
[https://www.carmatec.com/blog/how-to-install-node-js-and-npm-on-windows-macos-linux/]

MongoDB
[https://www.mongodb.com/docs/compass/current/install/]

Visual Studio Code (VS Code)
[https://code.visualstudio.com/download]

______________________________________________________________________________________________________________________________________________________________________

Hardware specs:
 
1280 x 800 minimum screen resolution
8 GB of available disk space minimum
x86_64 CPU architecture; 2nd generation Intel Core or newer, or AMD CPU with support for a Windows Hypervisor
8 GB RAM or more
______________________________________________________________________________________________________________________________________________________________________

Software specs:

64-bit Microsoft® Windows® 8/10/11
______________________________________________________________________________________________________________________________________________________________________

How to download the project from github:
  
1. Visit the Repository: Go to the GitHub repository's page.
2. Click "Download ZIP" from the "Code" dropdown, then extract it after downloading and open in visual studio code. 
______________________________________________________________________________________________________________________________________________________________________

Running the Application using the terminal

npm install

To start the backend server:
cd backend
npm start

To start the frontend (React)
cd ../frontend
npm start

______________________________________________________________________________________________________________________________________________________________________
 
How to use application:

 1. Login

 To begin using the application, start by accessing the Login screen, which is the initial interface presented upon opening. 
 Here, users have to login using their Username, Account Number and Password. 
 Once logged in, users will be directed to the subsequent screen to continue with the application's functionalities.

 2. Register

 If the user doesn't have an account, the user access the Register screen. 
 Here, users have to register using their Full name, ID Number, Account Number and Password. 
 Once registered, users will be directed to the subsequent screen to continue with the application's functionalities.

______________________________________________________________________________________________________________________________________________________________________

Login Credentials:

Email: admin
Password: admin124

Email: john123
Password: JohnJames123
______________________________________________________________________________________________________________________________________________________________________
 
FAQ (Frequently Asked Questions)

Q: How is password security enforced?
A: Passwords are hashed using bcrypt with salting to enhance security before being stored in MongoDB.

Q: How are users authenticated?
A: User authentication is handled via JSON Web Tokens (JWT). Tokens are generated upon login and are used for accessing protected API routes.

Q: Is the data traffic secure?
A: Yes, the application serves all traffic over SSL, ensuring data integrity and security in transit.

Q: What types of input validation are used?
A: All user inputs are validated using RegEx patterns to ensure that only valid data is processed.

______________________________________________________________________________________________________________________________________________________________________

Code Attributions ( Part 3 )

LabGuide
- Yusuf Paruk

CircleCI QuickStart Guide
- CircleCI
- https://circleci.com/docs/getting-started/

SonarQube 10.7 Documentation
- SonarQube 
- https://docs.sonarsource.com/sonarqube/latest/

What is an SSL Certificate?
- Digicert
- https://www.digicert.com/what-is-an-ssl-certificate#:~:text=Secure%20Sockets%20Layer%20(SSL)%20is,client%20(e.g.%2C%20Outlook).

React Quick Start
- React
- https://react.dev/learn
______________________________________________________________________________________________________________________________________________________________________
 
Developer Team Info

stNum: ST10142348
Name:  Kimberly Mereese Shanitha Naidoo
Email: ST10142348@vcconnect.edu.za

stNum: ST10242607
Name:  Sahendran Kandasami
Email: ST10242607@vcconnect.edu.za

stNum: ST10065078
Name:  Kyle Akiel Bhugwandas
Email: ST10065078@vcconnect.edu.za

stNum: ST10044651
Name:  Diego Matthew Bandle
Email: ST10044651@vcconnect.edu.za
_______________________________________________________________________________________________________________________________________________________________
 
Github Repository links:
 
Individual Links from campus:

Kimberly Mereese Shanitha Naidoo - ST10142348
https://github.com/VCWVL/apds7311-poe-Kimberly-Naidoo

Sahendran Kandasami - ST10242607
https://github.com/VCWVL/apds7311-poe-Sahendran-Kandasami11

Kyle Akiel Bhugwandas - ST10065078
https://github.com/VCWVL/apds7311-poe-KyleBhugwandas

Diego Matthew Bandle - ST10044651
https://github.com/VCWVL/apds7311-poe-DiegoBandle


Group Link (This link was created by Kyle Bhugwandas):
https://github.com/KyleBhugwandas/APDS7311_POE

