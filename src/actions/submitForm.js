'use server';
import db from '@/database/db';
import { redirect } from 'next/navigation';

export default async function submitForm(
    id_user,
    id_disciplina,
    id_assunto,
    enunciado, 
    alt1, 
    alt2, 
    alt3, 
    alt4, 
    alt5, 
    altcerta,
    redirecting=true
) {
    try {
        await db.query(
            "INSERT INTO questao (id_user, id_disciplina, id_assunto, enunciado, alt1, alt2, alt3, alt4, alt5, alt_certa)\n" +
            "VALUES\n" +
            "(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);\n",
            [id_user, id_disciplina, id_assunto, enunciado, alt1, alt2, alt3, alt4, alt5, altcerta]
        );

        console.log("Banco de dados atualizado com sucesso!");
    }
    
    catch (err) {
        console.log("%c Banco de dados falhou em atualizar.", "color:red;");
        
        console.error(err);
        return;
    }

    if (redirecting) {
        redirect('/questoes')
    };
}

// console.log("Enunciado: " + enunciado);
// console.log("Alt. 1: " + alt1);
// console.log("Alt. 2: " + alt2);
// console.log("Alt. 3: " + alt3);
// console.log("Alt. 4: " + alt4);
// console.log("Alt. 5: " + alt5);
// console.log("Alt. certa: " + altcerta);
// console.log("----------------------------------------------------");