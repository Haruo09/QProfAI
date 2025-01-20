'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { QFormSchema } from '@/app/lib/QFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './QForm.module.css';
import submitForm from '@/actions/submitForm';
import Alternativa from './Alternativa';
import { promptGemini } from '@/actions/promptGemini';
import { getDisciplinaByID } from '@/actions/getDisciplinaByID';
import { getAssuntoByID } from '@/actions/getAssuntoByID';
import { SiGooglegemini } from 'react-icons/si';
import SpinnerEffect from './loading/SpinnerEffect';
// import { redirect } from 'next/dist/server/api-utils';

export default function QForm({ disciplinas, assuntos }) {
  const [arrAssuntos, setArrAssuntos] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);

  const { getValues, setValue, register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(QFormSchema)
  });

  async function handleForm(data) {
    console.log('Submiting...');
    
    setIsSubmiting(true);
    const dataAfterParse = QFormSchema.safeParse(data);

    if (!dataAfterParse.success) {
      alert("ERRO: Dados de formulário inválidos.");
      return;
    }

    await submitForm(1, 
      dataAfterParse.data.disciplina, 
      dataAfterParse.data.assunto, 
      dataAfterParse.data.enunciado,
      dataAfterParse.data.alternativaA, 
      dataAfterParse.data.alternativaB, 
      dataAfterParse.data.alternativaC, 
      dataAfterParse.data.alternativaD, 
      dataAfterParse.data.alternativaE, 
      dataAfterParse.data.alternativaCerta
    );

    if (!errors) {
      alert('Formulário enviado com sucesso!')
    };

    console.log('Função finalizada!');
    
  }

  async function generate(_) {
    setIsGenerating(true);
    
    try {
      console.log(getValues('assunto'));
      console.log('Gerando questão...');
  
      console.log("Disciplina:");
      const nome_disciplina = disciplinas[getValues('disciplina')];
      console.log(nome_disciplina);

      console.log("Assunto:");
      const nome_assunto = (await getAssuntoByID(getValues('assunto')))[0]["nome_assunto"];
      console.log(nome_assunto);
      
      const questao = await promptGemini(nome_disciplina, nome_assunto);
      console.log('Questão gerada!');
      console.log(questao);
      
      setValue('enunciado', questao['enunciado']);
      setValue('alternativaA', questao['alternativas']['a']);
      setValue('alternativaB', questao['alternativas']['b']);
      setValue('alternativaC', questao['alternativas']['c']);
      setValue('alternativaD', questao['alternativas']['d']);
      setValue('alternativaE', questao['alternativas']['e']);
      setValue('alternativaCerta', questao['altcerta']);

    }
    
    catch (error) {
      window.alert("Não foi possível gerar a questão. Por favor, selecione uma disciplina e um assunto corretamente.");
      console.log(error);
    }
    
    finally {
      setIsGenerating(false);
    }
  }
  
  // COMPONENT RETURN ==================================================================================================
  return (
    <form className="border-b-violet-700 border-b-2 p-4 bg-[#5a555517] min-w-1/4 max-w-[700px] h-fit overflow-y-scroll resize mt-8 mx-auto" onSubmit={handleSubmit(handleForm)}>
      <h1 className='font-semibold'>Question Form</h1>
      <textarea placeholder='Enunciado' name="enunciado" id="txt_enunciado" className="txt-field mb-4 h-fit" {...register("enunciado")} />

      <div className={styles.alternativas}>
        <Alternativa letter={"A"} register={register} />
        <Alternativa letter={"B"} register={register} />
        <Alternativa letter={"C"} register={register} />
        <Alternativa letter={"D"} register={register} />
        <Alternativa letter={"E"} register={register} />
      </div>

      <div className={"grid grid-cols-2 gap-2 overflow-scroll"}>
        <div className="wrapper">
          <label htmlFor="disciplinas">Disciplina:</label>
          <select 
            name="disciplina"
            className={`select_disciplinas txt-field mx-0`}
            {...register("disciplina")}
            // onChange={(e) => changeAssunto(e.target.value)}
            onChange={(e) => {
              // console.log(assuntos[e.target.value]);
              setArrAssuntos(assuntos[e.target.value]);
              setValue('assunto', 0)
            }}
          >
            <option key={0} value={"0"} className='text-[#9ca3af]'>--</option>
            {Object.entries(disciplinas).map(([key, value]) => {
              // console.log(`Key: ${key}; Value: ${value}`);
              return <option key={key} value={key}>{value}</option>
            })}
          </select>
        </div>

        <div className="wrapper">
          <label htmlFor="assuntos">Assunto:</label>
          <select 
            name="assuntos" 
            className={"select_assuntos block w-full txt-field"}
            {...register("assunto")}
          >
            <option key={0} value={0}> -- </option>
            {arrAssuntos && (
              arrAssuntos.map((obj) => {
                // console.log(obj['id_assunto']);
                return (
                  <option key={obj["id_assunto"]} value={obj["id_assunto"]}>
                    {obj["nome_assunto"]}
                  </option>
                );
              })
            )}

          </select>
        </div>
      </div>
      {/* <input type="submit" value={isGenerating ? "Submit" : ""} className={`btn-primary`} /> */}
      <button type="submit" className='btn-primary' id='btnSubmit'>
        {(isSubmiting) ? (<SpinnerEffect text='Submiting' />) : (<>Submit</>)}
      </button>

        <button type="button" value='Generate' id='btnGenerate'
        className='btn-primary mt-0 bg-transparent border-[.10rem] border-indigo-700 text-indigo-700 hover:text-slate-200 hover:bg-indigo-500'
        // className={`btn-primary border-violet-300 text-violet-300 bg-inherit mt-0  border-[2.5px] hover:bg-violet-300 hover:text-violet-700`}
        onClick={generate}
        >
          {(isGenerating) ? (
            <>
              <SpinnerEffect text='Generating' />
            </>
          ) : (
            <>
              Generate <SiGooglegemini className='inline' />
            </>
          )}
        </button>
      <input id='btnCancel' type="reset" value="Cancel" className={`btn-primary border-red-800 border-[2.5px] mt-0 bg-inherit text-red-800 hover:bg-red-700 hover:text-white`} 
      onClick={() => {
        
        setValue('assunto', 0);
        setValue('diciplina', 0);
        setArrAssuntos([]);
      }}/>
    </form>

  )
}
