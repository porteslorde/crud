const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Person = require('./src/Person')

// Porta do servidor
const port = 3000

// Leitor Json
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Rotas

app.post('/person', async (req, res) => {
  const { name, age, email } = req.body

  if (!name) {
    res.send('Por favor preencher o nome').status(500)
  }
  const person = {
    name,
    age,
    email
  }

  try {
    await Person.create(person)
    res.send('Criado com sucesso').status(201)
  } catch (error) {
    res.send('Não cadastrado').status(500)
  }
})

// Traz todos os usuarios cadastrados
app.get('/person', async (req, res) => {
  const person = await Person.find()
  try {
    res.send(person).status(200)
  } catch (error) {
    res.send('Não encontrado').status(500)
  }
})

// Traz usuario por ID

app.get('/person/:id', async (req, res) => {
  const id = req.params.id
  const people = await Person.findOne({ _id: id })

  try {
    res.send(people).status(200)
  } catch (error) {
    res.send('Não encontrado').status(500)
  }
})

app.put('/person/:id', async (req, res) => {
  const id = req.params.id
  const { name, age, email } = req.body
  const person = {
    name,
    age,
    email
  }

  const peopleUpdate = await Person.updateOne({ _id: id }, person)

  try {
    res.send('alterado com sucesso').status(200)
  } catch (error) {
    res.send('Não encontrado').status(500)
  }
})

app.delete('/person/:id', async (req, res) => {
  const id = req.params.id
  const people = await Person.deleteOne({ _id: id })

  try {
    res.send('Deletado com sucesso').status(200)
  } catch (error) {
    res.send('Não encontrado').status(500)
  }
})

// Banco
const BD_USER = 'usuariodobanco'
const BD_PASS = 'senhadobanco'
mongoose
  .connect(
    `mongodb+srv://${BD_USER}:${BD_PASS}@apidetreino.bzniym2.mongodb.net/?retryWrites=true&w=majority`
  )

  .then(() => {
    app.listen(port)
    console.log(`Logado na porta: ${port}`)
  })
  .catch(err => console.log(err))
