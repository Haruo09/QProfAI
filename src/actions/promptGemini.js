'use server';

const { GoogleGenerativeAI } = require("@google/generative-ai");

export async function promptGemini(disciplina, assunto, to_json=true) {
    try {
        
        let prompt = `Crie uma questão de múltipla escolha de nível difícil (porém, que seja possível fazê-la sem o uso de calculadora) nos moldes de vestibulares como ENEM sobre a disciplina ${disciplina} e assunto ${assunto}. A questão deve ter 5 alternativas: a), b), c), d) e e), sendo que a primeira será a correta e as demais, incorretas.\n
        Retorne o resultado no formato JSON seguindo a estrutura a seguir:\n
        {
            "enunciado": "texto referente ao enunciado da questão",
            "alternativas": {a: "", b: "", c: "", d: "", e: ""},
            "altcerta": "abcde",
            "resulucao": "texto referente à resolução da questão"
        }\n
        Os enunciados devem ser grandes e ter contexto, assim como a maioria das questões do ENEM.
        A propriedade 'alternativas' será um vetor de 5 posições com as alternativas da questão, em que uma delas será a correta e as demais incorretas.\n
        A alternativa correta será indicada pela propriedade 'altcerta'.
        A responsta do prompt deve sempre conter apenas o JSON, em formato texto, sem ${'```'} ao inciar ou terminar o texto.
        `;
        const genAI = new GoogleGenerativeAI("AIzaSyBuVrQrZpW_gVEBww-0utuFrEge2kCsRyo");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
        const result = await model.generateContent([prompt]);
    
        if (to_json) {
            return await JSON.parse(result.response.text());
        }
        
        return result.response.text();
    }

    catch (err) {
        console.error(err);
    }
}