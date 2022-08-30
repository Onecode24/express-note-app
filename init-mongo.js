db.createUser({
    user: 'root',
    password: 'mongoroot',
    role : {
        role: 'readWrite',
        db: 'note-app   '
    }
})