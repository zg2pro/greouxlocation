 <?php

echo <<<FORMULAIRE
<br /><br /><br />
<form name="chercher" method="post" action="calendrier.inc.php">
		mois :
		<select name="mois">
			<option value="01">Janvier</option>
			<option value="02">Fevrier</option>
			<option value="03">Mars</option>
			<option value="04">Avril</option>
			<option value="05">Mai</option>
			<option value="06">Juin</option>
			<option value="07">Juillet</option>
			<option value="08">Aout</option>
			<option value="09">Septembre</option>
			<option value="10">Octobre</option>
			<option value="11">Novembre</option>
			<option value="12">Decembre</option>
		</select>
		annee :
		<select name="annee">
			<option value="2007" selected>2007</option>
			<option value="2008">2008</option>
			<option value="2009">2009</option>
		</select>
	<input type="submit" value="Consulter" />
</form>
FORMULAIRE;

$periode = $_POST['annee'];
$mois = $_POST['mois'];
$periode .= "-";
$periode .= $mois;
echo "\n \n";
/*
function fillACase ($jour, $busy){
	if ($busy == 1)
		echo '<div align="right">'.$jour.'</div>';
	else echo $jour;
}
*/
 // Fonction pour afficher le calendrier
     function showCalendar($periode) {

 include 'string.inc.php';

//$periode = "2007-4";
$mois = monthNumToName(getMonth($periode));
$annee = getYear($periode);
          // Affichage du mois et de l'année
          echo "\n\t<h2>&raquo; " . $mois . " " . $annee . "</h2>";

$nb_jour = Date("t", mktime(0, 0, 0, getMonth($periode), 1, getYear($periode)));
// tableau des jours de la semaine
$joursem = array('dim', 'lun', 'mar', 'mer', 'jeu', 'ven', 'sam');
// calcul du timestamp
$timestamp = mktime (0, 0, 0, getMonth($periode), 1, $annee);
// affichage du jour de la semaine
$premier_jour_mois = date("w",$timestamp);

// on se connecte à pgSQL
$dbconn = pg_connect("host=sql.free.fr port=5432 dbname=greouxlocation user=greouxlocation password=uqbdzhp");

/*synthese des chaines de car pour la requete */
$fin = $annee .'-'.getMonth($periode).'-'.$nb_jour;
$debut = $annee .'-'.getMonth($periode).'-01';

// on crée la requête SQL
$sql = 'SELECT Arrivee, Depart, Client
FROM Location
WHERE Arrivee < '.$fin.'
OR Depart > '.$debut.';';
// on envoie la requête
$result = pg_query($sql) or die('Query failed: ' . pg_last_error());
while ($line = pg_fetch_array($result, null, PGSQL_ASSOC)) {
    foreach ($line as $col_value) {
		$donnees[] = $col_value;
	}	
}
// Free resultset
pg_free_result($result);
// on ferme la connexion à postgres
pg_close(); 

echo "ml78058fsfvfj\n";
echo $donnees[0];
for($i=0; $i<count($donnees); $i++) {
/*
if ($donnees[$i] > $fin) $donnees = $fin;
if ($donnees[$i] < $debut) $donnees = $debut;
*/
echo "mlfsfvfj";
echo " $donnees[$i]<br> ";
}

echo <<<TABLE
<table summary="vous ne supportez pas mon tableau" align="center" border="2" width="80%">
	<tbody> <tr>
		<td> Lundi  <td> Mardi <td>  Mercredi <td> Jeudi
 <td> Vendredi  <td> Samedi <td> Dimanche </tr> 
TABLE;

//pour la premiere semaine
$num = 1;
if ($premier_jour_mois == 0) $premier_jour_mois += 7;
echo "<tr>";
while ($index < $premier_jour_mois) {echo "<td>"; $index++;}
while ($index < 7) {echo $num; $num++; echo "<td>"; $index++;}
echo $num; $num++; echo "</tr>"; $index = 0;

//pour le reste du mois
while ($num < $nb_jour + 1) {
	echo "<tr>"; echo "<td>";
	while ($index < 6) {
		if ($num > $nb_jour) break;
		echo $num; $num++; echo "<td>"; $index++;
		}
	if ($num > $nb_jour) break;
	echo $num; $num++; echo "</tr>"; $index = 0;
}

     } //FONCTION


showCalendar($periode);


?>
