import React, { FormEvent, useState } from "react";
import {useHistory} from 'react-router-dom'
import PageHeader from "../../components/PageHeader";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import Select from "../../components/Select";
import api from "../../services/api";
import "./styles.css";

import warningIcon from "../../assets/images/icons/warning.svg";

export default function TeacherForm() {

  const history = useHistory()

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [bio, setBio] = useState("");

  const [subject, setSubject] = useState("");
  const [cost, setCost] = useState("");

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: "", to: "" },
  ]);

  function AddNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      {
        week_day: 0,
        from: "",
        to: "",
      },
    ]);
  }


  function setScheduleItemValue(position: number, field: string, value: string){
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index ) => {

      if(index === position){
        return { ...scheduleItem, [ field ]: value }
      }
      return scheduleItem
    })

  setScheduleItems(updatedScheduleItems)

  }


  function handleCreateClass(e: FormEvent) {
    e.preventDefault();

    api.post('classes',{
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems
    }).then(() =>{
      alert('Cadastro Realizado com Sucesso!')
      history.push('/')

    }).catch(() =>{
      alert('Erro no Cadastro!')
    })
 
  }



  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        title="Que incrivel que você quer dar Aulas"
        description="O primeiro passo é preencher esse formulário de inscrição"
      />
      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus Dados</legend>

            <Input
              name="name"
              label="Nome Completo"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Input
              name="avatar"
              label="Avatar"
              value={avatar}
              onChange={(e) => {
                setAvatar(e.target.value);
              }}
            />
            <Input
              name="whatsapp"
              label="Whatsapp"
              value={whatsapp}
              onChange={(e) => {
                setWhatsapp(e.target.value);
              }}
            />
            <TextArea
              name="bio"
              label="Biografia"
              value={bio}
              onChange={(e) => {
                setBio(e.target.value);
              }}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a Aula</legend>

            <Select
              name="subject"
              label="Matéria"
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
              }}
              options={[
                { value: "Artes", label: "Artes" },
                { value: "Biologia", label: "Biologia" },
                { value: "Algoritmos", label: "Algoritmos" },
                { value: "Matemática", label: "Matemática" },
                { value: "Programação I", label: "Programação I" },
                { value: "Física", label: "Física" },
                { value: "Cálculo", label: "Cálculo" },
                { value: "Banco de Dados I", label: "Banco de Dados I" },
                { value: "Modelagem 3D", label: "Modelagem 3D" },
              ]}
            />
            <Input
              name="cost"
              label="Custo da sua hora por Aula"
              value={cost}
              onChange={(e) => {
                setCost(e.target.value);
              }}
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários Disponíveis
              <button type="button" onClick={AddNewScheduleItem}>
                + Novo Horário
              </button>
            </legend>

            {scheduleItems.map((scheduleItem, index) => {
              return (
                <div key={scheduleItem.week_day} className="schedule-item">
                  <Select
                    name="week_day"
                    label="Dia da Semana"
                    value={scheduleItem.week_day}
                    onChange={(e)=> setScheduleItemValue(index, 'week_day',(e.target.value))}
                    options={[
                      { value: "0", label: "Domingo" },
                      { value: "1", label: "Segunda-Feira" },
                      { value: "2", label: "Terça-Feira" },
                      { value: "3", label: "Quarta-Feira" },
                      { value: "4", label: "Quinta-Feira" },
                      { value: "5", label: "Sexta-Feira" },
                      { value: "6", label: "Sábado" },
                    ]}
                  />
                  <Input 
                  name="from" 
                  label="Das" 
                  type="time" 
                  value={scheduleItem.from}
                  onChange={(e)=> setScheduleItemValue(index, 'from',(e.target.value))}
                  />
                 
                  <Input name="to" 
                  label="Até" 
                  type="time" 
                  value={scheduleItem.to}
                  onChange={(e)=> setScheduleItemValue(index, 'to',(e.target.value))}
                  />
                  
                </div>
              );
            })}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Aviso Importante" />
              Importante! <br />
              Preencha Todos os Dados
            </p>
            <button type="submit">Salvar Cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
}
