import client from "../../database"
import { user } from "../../Models/user.model"

export const seedDB = async () => {

    let sql = 'INSERT INTO roles (rolename) VALUES ($1) returning *';
    const result = await client.query(sql,['Admins']);
    const roleid = result.rows[0].id;
    const password = '$2b$04$jdpXaNPvmwlRNVud0QiYW.xkWuPGM8Goajqdyl7TSJo2MmngJRGmy' // Passw0rd (salt and secret are in ENV)
    const adminUser: user = {
         firstname: 'System', 
         lastname: 'Administrator', 
         username: 'admin', 
         password,
         roleid }
        console.log('=> Seeding Admin user...')
        sql = 'INSERT INTO users (firstname, lastname, username, password,roleid) VALUES ($1,$2,$3,$4,$5)';
        await client.query(sql,[adminUser.firstname,adminUser.lastname,adminUser.username,password,adminUser.roleid])
        console.log('=> Seeding Admin User completed')
        console.log('usernme: ' + adminUser.username + '\n password: P@ssword\n token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjEsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2NjA1OTc2Mjh9.njgUY44d4ZvcEK-beMxjfUBzK_FO-8MyiOLl5PW8Af4')
    // process.exit(1)
    return
}

seedDB()