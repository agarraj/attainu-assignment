# AttainuU Assignment

### 
    
    ├── package.json          # All package dependency
    ├── DB                    # Database files 
    ├── API                   # APIs
    └── README.md

To install dependency: ```npm install```
To run server: ```node app.js Or npm start```  
Server is listening on port no: ```5000```  
Database used: ```MongoDB with cloud cluster```

Cluster Details: username: ```dbuser``` , password: ```dbUserPassword```, DatabaseName : ```myFirstDatabase```

---
#### API 1:  
### login:
file: ```attainu-assignment/API/login.js```  

request: ```http://localhost:5000/api/login?username=<userName>&password=<password>&isAdmin=<isAdmin>```  
eg: ```http://localhost:5000/api/login?username=admin&password=admin&isAdmin=true```  


```json
{
    "message": "User logged in...",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyIjp7InVzZXJuYW1lIjoidXNlcjIiLCJwYXNzd29yZCI6InBhc3N3b3JkMiIsImlzQWRtaW4iOiJmYWxzZSJ9LCJpYXQiOjE2MzY5MTUxNzh9.hUMMWGrNpKVd384NO5UWwg2eO6pMIf6jCRi03TUkMh8",
    "response": {
        "username": "admin",
        "password": "admin",
        "isAdmin": true,
        "_id": "619157ea1f4a021416069a56",
        "__v": 0
    }
}
```


***
#### API 2:  
## Post Manager:

file: ```attainu-assignment/API/postManager.js```  

### Create Post

request: ```http://localhost:5000/api/posts/add?description=<description>``` 
eg: ```http://localhost:5000/api/posts/add?description=This is  new post```  


```json
{
    "message": "Post created...",
    "post": {
        "postId": "48cb79a0-e20e-4f25-88c8-09f6d6e448da",
        "description": "This is new post",
        "_id": "61915f65f29eacd06440bd32",
        "__v": 0
    }
}
```

### Update Post

request: ```http://localhost:5000/api/posts/add?description=<description>&postId=<postId>``` 
eg: ```http://localhost:5000/api/posts/update?description=this is updated post"&postId=25d47af3-e8e3-4d70-a450-b333f6e68bf0```  

```json
{
    "updatedPost": {
        "postId": "25d47af3-e8e3-4d70-a450-b333f6e68bf0",
        "description": "his is updated post"
    }
}
```

### Delete Post

request: ```http://localhost:5000/api/posts/delete?postId=<postId>``` 
eg: ```http://localhost:5000/api/posts/delete?postId=25d47af3-e8e3-4d70-a450-b333f6e68bf0```  

```json
{
    "message": "Post deleted...",
    "postId": "25d47af3-e8e3-4d70-a450-b333f6e68bf0",
    "response": {
        "deletedCount": 1
    }
}
```

### NOTE
1. Set bearer token in Authorization as token received at the time of login.
2. Above 3 APIs will work when you set the bearer token in Authorization as token received when admnin user logged In. Otherwise will ```receive status code = 401 i.e Unauthorized```

### View Post

request: ```http://localhost:5000/api/posts/view?page=<pageNumber>&limit=<ItemInOnePage>``` 
eg: ```http://localhost:5000/api/posts/view?page=0&limit=5```  

```json
{
    "docs": [
        {
            "_id": "61913a05c969f1c3e2b893e7",
            "postId": "67813bca-b8ff-4237-a52f-d2c159361b8d",
            "description": "this is second post",
            "__v": 0
        },
        {
            "_id": "619158171f4a021416069a5a",
            "postId": "e46c19c2-e5dc-483e-b9b1-7a44e21d05e6",
            "description": "This is first new post",
            "__v": 0
        },
        {
            "_id": "6191581f1f4a021416069a5c",
            "postId": "25d47af3-e8e3-4d70-a450-b333f6e68bf0",
            "description": "This is secobd new post",
            "__v": 0
        },
        {
            "_id": "619158231f4a021416069a5e",
            "postId": "fc537a2e-7a66-42cd-9c7c-4e9e147d7c02",
            "description": "This is third new post",
            "__v": 0
        },
        {
            "_id": "6191582c1f4a021416069a60",
            "postId": "1c2d1b3a-fb24-43d2-a6b5-9768b01396c4",
            "description": "This is  new post  4",
            "__v": 0
        }
    ]
}
```

### NOTE
1. Set bearer token in Authorization as token received at the time of login.
2. View API will work even for non admin users.
3. page will be 0 if not set.
4. limit will be 10 if not set.
