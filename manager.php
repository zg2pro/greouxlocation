<?php

header("Cache-Control: no-cache, must-revalidate"); 

?> 

<html>
  <head>
    <title>MANAGER</title>


<meta http-equiv="expires" content="0">
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache, must-revalidate"> 
	<link href="styles.css" rel="stylesheet" type="text/css"/>
  </head>
  <body>

<br/>
<u><b>publicites :</b></u>
<br/>

<?php
require_once 'dbPassword.php';

$dbconn = pg_connect("host=localhost dbname=greouxlocation user=greouxlocation password="+$dbPassword)
    or die('Connexion impossible : ' . pg_last_error());
$query = 'SELECT * FROM advertisements';
$result = pg_query($query) or die('Échec requête : ' . pg_last_error());

echo "<table>";
while ($line = pg_fetch_array($result, null, PGSQL_ASSOC)) {
$buttonName = $line[id_ad];
echo "<tr><td>$buttonName</td>";
echo "<td>$line[description]</td><td>";
/*echo $buttonName.del;*/
echo "<input type=\"button\" name=\"$buttonName\" value=\"";
if ($line['shown'] == 't') echo "Cacher"; else echo "Afficher";
echo "\" onclick=\"self.location.href='switchShown.php?bool=$line[shown]&id=$buttonName'\" />";
echo "</td></tr>";
}
echo "</table>";

pg_free_result($result);
pg_close($dbconn);

?>
<br/><br/>
<form action="newAd.php" method="post">
Nouvelle publicite: <input name="input" size="30" maxlength="20" value="nom identifiant la publicite"/>
<textarea name="textarea" rows="10" cols="50">
Copiez collez le code de votre partenaire ici
</textarea>
<input type="submit" value="Enregistrer"/>
</form>

<br/><br/>
<u><b>reservations :</b></u>
<br/>

<?php

$dbconn = pg_connect("host=localhost dbname=greouxlocation user=greouxlocation password="+$dbPassword)
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

$dbconn = pg_connect("host=localhost dbname=greouxlocation user=greouxlocation password="+$dbPassword)
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

?><br/><br/>

<u><b>Coordonn&eacute;es :</b></u>
<br/>

<?php
$categories = array( "Adresse"
                , "Mail"
                , "Telephone"
                );
$k = 0;

$dbconn = pg_connect("host=localhost dbname=greouxlocation user=greouxlocation password="+$dbPassword)
    or die('Connexion impossible : ' . pg_last_error());
$query = 'SELECT * FROM contacts ORDER BY type';
$result = pg_query($query) or die('Échec requête : ' . pg_last_error());

echo "<table id=\"contactsTab\" border=\"2\">";
while ($line = pg_fetch_array($result, null, PGSQL_ASSOC)) {
echo "<tr><TD class=\"category\">";
echo $categories[$k];
$k = $k + 1;
echo "</TD><form action=\"changeContact.php\" method=\"post\"><TD class=\"value\">";
echo "<textarea name=value rows='7' cols='30'>".$line['text']."</textarea>";
echo "</TD><td><input type=\"hidden\" name=\"chg\" value=\"$k\" /><input type=\"submit\" name=\"button\" value=\"changement\" /></td></form></tr>";
}
echo "</table>";

pg_free_result($result);
pg_close($dbconn);

?>
</body>
</html>
