'use server';

import db from '@/database/db';

export async function getDisciplinaByID(id_disciplina) {
    try {
        return await db.query(
            "SELECT * from disciplina WHERE disciplina.id_disciplina = ?",
            [id_disciplina]
        );
    }

    catch (err) {
        console.error(err);
    }
}