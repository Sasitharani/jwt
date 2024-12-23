##concept of forgot password

Add a link forgot password this link will go to the page ForgotPassword.jsx This page will have email id(Keep the designing similar to Login and sign up page) Once user enters his email create a api in server.js that will check the database if the email is available

If the email is not available sent message to the forgotPassword.jsx as email does not exist sign in with a new email.

In forgotPassword.Jsx there must be div contianer this container is for displaying error the text should be italic add red

If the email is available create a code with 5 charecters.The code must be a combination of 3 letters and 2 numbers the code should be created by a random generator

create a link that will have the url pointing to ForgotPassword.jsx which at the end should have the random code as a query

Send email to the email id with the url

When the user clicks on the url the previous view must hide(Toggle)

and new view should be displayed and the earlier view should be hidden This new view should have new password and confirm password similar to the Signup.jsx

Use the the same api to save the password in the database as in Signup.jsx

once the password is saved send a message in sweetalert that password changed sucessfully. and go to login page.

for send mail use this code as a refernce import nodemailer from 'nodemailer';