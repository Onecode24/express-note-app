db.createUser({
    user: 'root',
    pwd: 'mongoroot',
    roles :[ {
        role: 'Admin',
        db: 'noteapp'
    }]
})