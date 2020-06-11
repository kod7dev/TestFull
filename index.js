const express = require('express')
const app = express()
const port = 3000

// databasa :)
let database = [
    {
        userid: 1,
        name: "orhan",
        email: "orhan@orhan.co",
        posts: [
            {
                postid: 1,
                title: "title 1",
                content: "content 1"
            },
            {
                postid: 3,
                title: "title 3",
                content: "content 3"
            },
            {
                postid: 5,
                title: "title 5",
                content: "content 5"
            },
            {
                postid: 7,
                title: "title 7",
                content: "content 7"
            },
            {
                postid: 9,
                title: "title 9",
                content: "content 9"
            }
        ]
    },
    {
        userid: 2,
        name: "adem",
        email: "adem@adem.co",
        posts: [
            {
                postid: 2,
                title: "title 2",
                content: "content 2"
            },
            {
                postid: 4,
                title: "title 4",
                content: "content 4"
            },
            {
                postid: 28,
                title: "title 28",
                content: "content 28"
            },
            {
                postid: 6,
                title: "title 6",
                content: "content 6"
            },
            {
                postid: 8,
                title: "title 8",
                content: "content 8"
            }
        ]
    },
    {
        userid: 3,
        name: "ismail",
        email: "ismail@ismail.co",
        posts: [
            {
                postid: 10,
                title: "title 10",
                content: "content 10"
            },
            {
                postid: 11,
                title: "title 11",
                content: "content 11"
            },
            {
                postid: 12,
                title: "title 12",
                content: "content 12"
            },
            {
                postid: 15,
                title: "title 15",
                content: "content 15"
            },
            {
                postid: 19,
                title: "title 19",
                content: "content 19"
            }
        ]
    },
    {
        userid: 4,
        name: "elif",
        email: "elif@elif.co",
        posts: [
            {
                postid: 13,
                title: "title 13",
                content: "content 13"
            },
            {
                postid: 14,
                title: "title 14",
                content: "content 14"
            },
            {
                postid: 20,
                title: "title 20",
                content: "content 20"
            },
            {
                postid: 26,
                title: "title 26",
                content: "content 26"
            },
            {
                postid: 24,
                title: "title 24",
                content: "content 24"
            }
        ]
    },
    {
        userid: 5,
        name: "gamze",
        email: "gamze@gamze.co",
        posts: [
            {
                postid: 21,
                title: "title 21",
                content: "content 21"
            },
            {
                postid: 22,
                title: "title 22",
                content: "content 22"
            },
            {
                postid: 23,
                title: "title 23",
                content: "content 23"
            },
            {
                postid: 25,
                title: "title 25",
                content: "content 25"
            },
            {
                postid: 27,
                title: "title 27",
                content: "content 27"
            }
        ]
    },
]

app.get('/users', (req, res) => {
    let user = database.map((item) => {
        return {
            userid: item.userid,
            name: item.name,
            email: item.email,
            posts: item.posts.length
        }
    })

    res.send(user)
})

app.get('/users/:userid', (req, res) => {
    res.send({
        userid: database[req.params.userid - 1].userid,
        name: database[req.params.userid - 1].name,
        email: database[req.params.userid - 1].email,
        posts: database[req.params.userid - 1].posts.length
    })
})

app.get('/users/:userid/posts', (req, res) => {
    res.send(database[req.params.userid - 1]["posts"])
})

app.post('/users', (req, res) => {
    res.send('post Dünya!')
})

app.delete('/users/:userid', (req, res) => {
    delete database[req.params.userid - 1]

    res.send("silindi")
})

app.put('/users/:userid', (req, res) => {

    userid = req.params.userid

    database[userid - 1].name = "";
    database[userid - 1].email = "";

    res.send(database[userid - 1])
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
