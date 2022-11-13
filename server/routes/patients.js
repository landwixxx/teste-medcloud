const expess = require('express');
const router = expess.Router();
const patients_controller = require('../controller/patients_controller');

router.get('/', patients_controller.getPatients);

router.get('/:patient_id', patients_controller.fetchPatient)

router.post('/', patients_controller.postPatient)

router.patch('/', patients_controller.patchPatient)

router.delete('/:patient_id', patients_controller.deletePatient)



module.exports = router;