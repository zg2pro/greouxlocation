<?php

if (function_exists("pg_connect")) {
    require_once 'jsonpgsql.php';
    print pgjson("SELECT * FROM fares ORDER BY num");
} else {
    //mock
    print '[{"category":"basse","value":"170","num":"1"},{"category":"moyenne","value":"190","num":"2"},{"category":"haute","value":"220","num":"3"},{"category":"Taxes_de_sejour","value":"40","num":"4"}]';
}
?>
