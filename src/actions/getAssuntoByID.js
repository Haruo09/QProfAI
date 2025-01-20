'use server';

import db from '@/database/db';

export async function getAssuntoByID(id_assunto) {
    try {
        const assunto = await db.query(
            "SELECT * " + 
            "FROM assunto " + 
            "WHERE assunto.id_assunto = ?;",
            [id_assunto]
        );

        return assunto;
    }

    catch (err) {
        console.error(err);
    }
}