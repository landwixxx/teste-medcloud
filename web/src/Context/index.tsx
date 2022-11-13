import { createContext, useContext, useEffect, useState } from "react";
import * as Services from "../Services";

const MainContext = createContext({});
interface Body {
  id: number;
  name: string;
  email: string;
  birthDate: string;
  address: string;
}
const useMain = () => useContext(MainContext) as any;

const MainProvider = ({ children }: any) => {
  const [data, setData] = useState<any>();

  const getPatients = async () => {
    const response = await Services.List();
    const data = await response.json();
    console.log(data)
    setData(data);
  };

  const createPatient = async (body: Body) => {
    try {
      await Services.Create(body);
    } catch (e) {
      console.log(e);
    }
    getPatients();
  };
  
  const editPatient = async (body: Body) => {
    try {
      console.log(body)
      await Services.Edit(body);
    } catch (e) {
      console.log(e);
    }
    getPatients();
  };

  const deletePatient = async (id: number, name: string) => {   
    try {
      console.log("Deletando paciente ", name)
      await Services.Delete(id);
       getPatients();
    } catch (e) {
      console.log(e);
    }
    getPatients();
  };

  useEffect(() => {
    getPatients();
  }, []);

  return (
    <MainContext.Provider
      value={{ data, createPatient, editPatient, deletePatient }}
    >
      {children}
    </MainContext.Provider>
  );
};

export { MainProvider, useMain };
