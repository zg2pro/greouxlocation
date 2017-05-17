<html>
<body>
  <head>
	<title>Contact</title>
	<meta content="text/html; charset=UTF-8" http-equiv="content-type">  
	<link href="styles.css" rel="stylesheet" type="text/css"/>
  </head>
<body>


<table id="TitleTable">
  <tbody>
    <tr>
      <td class="img"><img src="ind_sight_of_greoux.jpg" style="width: 105%;"></td>
      <td class="txt">Contact</td>
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
		<?php
		$month = date("n");
		$year = date("Y");
		echo "<a href=\"fares.php?month=$month&year=$year\">Tarifs pour l'ann&eacute;e $year et disponibilit&eacute;s</a> <br/>";	?>
	</TD></tr>
</tbody>
</table>
<br/><br/><br/><br/>

<table align="center">
  <tbody>
    <tr>
      <td class="category"><img src="contact_telephone.png"/></td>
      <td class="contacts"><u>Par t&eacute;l&eacute;phone :</u><br/>
	  <?php
	  $dbconn = pg_connect("host=localhost dbname=greouxlocation user=greouxlocation password=uqbdzhp")
		or die('Connexion impossible : ' . pg_last_error());
		$query = "SELECT * FROM contacts WHERE type = 'TELEPHONE'";
		$result = pg_query($query) or die('Échec requête : ' . pg_last_error());
		echo nl2br(pg_fetch_result($result, 0, 'text'));
	  ?>
	  </td>
    </tr>
    <tr>
      <td class="category"> <img src="contact_email.png"></td>
      <td class="contacts"><u>Par Mail :</u><br/>
	  <?php
	  $query = "SELECT * FROM contacts WHERE type = 'MAIL'";
		$result = pg_query($query) or die('Échec requête : ' . pg_last_error());
		$email = pg_fetch_result($result, 0, 'text');
	  ?>
      <a href="mailto:<?php echo $email ?>"><?php echo $email ?></a></td>
    </tr>
    <tr>
      <td class="category"><img src="contact_courrier.png"/></td>
      <td class="contacts"><u>Par Courrier :</u><br/>
	  <?php
	  $query = "SELECT * FROM contacts WHERE type = 'ADRESSE'";
		$result = pg_query($query) or die('Échec requête : ' . pg_last_error());
		echo nl2br(pg_fetch_result($result, 0, 'text'));
		
		
pg_free_result($result);
pg_close($dbconn);
	  ?></td>
    </tr>
  </tbody>
</table>
<br/><br/>

</body>

</html>
