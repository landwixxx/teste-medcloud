interface Body {
  id: number;
  name: string;
  email: string;
  address: string;
  birthDate: string;
}

export const BASE_URL = 'http://localhost:8000/pacientes';

export const List = async () =>
  fetch(BASE_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

export const Create = async (body: any) =>
  fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

export const Edit = async (body: any) =>
  fetch(`${BASE_URL}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  export const Delete = async (id: number) =>{
  console.log("Paciente de id ", id)
  fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({id : id}),
  })};

