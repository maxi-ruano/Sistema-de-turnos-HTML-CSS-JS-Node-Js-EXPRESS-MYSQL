const express = require("express");
const app = express();
const cors = require("cors");
const mercadopago = require("mercadopago");
const nodemailer = require('nodemailer');
const cron = require('node-cron');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const path = require('path');

const ejs = require('ejs');



app.set('view engine', 'ejs'); 


const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'turnos'
  });
  
  
   
  
  
  
  
  
  connection.connect((error) => {
	  if (error) {
		console.error('Error al conectarse a la base de datos:', error);
	  } else {
		console.log('Conexión exitosa a la base de datos.');
	  }
	});
  
	
	
	



// REPLACE WITH YOUR ACCESS TOKEN AVAILABLE IN: https://developers.mercadopago.com/panel
mercadopago.configure({
	access_token: "TEST-8495428185856409-101912-a3549658c44a570826bd6143d0204ec1-1517529394",
});




app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("../../client/html-js"));
app.use(cors());
app.get("/", function (req, res) {
	res.status(200).sendFile("index.html");
});












app.post("/create_preference", (req, res) => {

	let preference = {
		items: [
			{
				title: req.body.description,
				unit_price: Number(req.body.price),
				quantity: Number(req.body.quantity),
			}
		],
		back_urls: {
			"success": "http://localhost:8080",
			"failure": "http://localhost:8080",
			"pending": "http://localhost:8080"
		},
		auto_return: "approved",
	};

	mercadopago.preferences.create(preference)
		.then(function (response) {
			res.json({
				id: response.body.id
			});
		}).catch(function (error) {
			console.log(error);
		});
});


app.post("/create_preference2", (req, res) => {

	let preference = {
		items: [
			{
				title: req.body.description,
				unit_price: Number(req.body.price),
				quantity: Number(req.body.quantity),
			}
		],
		back_urls: {
			"success": "http://localhost:8080/feedback",
			"failure": "http://localhost:8080/feedback",
			"pending": "http://localhost:8080/feedback"
		},
		auto_return: "approved",
	};

	mercadopago.preferences.create(preference)
		.then(function (response) {
			res.json({
				id: response.body.id
			});
		}).catch(function (error) {
			console.log(error);
		});
});

app.post("/create_preference3", (req, res) => {

	let preference = {
		items: [
			{
				title: req.body.description,
				unit_price: Number(req.body.price),
				quantity: Number(req.body.quantity),
			}
		],
		back_urls: {
			"success": "http://localhost:8080/feedback",
			"failure": "http://localhost:8080/feedback",
			"pending": "http://localhost:8080/feedback"
		},
		auto_return: "approved",
	};

	mercadopago.preferences.create(preference)
		.then(function (response) {
			res.json({
				id: response.body.id
			});
		}).catch(function (error) {
			console.log(error);
		});
});














app.get('/feedback', function (req, res) {
	res.json({
		Payment: req.query.payment_id,
		Status: req.query.status,
		MerchantOrder: req.query.merchant_order_id
	});
});



function generarTokenDeConfirmacion() {
	const claveSecreta = 'tu_clave_secreta'; // Clave secreta para firmar el token
	const token = jwt.sign({}, claveSecreta, { expiresIn: '1h' }); // Token válido por 1 hora
	return token;
  }
  
  // Función para enviar correo de confirmación
  function enviarCorreoConfirmacion(email, name, lastName, time, hour, specialty) {
	const transporter = nodemailer.createTransport({
	  host: 'smtp.gmail.com',
	  port: 587,
	  secure: false,
	  auth: {
		user: 'ruanomaxi@gmail.com',
		pass: 'esgj besd zqlc kyja',
	  },
	});
  
	const token = generarTokenDeConfirmacion();
	const confirmationLink = `http://localhost:3000/confirmar-turno/${token}`;
	const mailOptions = {
	  from: 'MedicalGroupCenter@gmail.com',
	  to: email,
	  subject: 'Confirmación de cita',
	  text: `Gracias por reservar una cita con nosotros. Aquí están los detalles de su cita. Por favor, haz clic en el siguiente enlace para confirmar tu turno: ${confirmationLink}:
	  
	  Nombre: ${name}
	  Apellido: ${lastName}
	  Fecha: ${time}
	  Hora: ${hour}
	  Especialidad: ${specialty}
	  ¡Te esperamos pronto!`,
	};
  
	transporter.sendMail(mailOptions, (error, info) => {
	  if (error) {
		console.error('Error al enviar el correo electrónico:', error.message);
	  } else {
		console.log('Correo electrónico enviado:', info.response);
	  }
	});
  }



  function enviarCorreoRecordatorio(email, name, lastName, time, hour, specialty) {
	const transporter = nodemailer.createTransport({
	  host: 'smtp.gmail.com',
	  port: 587,
	  secure: false,
	  auth: {
		user: 'ruanomaxi@gmail.com',
		pass: 'esgj besd zqlc kyja',
	  },
	});
  
	const token = generarTokenDeConfirmacion();
	const confirmationLink = `http://localhost:3000/confirmar-turno/${token}`;
	const mailOptions = {
	  from: 'MedicalGroupCenter@gmail.com',
	  to: email,
	  subject: 'Recordatorio de cita',
	  text: ` Por favor chequear  los datos de su cita  
	  
	  Nombre: ${name}
	  Apellido: ${lastName}
	  Fecha: ${time}
	  Hora: ${hour}
	  Especialidad: ${specialty}
	  ¡Te esperamos pronto!`,
	};
  
	transporter.sendMail(mailOptions, (error, info) => {
	  if (error) {
		console.error('Error al enviar el correo electrónico:', error.message);
	  } else {
		console.log('Correo electrónico enviado:', info.response);
	  }
	});
  }
  
//   app.post('/insertar', (req, res) => {
// 	const name = req.body.name;
// 	const lastName = req.body['last-name'];
// 	const specialty = req.body.specialty;
// 	const time = req.body.time;
// 	const hour = req.body.hour;
// 	const email = req.body.email;
  
// 	const token = generarTokenDeConfirmacion();
  
// 	const query = `INSERT INTO personas (nombre, apellido, fecha, hora, especialidad, email, token, turno_confirmado) VALUES (?, ?, ?, ?, ?, ?, ?, false)`;
// 	connection.query(query, [name, lastName, time, hour, specialty, email, token], (error, results, fields) => {
// 	  if (error) {
// 		console.error('Error al insertar los datos en la base de datos:', error.message);
// 		res.status(500).send('Error al insertar los datos en la base de datos');
// 	  } else {
// 		console.log('Datos insertados correctamente en la base de datos');
  
// 		// Enviar correo de confirmación
// 		enviarCorreoConfirmacion(email, name, lastName, time, hour, specialty);
  
// 		cron.schedule('16 09 * * *', () => { 
  
  
  
  
		
		  
// 		  const query = 'SELECT nombre, apellido, fecha, hora, especialidad FROM personas WHERE token = ?';
		  
// 		  connection.query(query, [token], (error, results, fields) => {
// 			console.log(results);
		  
// 			if (error) {
// 			  console.error('Error al ejecutar la consulta en la base de datos:', error.message);
// 			  // Maneja el error según tu lógica de negocio
// 			} else {
// 			  // Verifica si se encontraron resultados
// 			  if (results.length > 0) {
// 				const turno = results[0]; // Suponiendo que solo esperas un resultado (un turno) para ese token
// 				const name = turno.nombre;
// 				const lastName = turno.apellido;
// 				const time = turno.fecha;
// 				const hour = turno.hora;
// 				const specialty = turno.especialidad;
// 				const email = 'ruanomaxi@gmail.com'; // Obtén el correo electrónico del turno de alguna manera
		  
// 				// Ahora puedes enviar el recordatorio utilizando estos datos
// 				enviarCorreoRecordatorio(email, name, lastName, time, hour, specialty);
		  
// 				console.log('Recordatorio de turnos enviado.');
// 			  } else {
// 				console.log('No se encontraron detalles del turno para el token dado:', token);
// 				// Maneja el caso donde no se encuentra ningún turno para el token
// 			  }
// 			}
// 		  });
		  
		  
		  
		  
		  
// 		  });
		  
		
  
// 		res.send('Datos enviados correctamente');
// 	  }
// 	});
//   });

app.post('/insertar', (req, res) => {
	const name = req.body.name;
	const lastName = req.body['last-name'];
	const specialty = req.body.specialty;
	const time = req.body.time;
	const hour = req.body.hour;
	const email = req.body.email;
  
	const token = generarTokenDeConfirmacion();
  
	// Verificar si ya existe un turno para el día y hora seleccionados
	const checkQuery = 'SELECT COUNT(*) as count FROM personas WHERE fecha = ? AND hora = ?';
	connection.query(checkQuery, [time, hour], (checkError, checkResults) => {
	  if (checkError) {
		console.error('Error al verificar la existencia del turno en la base de datos:', checkError.message);
		res.status(500).send('Error al verificar la existencia del turno en la base de datos');
	  } else {
		const turnoExistente = checkResults[0].count > 0;
  
		if (turnoExistente) {
		  // Ya existe un turno para el día y hora seleccionados
		  res.status(400).send('Ya existe un turno para el día y hora seleccionados. Por favor, elige otro horario.');
		} else {
		  // Continuar con la inserción en la base de datos
		  const insertQuery = `INSERT INTO personas (nombre, apellido, fecha, hora, especialidad, email, token, turno_confirmado) VALUES (?, ?, ?, ?, ?, ?, ?, false)`;
		  connection.query(insertQuery, [name, lastName, time, hour, specialty, email, token], (insertError, insertResults) => {
			if (insertError) {
			  console.error('Error al insertar los datos en la base de datos:', insertError.message);
			  res.status(500).send('Error al insertar los datos en la base de datos');
			} else {
			  console.log('Datos insertados correctamente en la base de datos');
  
			  // Enviar correo de confirmación
			  enviarCorreoConfirmacion(email, name, lastName, time, hour, specialty);
  
			  cron.schedule('16 09 * * *', () => {
				// Lógica para enviar recordatorio
			  });
  
			  res.send('Datos enviados correctamente');
			}
		  });
		}
	  }
	});
  });


// En tu archivo de servidor (app.js o similar)
app.get('/getOccupiedHours', (req, res) => {
	const selectedDate = req.query.date;
  
	// Lógica para obtener las horas ocupadas para la fecha seleccionada
	// Esta lógica debería comunicarse con tu base de datos
  
	// Ejemplo: Obtener las horas ocupadas desde la base de datos
	const query = 'SELECT hora FROM personas WHERE fecha = ?';
	connection.query(query, [selectedDate], (error, results) => {
	  if (error) {
		console.error('Error al obtener las horas ocupadas:', error.message);
		res.status(500).send('Error al obtener las horas ocupadas');
	  } else {
		const occupiedHours = results.map(result => result.hora);
		res.json({ occupiedHours });
	  }
	});
  });
  



  app.get('/confirmar-turno/:token', (req, res) => {
	const token = req.params.token;
	console.log(token); // Verifica si el token se está capturando correctamente
  
	try {
	  // Verifica si el token de confirmación es válido usando jwt.verify()
	  const decodedToken = jwt.verify(token, 'tu_clave_secreta'); // Asegúrate de usar la misma clave secreta que usaste para firmar el token
  
	  // Consulta en la base de datos si el token existe
	  const query = 'SELECT * FROM personas WHERE token = ?';
	  connection.query(query, [token], (error, results, fields) => {
		if (error) {
		  console.error('Error al buscar el token en la base de datos:', error.message);
		  res.send('Error al confirmar el turno. Por favor, intenta nuevamente o contacta a soporte.');
		} else {
		  if (results[0].token === token) {
			// El token existe en la base de datos y coincide, marca el turno como confirmado
			const idUsuario = results[0].id; // Suponiendo que tienes un campo id en tu tabla personas
			const updateQuery = 'UPDATE personas SET turno_confirmado = 1 WHERE id = ?';
			connection.query(updateQuery, [idUsuario], (updateError, updateResults, updateFields) => {
			  if (updateError) {
				console.error('Error al actualizar el estado del turno:', updateError.message);
				res.send('Error al confirmar el turno. Por favor, intenta nuevamente o contacta a soporte.');
			  } else {
				// El turno ha sido confirmado correctamente
				res.send('¡Tu turno ha sido confirmado correctamente!');
			  }
			});
		  } else {
			// El token no existe en la base de datos o no coincide, muestra un mensaje de error
			res.send('Token no válido. Por favor, intenta nuevamente o contacta a soporte.');
		  }
		}
	  });
	} catch (error) {
	  // Si el token no es válido, muestra un mensaje de error al usuario
	  console.error('Error al verificar el token de confirmación:', error.message);
	  res.send('Error al confirmar el turno. Por favor, intenta nuevamente o contacta a soporte.');
	}
  });
  


  app.get('/data', function(req, res) {
    // Realizar la consulta a la base de datos
    connection.query('SELECT fecha FROM personas', function(error, results, fields) {
      if (error) throw error;
  
      // Enviar los resultados de la consulta como respuesta a la solicitud
      res.send(results);
       console.log(results)
    });
  });
  












app.listen(8080, () => {
	console.log("The server is now running on Port 8080");
});
