<html>
  <head>
	<title>Conditions - R&eacute;servation</title>
	<meta content="text/html; charset=UTF-8" http-equiv="content-type">  
	<link href="styles.css" rel="stylesheet" type="text/css"/>
  </head>

<body>
<table id="TitleTable">
  <tbody>
    <tr>
      <td class="img"><img src="ind_sight_of_greoux.jpg" style="width: 105%;"></td>
      <td class="txt">Conditions - R&eacute;servation</td>
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
	</td><td>
		<?php
		$month = date("n");
		$year = date("Y");
		echo "<a href=\"fares.php?month=$month&year=$year\">Tarifs pour l'ann&eacute;e $year et disponibilit&eacute;s</a> <br/>";	?>
	</TD></tr>
</tbody>
</table>

<br/><br/><br/>

<ul>
	<li> A la r&eacute;servation, 25% du montant de la location </li><br/><br/>
	<li>A l'arriv&eacute;e, un &eacute;tat des lieux sera fait. Une liste de l'agencement vous sera remis et un ch&egrave;que de caution de 250 euros vous sera demand&eacute; mais ne sera pas encaiss&eacute; et il vous sera restitu&eacute; &agrave; votre d&eacute;part si tout est conforme.</li><br/><br/>
	<li>Une taxe de s&eacute;jour per&ccedil;ue par la mairie par personne sera en suppl&eacute;ment des tarifs indiqu&eacute;s.</li><br/><br/>
	<li>Nos amies les b&ecirc;tes ne sont pas accept&eacute;es dans ce studio</li><br/><br/>
	<li>Toute semaine entam&eacute;e est enti&egrave;rement d&ucirc;e</li><br/><br/>
	<li>Le m&eacute;nage est fait &agrave; votre arriv&eacute;e</li><br/><br/>
</ul>

<h1>
Pour r&eacute;server, il suffit de remplir le formulaire en ligne, avec vos coordonn&eacute;es.<br/>
Vous t&eacute;l&eacute;chargerez un formulaire au format pdf <br/>que vous devez imprimer,
nous renvoyer rempli et sign&eacute;.<br/> Votre r&eacute;servation sera d&eacute;finitive en joignant
&agrave; ce formulaire un ch&egrave;que<br/> de 25% du montant  de la location.
</h1>
<div align="left">Si vous ne poss&eacute;dez pas d'imprimante, je peux vous faire parvenir ce formulaire apr&egrave;s m'avoir contact&eacute;</div>

<br/>
<br/><br/>
<h1 style="font-size : 25px; ">
<a href="Form.pdf">Formulaire de R&eacute;servation</a>
</h1>
<div align="right"><a href="http://www.adobe.com/fr/products/acrobat/readstep2.html">Installer Adobe Acrobat Reader pour lire le pdf</a></div>

</body>
</html>