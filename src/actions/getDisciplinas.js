'use server';

import db from '@/database/db';

export async function getDisciplinas(id_user) {

    try {
        const disciplinas = await db.query(
            "SELECT disciplina.id_disciplina, disciplina.nome_disciplina \n"+
            "FROM disciplina\n"+
            "WHERE disciplina.id_user = ?;\n",
            [id_user]
        );

        return disciplinas;
    }

    catch (err) {
        console.error(err);
        return [];
    }

}