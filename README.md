----------------OVERVIEW------

This is a web server that allows its user to update expenses.

Starting the server------
Run npm i (to install all the dependencies from the project)
•	You can start the server on your local machine using nodemon app.js/node app.js as the entry. 
•	The home route: Localhost:3000, is an endpoint to a form containing input fields (Category (Entertainment, Shopping, Groceries, Shopping, Other), title, cost (time and date being generated by the server)).
•	Upon inserting new receipts, the user is redirected to a route consisting of all receipts with the server-side generated time and date. localhost/expenses 
•	The receipts can be queried using their automatically generated ID like so: as localhost/expenses/ 635bf5d0e1c684be1c351a19  (brings back the particular receipt in JSON format).
•	Every 10min, the Database is emptied, and the fields are converted from JSON to CSV and automatically downloaded to the user machine. 
•	The above code is achieved using node-cron – basically a package that allows you to run a code automatically at set intervals

RUNNING THE DOCKER CONTAINER

•	The docker file contains the image build of the server. 
•	Run the Docker file using the following command: 
docker run -it -p 9000:3000 tech-challenge .
NB: The input validation for the database does not allow any other category asides from the ones listed above. This is because of the enum: used.
NB: To run the above docker server in the background replace the -it with -d (to run in detach mode)