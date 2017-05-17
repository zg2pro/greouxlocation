<html>
  <head>
	<!--title>Dispos</title-->
	<meta content="text/html; charset=UTF-8" http-equiv="content-type">  
	<link href="calendar.css" rel="stylesheet" type="text/css"/>
  </head>
<body>


<?php

//calcule le jour de la semaine pour premier jour.
$firstDay=date("w", mktime(0,0,0,$month,1,$year));
if ($firstDay==0) {$firstDay=7;}
compute_nb_of_days();

$monthe=array("Janvier","Fevrier","Mars","Avril","Mai","Juin","Juillet","Aout", "Septembre","Octobre","Novembre","Decembre");

echo "<form action=\"fares.php\" method=\"post\"><table><tr><td><input type=\"submit\" value=\"-\" name=\"op\" /><input type=\"hidden\" value=\"$month\" name=\"month\" /><input type=\"hidden\" value=\"$year\" name=\"year\" /></td><td>";
$mois = $monthe[$month-1];
echo "</td><td>";
echo "$mois";
echo "</td><td>";
echo "$year";
echo "</td><td><input type=\"submit\" value=\"+\"  name=\"op\" /></td></tr></table></form>";


function compute_nb_of_days(){
	global $month;
	global $year;
	global $nbOfDays;
	if($month == 2 && $year%4 == 0) $nbOfDays = 29;
	else {
		if($month == 1 || $month == 3 || $month == 5 || $month == 7 || $month == 8 || $month == 10 || $month == 12) $nbOfDays = 31;
		else {
			if($month == 2) $nbOfDays = 28;
			else $nbOfDays = 30;
		}
	}
}//compute


function check_day($current_date) {
	$dbconn = pg_connect("host=localhost dbname=greouxlocation user=greouxlocation password=uqbdzhp")
    or die('Connexion impossible : ' . pg_last_error());
$query = "SELECT count(*) as nb FROM bookings WHERE $current_date >= check_in AND $current_date <= check_out";
$result = pg_query($query) or die('Échec requête : ' . pg_last_error());
$line = pg_fetch_assoc($result);
$res= $line['nb'];
pg_free_result($result);
pg_close($dbconn);
return $res;
}//function




function display_calendar(){

global $month;
global $year;
global $firstDay;
global $nbOfDays;
global $monthe;

echo"<table id=\"calendar\">\n
<tr>\n<td>Lu</td><td>Ma</td><td>Me</td><td>Je</td><td>Ve</td><td>Sa</td><td>Di</td></tr>\n<tr>\n";


$i=1;while ($i<$firstDay) {
	echo "<td>&nbsp;</td>";
	$i++; 
}


$i=1;
while ($i<=$nbOfDays){
	$weekDay=($i+$firstDay-1)%7;
	$date_to_check = "'$year-$month-$i'";
	if (check_day($date_to_check)>0) {echo"<td class='busy'>";}
	else echo"<td class='available'>";
	echo "$i";
	echo"</td>\n";
	if ($weekDay==0) { echo "</tr>\n<tr>\n"; }
	$i++;
}
echo"</tr></td></table>\n";

}

display_calendar();

?>

</body>
</html>
