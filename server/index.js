const db = require("./config");
const cors = require('cors');
const express = require('express');
const PostRouter = require('./Routes/PostRoute');
const OneToOneRouter = require('./Routes/one-to-one.route');
const ManyToManyRouter = require('./Routes/many-to-many.route');
const app = express();
app.use(express.json());
app.use(cors());

app.use('/posts', PostRouter);
app.use('/one-to-one', OneToOneRouter);
app.use('/many-to-many', ManyToManyRouter);
app.listen(5000, () => {
    console.log("listening on port 5000");
})