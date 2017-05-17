<?php

    // fonctions utiles, $valeur représente une date au format AAAA-MM-JJ
     function getSecond($valeur) {
          return substr($valeur, 17, 2);
     }

     function getMinute($valeur) {
          return substr($valeur, 14, 2);
     }

     function getHour($valeur) {
          return substr($valeur, 11, 2);
     }

     function getDay($valeur)     {
          return substr($valeur, 8, 2);
     }

     function getMonth($valeur)     {
          return substr($valeur, 5, 2);
     }

     function getYear($valeur) {
          return substr($valeur, 0, 4);
     }

     function monthNumToName($mois) {
          $tableau = Array("", "Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre");
          return (intval($mois) > 0 && intval($mois) < 13) ? $tableau[intval($mois)] : "Cliquez sur Consulter";
     }
?>
