<?php

$k = $_POST['chg'];
$price = $_POST['value'];

echo $k;
echo $price;

require_once '../../security/key.php';

$dbconn = pg_connect("host=localhost dbname=greouxlocation user=greouxlocation password=" . BASE_PWD)
        or die('Connexion impossible : ' . pg_last_error());

if ($k == 1) {
    $query = "UPDATE contacts SET text = '$price' WHERE type = 'ADRESSE'";
} else if ($k == 2) {
    $query = "UPDATE contacts SET value = '$price' WHERE type = 'MAIL'";
} else if ($k == 3) {
    $query = "UPDATE contacts SET value = '$price' WHERE type = 'TELEPHONE'";
}

echo $query;

$resultUpdateContacts = pg_query($query) or die('Échec requête : ' . pg_last_error());

echo "OPERATION EFFECTUEE : changement de contact enregistre";

$line = pg_fetch_assoc($resultUpdateContacts);
pg_free_result($resultUpdateContacts);
pg_close($dbconn);
echo '<script>document.location.replace("manager.php");</script>';
?>
