
describe('User Signup and Login', () => { 

  // Constant data
  const email = 'dummymail1@gmail.com';
  const validation_email = 'dummymail2@gmail.com';
  const password = 'Test@1234';
  const otp = '123456';
  const phoneNumber = '1234567890';
  const location = 'India';

  // Testcase 1 - Signup and Login
  it('Testcase1 - user should signup and login', () => {

    cy.visit('https://dev-fe.buttonshift.com/');

    // Sign up 
    cy.contains('button', 'Sign up').click();
    cy.get('[data-cy="auth-email-input"]').type(email);
    cy.get('button[type="submit"]').click();
    cy.get('input#mui-3').type(password);
    cy.get('input#mui-4').type(password);
    cy.get('button[type="submit"]').click();

    // Enter OTP sign up 
    for (let i = 0; i < otp.length; i++) {
      cy.get(`input[aria-label="Please enter OTP character ${i + 1}"]`).type(otp[i]);
    }
    cy.get('button[type="submit"]').click();

    // Enter additional details - email, location and phone number 
    cy.get('[data-cy="signup-username-input"]').type(email);
    cy.get('input#mui-8').type(location);
    cy.get('#mui-8-listbox', { timeout: 90000 }).contains('li', new RegExp(`^${location}$`)).click();
    cy.get('input#mui-9').type(phoneNumber);
    cy.get('[data-cy="signup-phone-verify-button"]').click();

    // Enter otp phone number
    for (let i = 0; i < otp.length; i++) {
      cy.get(`input[aria-label="Please enter OTP character ${i + 1}"]`).type(otp[i]);
    }

    cy.get('button#mui-10').click();

    cy.log('Signup successful');

    // Verify successful signup
    cy.url().should('include', 'https://dev-fe.buttonshift.com/community');

    // Logout
    cy.get('button.MuiFab-root[aria-label="Menu"]', { timeout: 80000 }).should('be.visible').click();
    cy.get('button.MuiFab-root[aria-label="Logout"]').click();
    cy.log('Logout successful');

    // Login
    cy.get('button.MuiFab-root[aria-label="Menu"]', { timeout: 100000 }).scrollIntoView().click({ force: true });
    cy.get('button.MuiFab-root[aria-label="Login"]', { timeout: 100000 }).click({ force: true });
    cy.get('[data-cy="auth-email-input"]').type(email);
    cy.get('button[type="submit"]').click();
    cy.get('[data-cy="auth-password-input"]').type(password);
    cy.get('[data-cy="auth-login-button"]').click();
    cy.log('Login successful');
    cy.log('Testcase1 passed');

  });

  // Testcase 2 - form validations
  it('testcase2 - should validate the form fields', () => {

    cy.visit('https://dev-fe.buttonshift.com/');

    // Sign up 
    cy.contains('button', 'Sign up').click();

    // Testing empty fields
    cy.get('button[type="submit"]').click();
    cy.contains('Email is required').should('be.visible');

    // Testing invalid email 
    cy.get('[data-cy="auth-email-input"]').type('testinvalidtemail');
    cy.get('button[type="submit"]').click();
    cy.contains('Please enter a valid email address').should('be.visible');


    // Testing password mismatch
    cy.get('[data-cy="auth-email-input"]').clear().type(validation_email);
    cy.get('button[type="submit"]').click();
    cy.get('input#mui-3').type(password);
    cy.get('input#mui-4').type('DifferentPassword');
    cy.get('button[type="submit"]').click();
    cy.contains('passwords didn\'t match').should('be.visible');

    // Testing password length
    cy.get('input#mui-3').clear().type('pass');
    cy.get('input#mui-4').clear().type('pass');
    cy.get('button[type="submit"]').click();
    cy.contains('password must be at least 8 characters').should('be.visible');

    // Testing valid inputs
    cy.get('input#mui-3').clear().type(password);
    cy.get('input#mui-4').clear().type(password);
    cy.get('button[type="submit"]', { timeout: 100000 }).click();

    // Enter OTP sign up
    for (let i = 0; i < otp.length; i++) {
      cy.get(`input[aria-label="Please enter OTP character ${i + 1}"]`).type(otp[i]);
    }
    cy.get('button[type="submit"]', { timeout: 80000 }).click();

    // Enter additional details - location and phone number
    cy.get('input#mui-8').type(location);
    cy.get('#mui-8-listbox', { timeout: 20000 }).contains('li', new RegExp(`^${location}$`)).click();
    cy.get('input#mui-9').type(phoneNumber);
    cy.get('[data-cy="signup-phone-verify-button"]').click();

    // Enter otp phone number
    for (let i = 0; i < otp.length; i++) {
      cy.get(`input[aria-label="Please enter OTP character ${i + 1}"]`).type(otp[i]);
    }

    cy.get('button#mui-10').click();
    cy.log('Signup successful');

    // Verify successful signup
    cy.url().should('include', 'https://dev-fe.buttonshift.com/community');

    // Logout
    cy.get('button.MuiFab-root[aria-label="Menu"]', { timeout: 80000 }).should('be.visible').click({ force: true });
    cy.get('button.MuiFab-root[aria-label="Logout"]').click();
    cy.log('Logout successful');

    // Login
    cy.get('button.MuiFab-root[aria-label="Menu"]', { timeout: 100000 }).scrollIntoView().click({ force: true });
    cy.get('button.MuiFab-root[aria-label="Login"]').click();

    // Testing invalid login
    cy.get('[data-cy="auth-email-input"]').type(validation_email);
    cy.get('button[type="submit"]').click();
    cy.get('[data-cy="auth-password-input"]').type('WrongPassword');
    cy.get('[data-cy="auth-login-button"]').click();
    cy.contains('Unable to log in with provided credentials').should('be.visible');

    // Testing valid login
    cy.get('[data-cy="auth-password-input"]').clear().type(password);
    cy.get('[data-cy="auth-login-button"]', { timeout: 100000 }).click();
    cy.log('Login successful');
    cy.log('Testcase2 passed')
  });

});
