# todo-js


https://todojs-jamespro.herokuapp.com/

## Features

* Create TODO
* Delete TODO
* Done: true/false, faux checkboxes, and can update
* Priority: number, with icons to increase or decrease the priority

* vanilla JS, EJS
* Node.js
* MongoDB for data storage
* Heroku hosting

## Using the MongoDB _id

I was able to use the MongoDB "_id" instead of relying on finding documents by some combo of the fields. I had to do a couple special things:

### server.js:

I added this in addition to the other MongoClient code:

`const mongo = require('mongodb')`

Also needed to make it a mongo "ObjectId":

`db.collection('todojs').deleteOne({ _id: new mongo.ObjectId(req.body.id) })`

### index.ejs:

I put the _id from mongo into the HTML. I also used CSS to hide it, using display:none

`< span class='id' ><%= info[i]._id %></span >`

### main.js

I needed to.trim() the.innerText value after getting it from the DOM.For some reason I think extra characters were messing it up.

`const id = this.parentNode.childNodes[1].innerText.trim()`

