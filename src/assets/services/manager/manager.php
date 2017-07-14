<?php

header("Cache-Control: no-cache, must-revalidate"); 

?> 

<html>
  <head>
    <title>MANAGER</title>


<meta http-equiv="expires" content="0">
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache, must-revalidate"> 
 </head>
  <body>

<br/>

<?php
require_once '../../security/key.php';

?>
<u><b>reservations :</b></u>
<br/>

<?php
$str = "host=localhost dbname=greouxlocation user=greouxlocation password=".BASE_PWD;

$dbconn = pg_connect($str)
    or die('Connexion impossible : ' . pg_last_error());
$query = 'SELECT * FROM bookings ORDER BY check_in';
$result = pg_query($query) or die('Échec requête : ' . pg_last_error());

echo "<table><tr style=\"font-weight: bold;\"><td>Client</td><td>Check In</td><td>Check Out</td><td></td></tr>";
while ($line = pg_fetch_array($result, null, PGSQL_ASSOC)) {
$buttonName = $line[id_booking];
echo "<tr><td>$line[client]</td>";
echo "<td>$line[check_in]</td>";
echo "<td>$line[check_out]</td><td>";
/*echo $buttonName.del;*/
echo "<input type=\"button\" name=\"$id_book\" value=\"Annuler la reservation\" onclick=\"self.location.href='booking.php?mode=cancel&id=$buttonName'\" />";
echo "</td></tr>";
}

pg_free_result($result);
pg_close($dbconn);

echo "<tr><form action=\"booking.php\" method=\"post\"><td><input type=\"text\"  value=\"NomDeFamille\" name=\"client\" /></td><td><input name=\"check_in\" /></td><td><input name=\"check_out\" /></td>";
echo "<td><input type=\"submit\" name=\"add\" value=\"Ajouter une reservation\" /></td></form></tr></table>";

?><br/><br/>

<u><b>Tarifs :</b></u>
<br/>

<?php
$categories = array( "Basse Saison"
                , "Moyenne Saison <br/> (Avril / Mai / Juin)"
                , "Haute Saison<br/>
		(Juillet / Ao&ucirc;t<br/>
		Septembre / Octobre)"
		, "Taxes de Sejour (en centimes)"
                );
$k = 0;

$dbconn = pg_connect("host=localhost dbname=greouxlocation user=greouxlocation password=".BASE_PWD)
    or die('Connexion impossible : ' . pg_last_error());
$query = 'SELECT * FROM fares ORDER BY num';
$result = pg_query($query) or die('Échec requête : ' . pg_last_error());

echo "<table id=\"faresTab\" border=\"2\">";
while ($line = pg_fetch_array($result, null, PGSQL_ASSOC)) {
echo "<tr><TD class=\"category\">";
echo $categories[$k];
$k = $k + 1;
echo "</TD><form action=\"changePrice.php\" method=\"post\"><TD class=\"value\">";
echo "<input type=\"text\" name=value value=\"$line[value]\" />";
echo "</TD><td><input type=\"hidden\" name=\"chg\" value=\"$k\" /><input type=\"submit\" name=\"button\" value=\"changement\" /></td></form></tr>";
}
echo "</table>";

pg_free_result($result);
pg_close($dbconn);

?>
</body>
</html>
