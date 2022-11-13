import { useMain } from "../../Context";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TableContainer, TableHeader } from "../styles";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import Swal from 'sweetalert2';
import { Button, IconButton, Tooltip } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useState } from "react";
import PatientForm from "../Form";

interface Patient {
  id: number,
  name: string;
  email: string;
  birth_date: string;
  address: string;
}

function Table() {
  const { data, deletePatient } = useMain();
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(undefined);

  const handleEdit = (values: any) => {
    setOpen(true);
    setEditData(values);
  };
  const handleClose = () => {
    setOpen(false);
    setEditData(undefined);
  };

  const handleDelete = (patient: Patient | any) => {
    console.log(patient)
    Swal.fire({
      title: 'Deseja deletar o paciente?',
      text: patient.name,          
      showCancelButton: true,
      confirmButtonText: 'Deletar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        deletePatient(patient.id, patient.name);
        Swal.fire('Paciente deletado!', '', 'info')
      }
    })
  }

  function getFormatedDate(stringDate: String){
    var splitData = stringDate.split('-');
    var day = parseInt(splitData[2]) < 10 ? 0 + splitData[2] : splitData[2]
    var month = splitData[1]
    var year = splitData[0]

    return day + '/' + month + '/' + year;
  }

  return (
    <TableContainer>
      <TableHeader>
        <h2>Registro de Pacientes</h2>
        <Button
          variant="contained"
          onClick={() => setOpen(true)}
        >
          Adicionar
        </Button>
      </TableHeader>
      <PatientForm open={open} handleClose={handleClose} editData={editData} />
      <table>
        <TableHead>
          <TableRow>
            <TableCell align="left">Id</TableCell>
            <TableCell align="left">Nome</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Nascimento</TableCell>
            <TableCell align="left">Endereço</TableCell>
            <TableCell align="right">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((patient: any) => (
            <TableRow key={patient.id}>
              <TableCell align="left">{patient.id}</TableCell>
              <TableCell align="left">{patient.name}</TableCell>
              <TableCell align="left">{patient.email}</TableCell>
              <TableCell align="left">{getFormatedDate(patient.birthDate)}</TableCell>
              <TableCell align="left">{patient.address}</TableCell>
              <TableCell align="right">
                <Tooltip title="Editar">
                  <IconButton>
                    <ModeEditOutlineIcon
                      onClick={() => handleEdit(patient)}
                      fontSize="small"
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Deletar">
                  <IconButton>
                    <Delete
                      fontSize="small"
                      onClick={() => {handleDelete(patient)}}
                     />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </table>
    </TableContainer>
  );
}

export default Table;
