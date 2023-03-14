
# TODO crud

A brief description of what this project does and who it's for


## Installation

Install app to run locally:

```bash
  git clone https://github.com/Ckm54/Emmerce-todoApp.git
  cd Emmerce-todoApp
```

App requirements
    `Node Js`, `python3`    
## Run Client Locally

After cloning the project locally and navigating to project directory from previous step:

```bash
  cd todo-client
```

Install dependencies using npm

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Client Environment Variables

To run this project, you will need to add the following environment variables to your .env file to authenticate with the backend:

`VITE_REACT_APP_AUTH_TOKEN=your ptyhon generated code`


## Run Server Locally

After cloning the project locally and navigating to project directory from previous step:

```bash
  cd server
```

create python environment

Install app requirements

```bash
    pip intall -r requirements.txt
```

Configure postgresql

Replace connection string won setttings.py with your own

Ensure you have postgres installed and setup: You can setup using this tutorial:

[setup postgres on linux](https://www.digitalocean.com/community/tutorials/how-to-install-postgresql-on-ubuntu-20-04-quickstart)

once a user and database is setup:


Start the server

```bash
  cd todoapi
  python manage.py runserver
```

Apply all migrations and generate userToken 

```bash
  python manage.py makemigrations
  python manage.py migtrate

```





## 🔗 Links
[![portfolio](https://www.digitalocean.com/community/tutorials/how-to-install-postgresql-on-ubuntu-20-04-quickstart)](https://katherineoelsner.com/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/)
[![twitter](https://img.shields.io/badge/twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/)

