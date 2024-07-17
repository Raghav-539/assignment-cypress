
# Test Automation Assignment

### Tasks:

## 1. Setup Cypress:
    i.  Clone the repository
    ii. Install dependencies using : ` npm install `
   

## 2. Running the Tests 
    -> There are two testcases 
        i.  User Signup and login
        ii. Test the Form Validations
   
    -> Now to run the tests - 
        i. Open cypress or terminal and type : ` npx cypress open `
        ii. Cypress window will get open
        iii. Click on e2e 
        iv. It will open cypress browser
        v. Click on the signup.cy.js file 
        vi. Test will start running

## 3. Generating Reports
    i. To generate the report (headless mode): ` npx cypress run --spec cypress\e2e\signup.cy.js ` 
    ii. To generate the report  (headed mode) : ` npx cypress run --headed --spec cypress\e2e\signup.cy.js --browser chrome ` 
    

## 4. Assumptions/Suggestions
    i. All the input fields and button should have a unique id
    ii. URLs are assumed to be 'https://dev-fe.buttonshift.com/signup' and 'https://dev-fe.buttonshift.com/login' for signup and login pages respectively.

## 5. Notes - 
    i. Due to network latency it may give error while running, so you need to start the session again.
    ii. Change the email and validate-email when you run the test again, if you fail to change them email id's then it may give error of account already exists.



