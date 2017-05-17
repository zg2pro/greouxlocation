<html>
  <head>
	<title>Visite du Studio</title>
	<meta content="text/html; charset=UTF-8" http-equiv="content-type">  
	<link href="styles.css" rel="stylesheet" type="text/css"/>
  </head>
<body>


<table id="TitleTable">
  <tbody>
    <tr>
      <td class="img"><img src="ind_sight_of_greoux.jpg" style="width: 105%;"></td>
      <td class="txt">Visite du Studio</td>
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
		<?php
		$month = date("n");
		$year = date("Y");
		echo "<a href=\"fares.php?month=$month&year=$year\">Tarifs pour l'ann&eacute;e $year et disponibilit&eacute;s</a> <br/>";	?>
	</td><td>
		<a href="contact.php">Contact</a>
	</TD></tr>
</tbody>
</table>

<br/><br/><br/>



<br/>
<table id="photos">
  <tbody>
    <tr>
      <td><a href="visite/IM000521.JPG"><img src="visite/mini/IM000521.JPG"/></a></td>
      <td><a href="visite/IM000523.JPG"><img  src="visite/mini/IM000523.JPG"/></a></td>
    </tr>
</table>
<table id="photos">
  <tbody>
    <tr>
      <td><a href="visite/im000066.jpg"><img  src="visite/mini/im000066.jpg"/></a></td>
      <td><a href="visite/im000058.jpg"><img  src="visite/mini/im000058.jpg"/></a></td>
      <td><a href="visite/im000060.jpg"><img  src="visite/mini/im000060.jpg"/></a></td>
    </tr>
  </tbody>
</table>
<table id="photos">
    <tr>
      <td><a href="visite/im000044.jpg"><img  src="visite/mini/im000044.jpg"/></a></td>
      <td><a href="visite/im000043.jpg"><img  src="visite/mini/im000043.jpg"/></a></td>
    </tr>
    <tr>
      <td><a href="visite/im000057.jpg"><img src="visite/mini/im000057.jpg"/></a></td>
      <td><a href="visite/im000069.jpg"><img src="visite/mini/im000069.jpg"/></a></td>
    </tr>
  </tbody>
</table>

</body>
</html>