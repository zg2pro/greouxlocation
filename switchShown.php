<?php

$dbconn = pg_connect("host=localhost dbname=greouxlocation user=greouxlocation password=uqbdzhp")
    or die('Connexion impossible : ' . pg_last_error());

if ($bool == 'f'){
$query = "UPDATE advertisements SET shown='true' WHERE shown='false' AND id_ad = $id";
echo "OPERATION EFFECTUEE : publicite affichee";
}
else {
$query = "UPDATE advertisements SET shown='false' WHERE shown='true' AND id_ad = $id";
echo "OPERATION EFFECTUEE : publicite cachee";
}

$result = pg_query($query) or die('Échec requête : ' . pg_last_error());
$line = pg_fetch_array($result, null, PGSQL_ASSOC);


pg_free_result($result);
pg_close($dbconn);

echo "<META http-equiv='refresh' content='3; URL=manager.php'>";

?>
