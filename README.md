### API for the test project "Task Manger" on node, express and mongoDb

Project installation
```
make install
```

The project will be available at the following URL:
```
http://localhost:3000
```

Api endpoints:
```
POST /api/auth/register
POST /api/auth/login

GET /api/tasks
GET /api/tasks/:id
POST /api/tasks
PUT /api/tasks/:id
DELETE /api/tasks/:id
```

Run tests:
```
make tests
```



for testing it is better to use Postman import file called "task manager.postman_collection.json" and is located in the root of the project.