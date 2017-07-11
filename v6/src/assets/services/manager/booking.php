<?php

require_once '../../security/key.php';

$dbconn = pg_connect("host=localhost dbname=greouxlocation user=greouxlocation password=".BASE_PWD)
    or die('Connexion impossible : ' . pg_last_error());

if($mode == cancel){

$id_book = $_GET['id'];

$query = "DELETE FROM bookings WHERE id_booking = $id_book";
echo $query;
$result = pg_query($query) or die('Échec requête : ' . pg_last_error());

echo "OPERATION EFFECTUEE : reservation eliminee";
}

else {

$client = $_POST['client'];

$query = "INSERT INTO bookings (client, check_in, check_out) VALUES ('$client', '$check_in', '$check_out')";
echo $query;
$result = pg_query($query) or die('Échec requête : ' . pg_last_error());

echo "OPERATION EFFECTUEE : reservation enregistree";
}

$line = pg_fetch_assoc($result);
pg_free_result($result);
pg_close($dbconn);

echo '<script language="Javascript">
document.location.replace("manager.php");
</script>';

?>
