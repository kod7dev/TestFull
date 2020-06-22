const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

// databasa
let database = [
    {
        userid: 15,
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
        userid: 22,
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
        userid: 34,
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
        userid: 40,
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
        userid: 42,
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
    console.log("GET: /users");

    console.log(database);    
    res.send(database)
})


app.get('/users/:userid', (req, res) => {
    console.log("GET: /users/");

    let result = {};
    let userIndex = database.findIndex(item => item.userid == req.params.userid);

    if (userIndex >= 0) {
        result = database[userIndex];
    } else {
        result = { "error": true, "msg": "Belirtilen id de user bulunamadı" }
    }

    console.log(result);    
    res.send(result)
})


app.get('/users/:userid/posts', (req, res) => {
    console.log("GET: /users/" + req.params.userid + "/posts/");

    let result = {};
    let userIndex = database.findIndex(item => item.userid == req.params.userid);

    if (userIndex >= 0) {
        result = database[userIndex].posts;
    } else {
        result = { "error": true, "msg": "Belirtilen id de user bulunamadı" }
    }

    console.log(result);    
    res.send(result)
});


app.get('/users/:userid/posts/:postid', (req, res) => {
    console.log("GET: /users/" + req.params.userid + "/posts/" + req.params.postid);

    let result = {};
    let userIndex = database.findIndex(item => item.userid == req.params.userid);

    if (userIndex >= 0) {
        let postIndex = database[userIndex].posts.findIndex(item => item.postid == req.params.postid)
        if (postIndex >= 0) {
            result = database[userIndex].posts[postIndex]
        } else {
            result = { "error": true, "msg": "Belirtilen id de post bulunamadı" }
        }
    } else {
        result = { "error": true, "msg": "Belirtilen id de user bulunamadı" }
    }

    console.log(result);    
    res.send(result)
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

    let i = database.findIndex(item => item.userid == req.params.userid);

    if (i >= 0) {
        database.splice(i, 1);
        res.send({ "delete": true })
    } else {
        res.send({ "error": true, "message": "Belirtilen id'de değer yok" })
    }
})


app.put('/users/:userid', (req, res) => {

    let i = database.findIndex(item => item.userid == req.params.userid);

    if (i >= 0) {

        if (req.body.name) database[i].name = req.body.name;

        if (req.body.email) database[i].email = req.body.email;

        res.send(database[i])
    } else {
        res.send({ "error": true, "message": "Belirtilen id'de değer yok" })
    }

})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

console.log(616161);
