______________________________________________________________________________________________________________________________________________________________________
 
 Project/app name: Jaddu Inc.
 Current version 1.0
______________________________________________________________________________________________________________________________________________________________________

 Description:

 This project implements a secure web-based portal for handling international customer payments. 
 The project includes both the frontend and backend (API) to ensure secure payment processing, user authentication, and data protection. 
 The application is built using React for the frontend, MongoDB as the NoSQL database, and Node.js/Express for the backend API.

______________________________________________________________________________________________________________________________________________________________________

 Contents:

 1. Features
 2. Technologies
 3. Security Measures
 4. Installation
 5. Hardware Specs
 6. Software Specs
 7. How to download the project from github
 8. Running the Application using the terminal 
 9. How to use the application
    - Register
    - Login
 10. FAQs
 11. Code Attributions
 12. Developer Team Info
 13. Github Links
 
______________________________________________________________________________________________________________________________________________________________________

 Features:

 - User authentication with hashed and salted passwords for security.
 - Input validation using regular expressions (RegEx) to ensure secure data entry.
 - SSL encryption for all network traffic to guarantee data confidentiality.
 - Protection against common vulnerabilities such as SQL injection, XSS, CSRF, etc.
 - Real-time international payments tracking and management.
 - MongoDB integration for secure data storage.
 
______________________________________________________________________________________________________________________________________________________________________
 
 Technologies:

 Frontend: React 
 Backend: Node.js, Express
 Database: MongoDB
 Security: bcrypt for password hashing, RegEx for input validation, and SSL for secure traffic
 Development Tools: Visual Studio Code (VS Code), Postman (for API testing) 

______________________________________________________________________________________________________________________________________________________________________

 Security Measures:

 Password Security:
 Passwords are hashed and salted using bcrypt before being stored in the database.

 Input Whitelisting:
 All user input is sanitized and validated using RegEx patterns to prevent malicious data from entering the system.

 SSL/TLS Encryption:
 The application is served over HTTPS to ensure that all traffic is encrypted and secure.

 Protection against common attacks:
 Prevents SQL Injection: By using MongoDB and validating all input, the risk of SQL injection is eliminated.

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

_____________________________________________________________________________________________________________________________________________________________________
 
  How to download the project from github:
  
  1. Visit the Repository: Go to the GitHub repository's page.
  2. Click "Download ZIP" from the "Code" dropdown, then extract it after downloading and open in visual studio code. 

______________________________________________________________________________________________________________________________________________________________________

 Running the Application using the terminal

 To start the backend server:
 cd backend
 npm start

 To start the frontend (React)
 cd ../frontend
 npm start

________________________________________________________________________________________________________________________________________________________________
 
 How to use application:

 1. Login

 To begin using the application, start by accessing the Login screen, which is the initial interface presented upon opening. 
 Here, users have to login using their Username, Account Number and Password. 
 Once logged in, users will be directed to the subsequent screen to continue with the application's functionalities.

 ______________________________________________________________________________________________________________________________________________________________________

 2. Register

 If the user doesn't have an account, the user access the Register screen. 
 Here, users have to register using their Full name, ID Number, Account Number and Password. 
 Once registered, users will be directed to the subsequent screen to continue with the application's functionalities.

 ______________________________________________________________________________________________________________________________________________________________________
 
 FAQ Frequently Asked Questions

 Q: How is password security enforced?
 A: Passwords are hashed using bcrypt with salting to enhance security before being stored in MongoDB.

 Q: How are users authenticated?
 A: User authentication is handled via JSON Web Tokens (JWT). Tokens are generated upon login and are used for accessing protected API routes.

 Q: Is the data traffic secure?
 A: Yes, the application serves all traffic over SSL, ensuring data integrity and security in transit.

 Q: What types of input validation are used?
 A: All user inputs are validated using RegEx patterns to ensure that only valid data is processed.
 
______________________________________________________________________________________________________________________________________________________________________

 Code Attributions ( Part 2 )

 LabGuide
  -Yusuf Paruk

 Node.js Introduction
  - w3schools
  - https://www.w3schools.com/nodejs/nodejs_intro.asp#:~:text=Node.js%20Introduction

 React
  - Legacy
  - https://legacy.reactjs.org/#:~:text=GitHub-,React,-A%20JavaScript%20library

 JavaScript in Visual Studio Code
  - Visual Studio Code
  - https://code.visualstudio.com/docs/languages/javascript

 How to install OpenSSL in windows 10?
  - stackoverflow
  - https://stackoverflow.com/questions/50625283/how-to-install-openssl-in-windows-10#:~:text=How%20to%20install%20OpenSSL%20in%20windows%2010%3F

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

______________________________________________________________________________________________________________________________________________________________________

 Github Repository links:
 
 Indivdual Links from campus:

 Kimberly Mereese Shanitha Naidoo - ST10142348
 https://github.com/VCWVL/apds7311-part-2-Kimberly-Naidoo

 Sahendran Kandasami - ST10242607
 https://github.com/VCWVL/apds7311-part-2-Sahendran-Kandasami11 

 Kyle Akiel Bhugwandas - ST10065078
 https://github.com/VCWVL/apds7311-part-2-KyleBhugwandas

 Diego Matthew Bandle - ST10044651
 https://github.com/VCWVL/apds7311-part-2-DiegoBandle


 Group Link (This link was created by Sahendran Kandasami):
 https://github.com/Sahendran-Kandasami11/APDS7311_POE
