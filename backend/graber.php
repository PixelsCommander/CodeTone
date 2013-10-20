<?php
    /* gets the data from a URL */
    function get_data($url) {
        $ch = curl_init();
        $timeout = 5;
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
        $data = curl_exec($ch);
        curl_close($ch);
        return $data;
    }

    if (!empty($_GET['grabURL'])){
        echo get_data($_GET['grabURL']);
    } else {
        echo ('ERROR: grabURL parameter was not specified');
    }
?>