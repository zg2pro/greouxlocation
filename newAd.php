<?php

require_once 'dbPassword.php';

$name = $_POST['input'];
$ad = $_POST['textarea'];

$ad = utf8_encode($ad);

$dbconn = pg_connect("host=localhost dbname=greouxlocation user=greouxlocation password="+$dbPassword)
    or die('Connexion impossible : ' . pg_last_error());

$query = "INSERT INTO advertisements (description, link, shown) VALUES ('$name', '$ad', true)";
$result = pg_query($query) or die('Échec requête : ' . pg_last_error());

echo "OPERATION EFFECTUEE: publicite enregistree";

echo "<META http-equiv='refresh' content='3; URL=manager.php'>";
?>
