'use server';

import db from '@/database/db';

export async function getQuestoes(id_user) {
    try {
        const questoes = await db.query(
            "SELECT questao.ID, questao.enunciado, questao.id_disciplina, questao.id_assunto\n" + 
            "FROM questao\n" +
            "WHERE questao.id_user = ?",
            [id_user]
        );

        console.log('Query realizada com sucesso!');
        console.log(questoes);

        return questoes;
    }

    catch (err) {
        console.error(err);
    }
}