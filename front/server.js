const express = require('express');
const next = require('next');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');
const dev = process.env.NODE_ENV !== 'production';
const prod = process.env.NODE_ENV === 'production';
const { isAdmin } = require('./middleware');
const app = next({ dev });
const handle = app.getRequestHandler();
dotenv.config();

app.prepare().then(() => {
    const server = express();

    server.use(morgan('dev'));
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));
    server.use(cookieParser(process.env.COOKIE_SECRET));
    server.use(expressSession({
        resave : false,
        saveUninitialized : false,
        secret : process.env.COOKIE_SECRET,
        cookie : {
            httpOnly : true,
            secure : false,
        },
    }))

    server.get('/tag/:tag', (req, res) => {
        return app.render(req, res, '/tag', { tag : req.params.tag });
    });

    server.get('/blog/detail/:id', (req, res) => {
        return app.render(req, res, '/blog/detail', { id: req.params.id });
    });

    server.get('/admin/blog/update/:id', (req, res) => {
        return app.render(req, res, '/admin/blog/update', { id: req.params.id });
    });

    server.get('/user/:id', (req, res) => {
        return app.render(req, res, '/user', { id : req.params.id });
    });

    server.get('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(3000, () => {
        console.log(`next + express running on port 3000`)
    });
});