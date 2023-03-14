
# Project Title

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

run:
```bash
    python manage.py makemigrations
    python manage.py migrate
```

To generate user token for request authentication:

```bash
    python manage.py createsuperuser --username admin --email admin@example.com
    python manage.py drf_create_token admin
```

copy the resulting token to the client's .env file


#### Start the server

```bash
  cd todoapi
  python manage.py runserver
```

Apply all migrations and generate userToken 

```bash
  python manage.py makemigrations
  python manage.py migtrate

```





## API Reference

#### Get all items

#### NB: All routes require authorization header

```http
  GET /api/todos
```

| Header | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `Authorization` | `string` | **Required**. Your auth token |

Sample response

```json
    {
    "status": "Success",
    "total": 5,
    "page": 1,
    "last_page": 1,
    "todos": [
        {
            "id": "ad6084da-bf7d-4625-a9d2-47987f1bd91e",
            "title": "sample oth",
            "description": "a simple task",
            "isComplete": true,
            "createdAt": "2023-03-14T16:14:16.414389Z",
            "updatedAt": "2023-03-14T17:43:37.481768Z"
        },
        {
            "id": "7f10608d-213d-47b8-82ce-7c88d19b3db4",
            "title": "sample title",
            "description": "a simple task",
            "isComplete": true,
            "createdAt": "2023-03-14T16:11:38.581882Z",
            "updatedAt": "2023-03-14T19:06:47.895794Z"
        },
    ]
}
```

#### Get item

```http
  GET /api/todos/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

sample success response

```json
    {
    "status": "success",
    "todo": {
        "id": "a0161b9d-7ea7-4d67-b623-84f99942ac77",
        "title": "Walk a cat",
        "description": "Just walk a dog around the neighborhood",
        "isComplete": true,
        "createdAt": "2023-03-14T16:03:20.165738Z",
        "updatedAt": "2023-03-14T17:37:59.472342Z"
    }
    }
```

sample error response when item not found by id:

```json
    {
    "status": "fail",
    "message": "Todo item with id: a0161b9d-7ea7-4d67-b623-84f99942ac not found"
    }
```

#### Create todo

```http
  POST /api/todos/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Required**. Id of item to fetch for complete todo |
| `description`      | `string` | **Required**. Id of item to fetch for complete todo |


sample response:

```json
    {
    "status": "success",
    "todo": {
        "id": "a0161b9d-7ea7-4d67-b623-84f99942ac77",
        "title": "Another sample todo item 02",
        "description": "A sample second tood item",
        "isComplete": false,
        "createdAt": "2023-03-14T16:03:20.165738Z",
        "updatedAt": "2023-03-14T20:51:00.054275Z"
    }
    }
```

#### Update todo

```http
  PATCH /api/todos/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch for complete todo |
| `title`      | `string` | **Required**. Id of item to fetch for complete todo |
| `description`      | `string` | **Required**. Id of item to fetch for complete todo |
| `isComplete`      | `string` | **optional / conditional**.  |


sample response:

```json
    {
    "status": "success",
    "todo": {
        "id": "a0161b9d-7ea7-4d67-b623-84f99942ac77",
        "title": "Another sample todo item 02",
        "description": "A sample second tood item",
        "isComplete": true,
        "createdAt": "2023-03-14T16:03:20.165738Z",
        "updatedAt": "2023-03-14T20:51:00.054275Z"
    }
    }
```

#### Delete todo

```http
  DELETE /api/todos/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

sample response with status 204:

```json
    {
    
    }
```


