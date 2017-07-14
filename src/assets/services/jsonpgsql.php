<?php

require_once '../security/key.php';

function pgjson ($q){
    $dbconn = pg_connect("host=localhost dbname=greouxlocation user=greouxlocation password=".BASE_PWD)
        or die('Connexion impossible : ' . pg_last_error());
    $result = pg_query($q) or die('Échec requête : ' . pg_last_error());

    $rows = array();
    while($r = pg_fetch_assoc($result)) {
        $rows[] = $r;
    }

    pg_free_result($result);
    pg_close($dbconn);

    return json_encode($rows);
}

?>
