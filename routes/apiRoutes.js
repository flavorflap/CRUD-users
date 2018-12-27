const express = require('express');
const users = [{
        id: 1,
        name: "Ada",
        lastName: "Lovelace",
        phone: "1234567890",
        email: "contacto@gmail.com"
    },
    {
        id: 2,
        name: "Grace",
        lastName: "Hopper",
        phone: "087654321",
        email: "contacto@hotmail.com"
    }

];

let i = 3;

const router = express.Router();

router.get('/users', (req, res) => {
    let search = req.query.search;

    if (search && search.length > 0){
        let filteredUsers = [];
        
        search = search.toLowerCase();

        for (let i = 0; i < users.length; i++){
            let name = users[i].name.toLowerCase();
            let lastName = users[i].lastName.toLowerCase();
            let email = users[i].email.toLowerCase();
            let phone = users[i].phone;

            if (name.indexOf(search) >= 0 || lastName.indexOf(search) >= 0 || email.indexOf(search) >= 0 || phone.indexOf(search) >= 0){
                filteredUsers.push(users[i])
            }
        }
        return res.json(filteredUsers)
    }
    res.json(users);
});
router.get('/users/:id', (req, res) => {
    const id = req.params.id
    const user = users.find(f => f.id == id)

    res.json(user);
});

router.post('/users', (req, res) => {
    const newUser = req.body;

    if (newUser.name.length > 30) {
        return res.status(400).end('la pifiaste');
    }

    newUser.id = i++;

    users.push(newUser);
    res.json(newUser);
});

router.delete('/users/:id', (req,res)=>{
    const id = req.params.id;
    const idx = users.findIndex(u => u.id == id);
    users.splice(idx,1);
    res.json(users);
})

router.put('/users/:id', (req,res)=>{
    const id = req.params.id;
    const newUser = req.body
    const user = users.find(f => f.id == id);
    user.name = newUser.name;
    user.lastName = newUser.lastName;
    user.phone = newUser.phone;
    user.email =newUser.email;
    res.json(newUser)

})

module.exports = router;