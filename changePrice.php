<?php

require_once 'dbPassword.php';

$dbconn = pg_connect("host=localhost dbname=greouxlocation user=greouxlocation password="+$dbPassword)
    or die('Connexion impossible : ' . pg_last_error());

$k = $_POST['chg'];
$price = $_POST['value'];

echo $k;
echo $price;

if ($k == 1) $query = "UPDATE fares SET value = $price WHERE category = 'basse'";
else { if ($k == 2) $query = "UPDATE fares SET value = $price WHERE category = 'moyenne'";
else {if ($k == 3) $query = "UPDATE fares SET value = $price WHERE category = 'haute'";
else $query = "UPDATE fares SET value = $price WHERE category = 'Taxes_de_sejour'";}}

echo $query;

$result = pg_query($query) or die('Échec requête : ' . pg_last_error());

echo "OPERATION EFFECTUEE : changement de prix enregistre";

$line = pg_fetch_assoc($result);
pg_free_result($result);
pg_close($dbconn);
echo '<script language="Javascript">
document.location.replace("manager.php");
</script>';

?>
