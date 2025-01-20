'use server';

import { getQuestao } from '@/actions/getQuestao';
import React from 'react';
import Link from 'next/link';
import { getDisciplinaByID } from '@/actions/getDisciplinaByID';
import { getAssuntoByID } from '@/actions/getAssuntoByID';
import NavBar from '@/components/NavBar';

export default async function QuestaoX({ params }) {
  const questao = (await getQuestao(1, params.id_questao))[0];
  const disciplina = (await getDisciplinaByID(1, questao.id_disciplina))[0];
  const assunto = (await getAssuntoByID(questao.id_assunto))[0];

  return (
    <>
      <NavBar />
      <div className='mx-auto mt-10 w-2/3 bg-[#5a555517] p-6 text-justify text-slate-300 text-lg overflow-scroll'>
        <h1 className='text-left text-3xl ml-0 mt-0 font-semibold mb-2'>Enunciado:</h1>
        <p className='text-xl mb-4'>{questao.enunciado}</p>

        <ol type='A'>
          <li className='mb-2'><strong className='text-green-500'>A&#41;</strong> {questao.alt1}</li>
          <li className='mb-2'><strong className='text-slate-100'>B&#41;</strong> {questao.alt2}</li>
          <li className='mb-2'><strong className='text-slate-100'>C&#41;</strong> {questao.alt3}</li>
          <li className='mb-2'><strong className='text-slate-100'>D&#41;</strong> {questao.alt4}</li>
          <li className='mb-2'><strong className='text-slate-100'>E&#41;</strong> {questao.alt5}</li>
        </ol>
      
        <div><strong>alternativa certa:</strong> {questao.alt_certa}</div>
        <div><strong>disciplina:</strong> {disciplina["nome_disciplina"]}</div>
        <div><strong>assunto:</strong> {assunto["nome_assunto"]}</div>

        {/* <h1 className='text-left text-3xl ml-0 mt-0 font-semibold mb-2'>Resolução:</h1>
        <p>{questao.resolucao}</p> */}
        <Link className='btn-primary mt-4 block w-24 text-center' href={'/questoes'}>Voltar</Link>
      </div>
    </>
  )
}
