<html>
  <head>
	<title>Tarifs (&agrave; la semaine)</title>
	<meta content="text/html; charset=UTF-8" http-equiv="content-type">  
	<link href="styles.css" rel="stylesheet" type="text/css"/>
	<link href="calendar.css" rel="stylesheet" type="text/css"/>
  </head>

<body>
<center>

<table id="TitleTable">
  <tbody>
    <tr>
      <td class="img"><img src="ind_sight_of_greoux.jpg" style="width: 105%;"></td>
      <td class="txt">Tarifs (&agrave; la semaine)</td>
    </tr>
  </tbody>
</table>

<table id="usefulLinks">
<tbody>
	<tr class="intern"><TD>
		<a href="index.php">Accueil</a>
	</td><td>
		<a href="countryside.php">Gr&eacute;oux les Bains et alentours</a>
	</td><td>
		<a href="visit.php">Visite du Studio</a>
	</td><td>
		<a href="contact.php">Contact</a>
	</TD></tr>
</tbody>
</table>

<br/><br/><br/>

Tarifs :
<table id="faresTab" border="2">
<tbody>
<?php
require_once 'dbPassword.php';

$dbconn = pg_connect("host=localhost dbname=greouxlocation user=greouxlocation password=".$dbPassword)
    or die('Connexion impossible : ' . pg_last_error());
$categories = array( "Basse Saison"
                , "Moyenne Saison <br/> (Avril / Mai / Juin)"
                , "Haute Saison<br/>
		(Juillet / Ao&ucirc;t<br/>
		Septembre / Octobre)"
                );
$k = 0;
$query = "SELECT * FROM fares ORDER BY num";
$result = pg_query($query) or die('Échec requête : ' . pg_last_error());
while ($line = pg_fetch_array($result, null, PGSQL_ASSOC)) {
$cat = $line[category];
if ($cat != "Taxes_de_sejour"){
echo "<tr><TD class=\"category\">";
echo $categories[$k];
$k = $k + 1;
echo "</TD><TD class=\"category\">";
echo "$line[value] €";
echo "</TD></tr>";
}
else $tax = $line[value];
}
pg_free_result($result);
pg_close($dbconn);
?>
</tbody>
</table>
<br/>
<u>En Sus :</u><br/>
<?php
echo "*Taxe de s&eacute;jour (environs ";
$tax = $tax / 100;
echo $tax;
echo " &#8364; /jour)<br/>";
?>
*EDF sur relev&eacute; de compteur.
<br/><br/>
<b><u>En option :</u><br/>
Pour quatre semaines de location une remise de 10% <br/>
est accord&eacute;e sur le montant du s&eacute;jour.</b>
<br/><br/>

<table id="usefulLinks" style="font-size:20px;">
<tbody>
	<tr class="intern"><TD>
		<a href="conditions.php">Acc&egrave;s aux conditions<br/>et au<br/>Formulaire de R&eacute;servation</a>
	</td></tr>
</tbody>
</table>

</center>
</body>

</html>
