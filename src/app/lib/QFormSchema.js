import { z } from "zod";

export const QFormSchema = z.object({
    enunciado: z.string().nonempty(),
    alternativaA: z.string().nonempty(),
    alternativaB: z.string().nonempty(),
    alternativaC: z.string().nonempty(),
    alternativaD: z.string().nonempty(),
    alternativaE: z.string().nonempty(),
<<<<<<< HEAD
    alternativaCerta: z.string().length(1).nonempty().toUpperCase().default("A"),
=======
    alternativaCerta: z.string().length(1).toUpperCase().default("A"),
>>>>>>> c322f14 (testes da rota /qform automatizados com cypress)
    disciplina: z.string().nonempty().default('0'),
    assunto: z.string().nonempty().default('0')
});