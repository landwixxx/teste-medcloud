import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Swal from 'sweetalert2';
import { Button, IconButton, TextField } from "@mui/material";
import { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CustomDialog } from "../styles";
import { useEffect, useState } from "react";
import { useMain } from "../../Context";

interface DateInterface {
  $D: number,
  $H: number;
  $y: number;
}
function PatientForm({ open, handleClose, editData }: any) {
  const [formData, setFormData] = useState({ name: "", email: "", birthDate: "", address: "" });
  const { createPatient, editPatient } = useMain();
  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (editData) {
      console.log("Editando paciente com dados ", formData)
      Swal.fire({
        title: 'Deseja salvar as alterações?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Salvar',
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          editPatient({ ...formData }, editData.id);
          Swal.fire('Dados do paciente alterado com sucesso!', '', 'success')
        } else if (result.isDenied) {
          Swal.fire('Edição cancelada', '', 'info')
        }
      })
      cleanFormData();
    } else {
      console.log("Criando paciente com dados ", formData)
      createPatient({ ...formData });
      Swal.fire('Paciente registrado com sucesso!', '', 'success')
      cleanFormData();
    }
    handleClose(false);
  };

  function cleanFormData() {
    setFormData({ name: "", email: "", birthDate: "", address: "" })
  }

  useEffect(() => {
    if (editData) {
      setFormData({
        ...editData,
        email: editData.email,
        name: editData.name,
        birthDate: editData.birthDate,
        address: editData.address,
      });
    }
  }, [editData]);

  return (
    <CustomDialog open={open} onClose={() => handleClose()}>
      <form onSubmit={handleSubmit} >
        <DialogTitle>{editData ? "Editar" : "Adicionar"} Paciente</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            id="name"
            label="Nome"
            fullWidth
            type="text"
            value={formData.name}
            variant="standard"
            required
            onChange={(event) =>
              setFormData({ ...formData, name: event.target.value })
            }

          />
          <TextField
            autoFocus
            id="email"
            value={formData.email}
            label="Email"
            fullWidth
            type="email"
            required
            variant="standard"
            onChange={(event) =>
              setFormData({ ...formData, email: event.target.value })
            }
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            toolbarFormat="dd mm yyyy"
            className="datepicker"
            label="Data de Nascimento"
            maxDate={new Date().toJSON().split('T')[0]}
            autoFocus
            value={formData.birthDate}
            onChange={(value : DateInterface | any)=>
              setFormData({...formData, birthDate: `${value.$y}-${value.$M+1}-${value.$D}`})
            }
            renderInput={(formData) => <TextField {...formData}/>} 
          />
          </LocalizationProvider>
          <TextField
            autoFocus
            id="address"
            value={formData.address}
            label="Endereço"
            fullWidth
            type="text"
            required
            variant="standard"
            onChange={(event) =>
              setFormData({ ...formData, address: event.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()}>Cancelar</Button>
          <Button variant="contained" type="submit">
            Salvar
          </Button>
        </DialogActions>
      </form>
    </CustomDialog>
  );
}
/**
 * <input type="date"name="Nascimento" id="date-picker" required value={formData.birthDate} onChange={(event)=>
              setFormData({...formData, birthDate: new Date(event.target.value).toJSON().split('T')[0]})
            }/>

             setFormData({...formData, birthDate: `${value.$y}-${value.$M}-${value.$D}`})
 */
export default PatientForm;
