<?php


	//conectando con la base de datos
		$mysqli = new mysqli("localhost", "root", "", "solitario");
		if($mysqli === false){
			die("ERROR en la conexion".mysqli_connect_error());
		}//fin conexion

		$sql = "INSERT INTO puntuaciones (nombre, tiempo, puntos) VALUES
		('$_POST[nombre]', '$_POST[tiempo]', '$_POST[puntos]')";
		
		if ($mysqli->query($sql)=== true) {
		echo "Datos Agregados";
		} else {
		echo "ERROR: No fue posible ejecutar ". $sql . $mysqli->error;
		}
		// cierra conexión
		$mysqli->close();

?>
