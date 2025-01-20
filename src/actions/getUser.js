'use server';

import db from '@/database/db';

export async function getUser(email, password) {
    try {
        const user = await db.query(
            "SELECT * FROM usuario WHERE usuario.email = ? AND usuario.senha = ?",
            [email, password]
        );

        if (JSON.stringify(user) === '[]') {
            console.log("Usuário ou senha incorretos.");
            
            return user;
        }

        return user[0];
    }

    catch (error) {
        return error;
    }
}