<html>
<head>
<title>Consulta Puntuaciones Solitario</title>
</head>

<body bgcolor="#0000ff">

<?php
//conectando con la base de datos
$mysqli = new mysqli("localhost", "root", "", "solitario");
if($mysqli === false){
	die("ERROR en la conexion".mysqli_connect_error());
}//fin conexion

//realizando la consulta
$cadena = "SELECT id, nombre, tiempo, puntos FROM puntuaciones";
if ($result = $mysqli->query($cadena)) {
	if ($result->num_rows > 0) {
    echo "<html>";
    echo "<head><title>Puntuaciones</title>";
    echo "<link rel=\"stylesheet\" href=\"tableroSolitario.css\">";
    echo "</head>";
    echo "<body background=\"fondo/lobo-solitario.jpg\">";
    echo "<div id=\"todo\">";
    echo "<div id=\"centro\">";
    
    echo "<center>";
    echo "<br><br><h1>PUNTUACIONES</h1><br><br>";
		echo "<table border=1>";
		echo "<td><h1>Id</h1></td><td><h1>Nombre</h1></td><td><h1>Tiempo</h1></td><td><h1>Puntos</h1></td>";
		while($row = $result->fetch_array()) {
			echo "<tr>";
			echo "<td><h1>".$row[0]."</h1></td><td><h1>".$row[1]."</h1></td><td><h1>".$row[2]."</td></h1><td><h1>".$row[3]."</h1></td>";
			echo "</tr>";
		}
		echo "</table>";
    echo "</center>";
    
    echo "</div>";
    echo "</div>";
    echo "</body>";
    echo "</html>";
		$result->close();
		} else {
			echo "No se encontró ningún registro que coincida con su búsqueda.";
		}
} else {
	echo "ERROR: No fue posible ejecutar $sql. " . $mysqli->error;
}
		// cierra conexión
		$mysqli->close();
?>

</body>

</html>
