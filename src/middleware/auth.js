import jwt from 'jsonwebtoken';
import express from 'express';

const validateToken = (req, res, next) => {
    let token = req.body.token || req.headers.authorization

    if(!token) {

        res.status(403).send('forbidden')

    }

    try {
        token = token.substring(7, token.length)
        const tokenSecret = process.env.SECRET || ""
        const decoded = jwt.verify(token, tokenSecret)
        res.locals.user = decoded
        next()
    } catch (e) {

        return res.status(403).send('Invalid Token')
        
    }
}

export default validateToken