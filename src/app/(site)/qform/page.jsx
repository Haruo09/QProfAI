'use server';

import QForm from '@/components/QForm';
import React from 'react';
import { getDisciplinas } from '@/actions/getDisciplinas';
import { getAssuntos } from '@/actions/getAssuntos';
import NavBar from '@/components/NavBar';
// import { promptGemini } from '@/actions/promptGemini';

export default async function Home() {
  const obj = await getDisciplinas(1);
  const disciplinas = {}
  for (const o of obj) {
    const id = o["id_disciplina"];
    disciplinas[id] = o["nome_disciplina"];
  }
  
  const assuntos = {};
  
  for (const key of Object.keys(disciplinas)) {
    assuntos[Number(key)] = await getAssuntos(Number(key), 1);
  }
  
  // const assuntos = {};

  // for (let i = 0; i < disciplinas.length; i++) {    
  //   assuntos[disciplinas[i]['nome_disciplina']] = await getAssuntos(disciplinas[i]['nome_disciplina']);
  // }

  return (
    <>
      <NavBar />
      <main className='h-fit'>
        <QForm disciplinas={disciplinas} assuntos={assuntos}/>
      </main>
    </>
  )
}


// body
//  formulário
//    enunciado
//    resposta
//    submit