# wolves-bn-backend

# Description

Barefoot nomad is an application that will enable its “Company Nomads” book their international travel and accommodation globally; easily and conveniently across all the locations/centers where the Company has its operations.

## Setup

### Dependencies

npm, nodejs, git

### Getting Started

List of steps to get started (e.g. clone repo, submodule, .env file, etc)
clone the repository: https://github.com/atlp-rwanda/wolves-bn-backend.git
Inside the folder, create .env file
install dependencies by running the command npm install to install required dependencies.

### Utilizing dotenv

Create .env file in your repository
For environmental variables; type the name of variable and assign to a certain value inside the .env file. For example:
defaultPort = 3000
To use values in .env file in another file, import the file using this line of code: import "dotenv/config";
To access the variables in .env file; use process.env.VARIABLE_NAME.
e.g: const PORT = process.env.PORT || process.env.defaultPort;
Checking example.env file, you will see the variable examples. You will need to change the variable values to make it your own (in .env file which will be ignored by .gitignore).

### Run The Service

To run the app, run the command npm run start inside the folder using the terminal
