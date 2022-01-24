import config from '../config'
import { User } from '../resources/user/user.model'
import jwt from 'jsonwebtoken'

export const newToken = user => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  })
}

export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })

export const signup = async (req, res) => {
  // const createdBy = req.user._id
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: 'email and pass required' })
  }
  try {
    const doc = await User.create(req.body)
    const token = newToken(doc)
    return res.status(201).send({ token })
  } catch (e) {
    console.error(e)
    return res.status(400).end()
  }
}

export const signin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ message: 'email and pass required' })
  }
  try {
    const doc = await User.findOne({ ...req.body })
    const token = newToken(doc)
    return res.status(200).send({ token })
  } catch (e) {
    console.error(e)
    return res.status(400).end()
  }
}

export const protect = async (req, res, next) => {
  next()
}
