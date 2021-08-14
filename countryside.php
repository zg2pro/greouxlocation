<html>
  <head>
	<title>Gr&eacute;oux Les Bains</title>
	<meta content="text/html; charset=UTF-8" http-equiv="content-type">  
	<link href="styles.css" rel="stylesheet" type="text/css"/>
	<script src="http://maps.google.com/maps?file=api&amp;v=2&amp;key=ABQIAAAABjjGByyyXfo38_1VDCLDgRTBMp5ILzTtmXxZjAgwKwgcT0A7lxTLRES1-qBgzJ5xWYitSgr0JBXjKA"
      type="text/javascript">
	</script>
    	<script type="text/javascript">

    //<![CDATA[

    function load() {
      if (GBrowserIsCompatible()) {
          var map = new GMap2(document.getElementById("map"));
          map.setCenter(new GLatLng(43.770102, 5.873566), 12);
// "point" correspond aux coordonnées du marker
          var point = new GLatLng(43.770102, 5.873566);
       // Initialisation d'un nouvel objet GIcon et de ses propriétés
          var MonIcon = new GIcon(G_DEFAULT_ICON);
          MonIcon.shadow = "http://www.applications-google-maps.com/icones/Sujets/house-s.png"; // Image "Ombre"
          MonIcon.shadowSize=new GSize(56,32); // Dimensions de l'image "Ombre"
          MonIcon.iconSize=new GSize(32,32);
          MonIcon.iconAnchor=new GPoint(16,32);
          MonIcon.image="http://www.applications-google-maps.com/icones/Sujets/house.png";
// Affichage du marker (repère)
          var marker = new GMarker(point,MonIcon);
          map.addOverlay(marker);
          
// Affichage de la bulle d'information
          map.openInfoWindowHtml(point,
             "<h1>Studio &agrave; louer</h1>"
             +"Greoux les bains<br/> chemin de Sainte Annette");
          }//if

    }

    //]]>
    </script>

  </head>

  <body onload="load()" onunload="GUnload()">
<table id="TitleTable">
  <tbody>
    <tr>
      <td class="img"><img src="ind_sight_of_greoux.jpg" style="width: 105%;"></td>
      <td class="txt">Gr&eacute;oux Les Bains</td>
    </tr>
  </tbody>
</table>

<table id="usefulLinks">
<tbody>
	<tr class="intern"><TD>
		<a href="index.php">Accueil</a>
	</td><td>
		<?php
		$month = date("n");
		$year = date("Y");
		echo "<a href=\"fares.php?month=$month&year=$year\">Tarifs pour l'ann&eacute;e $year et disponibilit&eacute;s</a> <br/>";	?>
	</td><td>
		<a href="visit.php">Visite du Studio</a>
	</td><td>
		<a href="contact.php">Contact</a>
	</TD></tr>
</tbody>
</table>

<br/><br/><br/>

 <table id="transportMeans" border="2">
        <tbody>
          <tr>
            <td><img src="country_plane.gif"/></td>
            <td><big>Avion</big><br/>A&eacute;roport de Marseille-Marignane &agrave; 78 km</td>
          </tr>
          <tr>
            <td><img src="country_train.gif"/></td>
            <td><big>Train</big><br/>Gare de Manosque &agrave; 14 km</td>
          </tr>
          <tr>
            <td><img src="country_car.gif"/></td>
            <td><big>Route</big><br/>Autoroute du Sud, sortie Senas- autoroute
Aix/Manosque, sortie Gr&eacute;oux ou Manosque</td>
          </tr>
        </tbody>
</table>
<br/>
Au c&#339;ur des gorges du verdon, le lac de sainte-croix est &agrave; 23 km.<br/>
Aix en Provence est &agrave; 50 km

    <!--div id="map" style="width: 500px; height: 300px"></div-->
<br /><br />Outil pour plans et itin&eacute;raires : <br/>
  <!-- center> <div id="map" style="width: 70%; height: 80%"></div></center-->
 <iframe width="70%" height="80%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="http://maps.google.fr/maps?f=d&amp;hl=fr&amp;geocode=&amp;saddr=Chemin+de+Sainte-Annette,+04800+Gr%C3%A9oux-les-Bains&amp;daddr=&amp;mra=pr&amp;sll=43.770102,5.873566&amp;sspn=0.38874,0.922852&amp;ie=UTF8&amp;ll=43.770102,5.873566&amp;spn=0.38874,0.922852&amp;output=embed&amp;s=AARTsJrTLWLWMKcVQ4tAB20zIJURDyWQCA"></iframe>
<br />
<a href="http://maps.google.fr/maps?f=d&amp;hl=fr&amp;geocode=&amp;saddr=Chemin+de+Sainte-Annette,+04800+Gr%C3%A9oux-les-Bains&amp;daddr=&amp;mra=pr&amp;sll=43.770102,5.873566&amp;sspn=0.38874,0.922852&amp;ie=UTF8&amp;ll=43.770102,5.873566&amp;spn=0.38874,0.922852&amp;source=embed" style="color:#0000FF;text-align:left">Google Maps</a>

<br/><br/>

<table width=40% align="center">
<tr><TD>
<img src="country_map.jpg"/>
</TD></tr>
</table>
<br/>
<table width=95% align="center">
  <tbody>
    <tr>
      <td>
      <table width=100% align="center">
        <tbody>
          <tr>
            <td><img src="country_place.gif"/></td>
            <td><img src="country_village.gif"/></td>
          </tr>
        </tbody>
      </table>
      </td>
    </tr>
    <tr>
      <td><img src="country_verdon.gif"/></td>
    </tr>
  </tbody>
</table>

</body>
</html>