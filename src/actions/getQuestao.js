'use server';
import db from '@/database/db';

export async function getQuestao(id_user, id_questao) {
    try {
        const questao = await db.query(
            "SELECT * FROM questao WHERE questao.ID = ? AND questao.id_user = ?;",
            [id_questao, id_user]
        );

        return questao;
    }

    catch (err) {
        console.error(err);
    }
}