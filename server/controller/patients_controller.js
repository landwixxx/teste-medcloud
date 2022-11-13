const mysql = require('../mysql').pool;

exports.getPatients = (req, res, next) => {
    mysql.getConnection((error, conn)=>{
        if (error){ return res.status(500).send({error: error})}

        conn.query('SELECT * from pacientes;',
        (error, result, fields) => {
            if (error){ return res.status(500).send({error: error})}
            
            return res.status(200).send(result)
        })
    })

   /** return res.status(200).send(

        [{
            id: 1,
            name: "Lander",
            email: "landerWilker@tahoo.com.br",
            birthDate: new Date('1999-11-26').toJSON().split('T')[0],
            address: "Alto da XV",
        }]
    )
     */
};

exports.fetchPatient =  (req, res, next) => {
    const patient = {
        name : req.body.name,
        id : req.body.id
    }  

    mysql.getConnection((error, conn)=>{
        conn.query(
            'SELECT * from pacientes WHERE id = ?',
            [patient.id ],            
            (error, resultado, field) => {
            conn.release();

                if(error){
                    res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                return res.status(202).send({
                    mensagem: 'Buscando paciente',
                    resultado
                });
            }
        )
    })
};

exports.postPatient = (req, res, next) => {
    const patient = {
        email : req.body.email,
        name : req.body.name,
        address : req.body.address,
        birthDate : req.body.birthDate
    }

    mysql.getConnection((error, conn)=>{
        conn.query(
            'INSERT INTO pacientes (email, name, address, birthDate) VALUES (?,?,?,?)',
            [patient.email, patient.name, patient.address, patient.birthDate ],            
            (error, resultado, field) => {
                conn.release();

                if(error){
                    res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                res.status(201).send({
                    mensagem: 'Paciente registrado com sucesso!',
                    nome: patient.name,
                });
            }
        )
    });    
};

exports.patchPatient = (req, res, next) => {
    const patient = {
        id: req.body.id,
        email : req.body.email,
        name : req.body.name,
        address : req.body.address,
        birthDate : req.body.birthDate,
    }  
        mysql.getConnection((error, conn)=>{
            conn.query(
                'UPDATE pacientes SET email = ?, name = ?, address = ?, birthDate = ? WHERE id =' + patient.id,
                [patient.email, patient.name, patient.address, patient.birthDate ],            
                (error, resultado, field) => {
                conn.release();
    
                    if(error){
                        res.status(500).send({
                            error: error,
                            response: null
                        });
                    }
    
                    return res.status(202).send({
                        mensagem: 'Paciente Atualizado na base de dados',
                    });
                }
            )
        })  
};

exports.deletePatient = (req, res, next) => {
    const patient = {
        id : req.body.id
    }  
    
    console.log("Deletando paciente ", patient.id);
    mysql.getConnection((error, conn)=>{
        conn.query(
            'DELETE from pacientes WHERE id = ?',
            [patient.id ],            
            (error, resultado, field) => {
            conn.release();

                if(error){
                    res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                return res.status(202).send({
                    mensagem: 'Paciente removido da base de dados',
                });
            }
        )
    })
};

