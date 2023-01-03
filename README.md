# socialNetworkFuntime

## steps
- clone repo
- `npm install mongoose`
- `npm install express`
- install MongoDB Community Edition
    - `brew tap mongodb/brew`
    - `brew update`
    - `brew install mongodb-community@6.0`
- Start MongoDB as a service
    - `brew services start mongodb-community@6.0`
- NOTE: to STOP MongoDB service
    - `brew services stop mongodb-community@6.0`
- buncha stuff in code to get THOUGHT to POST and GET...
    - example of curl to create a THOUGHT POST


### handy curl commands/examples
post a thought
```
curl http://localhost:8080/api/thoughts \
    -X POST \
    -H "Content-Type: application/json" \
    -d '{"thoughtText":"This is my very first thought", "username":"Jaacen"}'
```

update a thought
```
curl http://localhost:5000/api/thoughts/<OBJECT_ID> \
    -X PATCH \
    -H "Content-Type: application/json" \
    -d '{"thoughtText":"Updated text", "username":"Updated username "}'
```

get one thought
`curl http://localhost:8080/api/thoughts/<OBJECT_ID>`

get all thoughts
`curl http://localhost:8080/api/thoughts`

delete one thought
`curl http://localhost:8080/api/thoughts/<OBJECT_ID> -X DELETE -I`


