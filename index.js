const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))


//3.1
let contacts = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
      },
      { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
      },
      { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
      },
      { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
      }
]


app.get('/api/persons', (req, res)=>{
    res.status(200).send(contacts)
})

//3.2
app.get('/info', (req, res)=>{
    res.status(200).send({
        message: "Phonebook has info for 2 people",
        date: Date()
    })
})

//3.3
app.get('/api/persons/:id', (req, res)=>{
    const id = parseInt(req.params.id)
    let data

    for(let i = 0; i<contacts.length; i++){
        if(contacts[i].id === id){
            data = contacts[i]
        }
    }

    if(data){
        res.status(200).send(data)
    }else{
        res.status(404).send("Data is not found! Please check your input!")
    }
    
})

//3.4
app.delete('/api/persons/:id', (req, res)=>{
    const id = parseInt(req.params.id)
    contacts = contacts.filter(contact => contact.id !== id)

    res.send({
        message: 'Data successfully deleted!'
    })
})

//3.5
app.post('/api/persons', (req, res)=>{
    const data = req.body
    let id = Math.floor(Math.random () * (50 - 4)) + 4

    contacts.push({
        id: parseInt(id),
        name: data.name,
        number: data.number
    })

    res.status(200).send({
        message: "Data successfully added!"
    })
})




const PORT = 3001
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})