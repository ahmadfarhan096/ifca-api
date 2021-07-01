const express = require('express')
const mysql = require('mysql2');
const app = express();
const config = require('./config')
const cors = require('cors')

const connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    database: config.database,
    password: config.password
});

//use = middleware (acts as a bridge between in application)
//express.json = input from FE 
app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
    console.log('Im middleware');
    next();
})

//check connection
connection.connect((error) => {
    if (error) {
        console.log(error)
        throw error;
    }
}
)

//request = apa yg dari FE
//response = apa yg BE bagi FE
app.get('/users', (request, response) => {
    // id
    // Cara nak dapatkan data dari FE
    // const body = request.body;

    // console.log('hello world')

    // simple query
    connection.query(
        'SELECT * FROM user',
        function (err, results, fields) {
            console.log(results); // results contains rows returned by server
            console.log(fields); // fields contains extra meta data about results, if available
            if (err) {
                throw response.status(404).json({
                    success: false,
                    message: err,
                    data: null
                })
            }
            // successful return to FE
            response.status(200).json({
                success: true,
                message: 'Succesfull fetched',
                data: results
            })
        }
    );

})

//
app.post('/user', (req, res) => {
    // value
    const body = req.body;
    console.log(body)
    if (Object.keys(body).length === 0) {
        throw res.status(404).json({
            success: false,
            message: 'Body needed',
            data: null
        })
    }
    // execute will internally call prepare and query
    connection.execute(
        'INSERT INTO user (name,email,phone,address) VALUES(?,?,?,?) ',
        [
            body.name,
            body.email,
            body.phone,
            body.address

        ],
        function (err, results, fields) {
            console.log(results); // results contains rows returned by server
            console.log(fields); // fields contains extra meta data about results, if available

            // If you execute same statement again, it will be picked from a LRU cache
            // which will save query preparation time and give better performance

            if (err) {
                throw res.status(404).json({
                    success: false,
                    message: err,
                    data: null
                })
            }
            // successful return to FE
            res.status(200).json({
                success: true,
                message: 'Succesfull create',
                data: results
            })

        }
    );

})

//bealakang user tu params
app.delete('/user/:id', (request, response) => {
    //
    const id = request.params.id

    connection.execute(
        'DELETE FROM user WHERE id=? ',
        [id],
        function (err, results, fields) {
            console.log(results); // results contains rows returned by server
            console.log(fields); // fields contains extra meta data about results, if available

            // If you execute same statement again, it will be picked from a LRU cache
            // which will save query preparation time and give better performance

            if (err) {
                throw response.status(404).json({
                    success: false,
                    message: err,
                    data: null
                })
            }
            // successful return to FE
            response.status(200).json({
                success: true,
                message: 'Succesfull delete',
                data: results
            })

        }
    );

})

app.put('/user', (request, response) => {

    const body = request.body;

    //check object is empty or not
    if (Object.keys(body).length === 0) {
        throw response.status(404).json({
            success: false,
            message: 'Body needed',
            data: null
        })
    }
    // execute will internally call prepare and query
    connection.execute(
        'UPDATE user SET name=?, email=?, phone=?, address=? WHERE id=?',
        [
            body.name,
            body.email,
            body.phone,
            body.address,
            body.id
        ],
        function (err, results, fields) {
            console.log(results); // results contains rows returned by server
            console.log(fields); // fields contains extra meta data about results, if available

            // If you execute same statement again, it will be picked from a LRU cache
            // which will save query preparation time and give better performance

            if (err) {
                throw response.status(404).json({
                    success: false,
                    message: err,
                    data: null
                })
            }
            // successful return to FE
            response.status(200).json({
                success: true,
                message: 'Succesfull update',
                data: results
            })

        }
    );

})



// Callback lessons
// function listen(portnumber, callback) {
//     callback();
// }

// listen(4000, () => {  

// })

// -------BOOLEAN JAVASCRIPT-------------
// {} = true
// [] = true
// undefined = false
// '' = false
// null = false

// const object = '';
// console.log(Boolean(object));
// ------------------

app.listen(4000, () => { console.log('listening to 4000') });