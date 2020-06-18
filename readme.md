# TestFull

Kendi içerisinde database olan basit bir RestFull API

## Installation

`git clone https://github.com/kod7dev/TestFull.git` ile TestFull indirilir.

```
cd TestFull   // İndirilen klasöre girilir

npm install   // node_modules paketleri kurar

node index.js // programı çalıştırır
```

## API References


GET: `localhost:3000/users` tüm kullanıcıları listeler

GET: `localhost:3000/users/2` id'si 2 oln kullanıcıyı gösterir

GET: `localhost:3000/users/2/posts` id'si 2 oln kullanıcının tüm post'larını gösterir

GET: `localhost:3000/users/2/posts/5/` id'si 2 olan kullanıcının id'si 5 olan post'unu gösterir.

