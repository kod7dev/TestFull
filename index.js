const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

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

// /users
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


// /users/2
app.get('/users/:userid', (req, res) => {

    let user = database.find(item => item.userid == req.params.userid)

    if (user) {
        user = {
            "error": false,
            "userid": user.userid,
            "name": user.name,
            "email": user.email,
            "posts": user.posts.length
        }
    } else {
        user = {
            "error": true,
            "message": "Belirtilen id için herhangi bir kullanıcı bulunamadı"
        }
    }

    res.send(user)
})

// /users/2/posts
app.get('/users/:userid/posts', (req, res) => {
    
    let user = database.find(item => item.userid == req.params.userid)

    res.send(user["posts"])
})

// /users/2/posts/5

app.get('/users/:userid/posts/:postid', (req, res) => {
    // tüm postlar
    let posts = database[req.params.userid - 1]["posts"];

    let thePost = { "error": true };

    posts.forEach(post => {
        if (post["postid"] == req.params.postid) {
            thePost = post;
        }
    });

    res.send(thePost)
})

app.post('/users', (req, res) => {
    let lastUser = database[database.length - 1];

    let userid = lastUser.userid + 1;    // en son kayıtlı userid +1

    let name = req.body.name;      // kullanıcıdan alacak
    let email = req.body.email;     // kullanıcıdan alacak    

    let user = {
        "userid": userid,
        "name": name,
        "email": email,
        "posts": [],
    };

    // user database en son eleman olarak ekle.
    database.push(user);

    res.send(user)
})

app.delete('/users/:userid', (req, res) => {

    // let user = database.find(item => item.userid == req.params.userid)
    let user = {};

    // burada index kullanmanın zararı ne olabilir?
    if (database[req.params.userid - 1]) {
        user = {
            "error": false,
            "userid": database[req.params.userid - 1].userid,
            "name": database[req.params.userid - 1].name,
            "email": database[req.params.userid - 1].email
        }

        database.splice(req.params.userid - 1, 1)
    } else {
        user = {
            "error": true,
            "message": "Belirtilen id için herhangi bir kullanıcı bulunamadı"
        }
    }

    res.send(user)
})

app.put('/users/:userid', (req, res) => {

    userid = req.params.userid

    database[userid - 1].name = "";
    database[userid - 1].email = "";

    res.send(database[userid - 1])
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
