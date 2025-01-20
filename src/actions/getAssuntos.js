'use server';

import db from '@/database/db';

export async function getAssuntos(id_disciplina, id_user) {

    try {
        
        const assuntos = await db.query(
            "SELECT assunto.id_assunto, assunto.nome_assunto, assunto.id_disciplina \n" +
            "FROM assunto \n" +
            "WHERE \n" +
            "    assunto.id_user = ?\n" +
            "AND assunto.id_disciplina = ?;\n",
            [id_user, id_disciplina]
        )
        // const assuntos = {};

        // assuntos[id_disciplina] = []
        // for (const i of temp) {
        //     assuntos[id_disciplina].push(i);
        // }
        
        return assuntos;
        

        // const temp = await db.query(
        //     "SELECT id_disciplina, nome_disciplina\n" +
        //     "FROM disciplina\n" +
        //     "WHERE (\n" + 
        //     "   disciplina.id_disciplina = ?\n" +
        //     "   AND disciplina.id_user = ?\n" + 
        //     ");",
        //     [id_disciplina, id_user]
        // );

        // const disciplinas = {};
        // for (const obj of temp) {
        //     const id = obj["id_disciplina"];
        //     disciplinas[id] = obj["nome_disciplina"];
        // }
        // return disciplinas;
    }

    catch (err) {
        console.error(err);
        return [];
    }

}