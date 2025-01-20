'use server';

import React from 'react';
import styles from './Questoes.module.css';
import { getQuestoes } from '@/actions/getQuestoes';
import Link from 'next/link';
import NavBar from '@/components/NavBar';
import { getDisciplinas } from '@/actions/getDisciplinas';
// import { getAssuntos } from '@/actions/getAssuntos';
import { getAssuntoByID } from '@/actions/getAssuntoByID';
// import { redirect } from 'next/dist/server/api-utils';
// import QTable from '@/components/QTable';

export default async function Questoes() {
  
  const obj = await getDisciplinas(1);
  const disciplinas = {}
  for (const o of obj) {
    const id = o["id_disciplina"];
    disciplinas[id] = o["nome_disciplina"];
  }
  const questoes = await getQuestoes(1);
  
  return (
    <>
      <NavBar />
      <div className='flex justify-center h-full text-slate-300'>
        <main className='bg-[#5a555517] w-2/3 h-full overflow-scroll p-4'>
          <h1 className='mb-2 font-semibold'>Questões Salvas</h1>
          {/* {questoes.length > 0 && (
            <div className={`${styles.header}`}>
              <div className={`${styles.enunciado} font-semibold min-w-fit`}>Enunciado</div>
              <div className={`${styles.disciplina} font-semibold min-w-fit`}>Disciplina</div>
              <div className={`${styles.assunto} font-semibold min-w-fit`}>Assunto</div>
            </div>
          )} */}
          {(questoes.length > 0) ? (
            <div className={`${styles.questoes} text-justify`}>
              <div className={`${styles.header}`}>
                <div className={`${styles.enunciado} font-semibold min-w-fit`}>Enunciado</div>
                <div className={`${styles.disciplina} font-semibold min-w-fit`}>Disciplina</div>
                <div className={`${styles.assunto} font-semibold min-w-fit`}>Assunto</div>
              </div>
              {
                questoes && questoes.map(async (questao) => {
                  // console.log(questao);
                  
                  const assunto = (await getAssuntoByID(questao.id_assunto))[0];
                  console.log("Assunto:", assunto);
                  
                  return (
                    <Link href={`/questoes/ID/${questao.ID}`} className={`${styles.questao} hover:border-b-violet-700 hover:bg-[#64748b26] duration-200 p-2 py-3`} key={questao.ID}>
                      <div className={`${styles.enunciado} text-justify`}>{(questao.enunciado.length >= 220) ? (questao.enunciado.substring(0, 180) + "...") : (questao.enunciado)}</div>
                      <div className={`${styles.disciplina} text-justify`}>{disciplinas[questao.id_disciplina]}</div>
                      <div className={`${styles.assunto} text-justify`}>{assunto["nome_assunto"]}</div>
                    </Link>
                  )
                })
              }
            </div>
          ) : ( <p className='text-center mt-8 text-xl'>Nenhuma questão cadastrada no momento. Vá para <Link href={'/qform'} className='text-violet-700 hover:text-violet-500 duration-200'>QForm</Link> para cadastrar alguma.</p> )}
          
        </main>
      </div>

      {/* <FlexWrapper>
        
      </FlexWrapper> */}

      {/* <Link className={`${styles.link} ${styles.voltar}`} href={'/home'}>Voltar</Link> */}
    </>
  )
}
