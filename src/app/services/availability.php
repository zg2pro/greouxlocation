<?php

if (function_exists("pg_connect")) {
    require_once 'jsonpgsql.php';
    if (!isset($HTTP_RAW_POST_DATA)) {
        $HTTP_RAW_POST_DATA = file_get_contents('php://input');
    }
    $data = json_decode($HTTP_RAW_POST_DATA);
    $begin_date = $data->begin;
    $end_date = $data->end;
    print pgjson("SELECT count(*) as nb FROM bookings WHERE '" . $begin_date . "' >= check_in AND '"
                    . $end_date . "' <= check_out");
} else {
    //mock
    print '{"nb":0}';
}
?>

