<?php

require_once '../resources/security/key.php';

require_once '../../../vendor/autoload.php';


define('APPLICATION_NAME', 'greouxlocation');
define('CLIENT_SECRET_PATH', './../resources/security/oauth.client.ids.json');
define('CREDENTIALS_PATH', '~/.credentials/sheets.googleapis.com-php-quickstart.json');
// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/sheets.googleapis.com-php-quickstart.json
define('SCOPES', implode(' ', array(
    Google_Service_Sheets::SPREADSHEETS_READONLY)
));

/**
 * Returns an authorized API client.
 * @return Google_Client the authorized client object
 */
function getClient($greouxlocation_api_key, $greouxlocation_key) {
    $client = new Google_Client();
    $client->setApplicationName(APPLICATION_NAME);

    $client->setScopes(SCOPES);
//    $client->setDeveloperKey($greouxlocation_api_key);

    $client->setAuthConfig(CLIENT_SECRET_PATH);

    //$client->setRedirectUri("http://127.0.0.1/");
    $client->setAccessType('offline');
    $client->setApprovalPrompt('force');
    // Load previously authorized credentials from a file.
    $credentialsPath = expandHomeDirectory(CREDENTIALS_PATH);
    if (file_exists($credentialsPath)) {
        $accessToken = json_decode(file_get_contents($credentialsPath), true);
    } else {
        // Request authorization from the user.
        $authUrl = $client->createAuthUrl();
//        printf("Open the following link in your browser:\n%s\n", $authUrl);
//        print 'Enter verification code: ';
        $authCode = trim($greouxlocation_key);

        // Exchange authorization code for an access token.
        $accessToken = $client->fetchAccessTokenWithAuthCode($authCode);

        // Store the credentials to disk.
        if (!file_exists(dirname($credentialsPath))) {
            mkdir(dirname($credentialsPath), 0700, true);
        }
        file_put_contents($credentialsPath, json_encode($accessToken));
        printf("Credentials saved to %s\n", $credentialsPath);
    }
    $client->setAccessToken($accessToken);

    // Refresh the token if it's expired.
    if ($client->isAccessTokenExpired()) {
        $client->fetchAccessTokenWithRefreshToken($client->getRefreshToken());
        file_put_contents($credentialsPath, json_encode($client->getAccessToken()));
    }
    return $client;
}

/**
 * Expands the home directory alias '~' to the full path.
 * @param string $path the path to expand.
 * @return string the expanded path.
 */
function expandHomeDirectory($path) {
    $homeDirectory = getenv('HOME');
    if (empty($homeDirectory)) {
        $homeDirectory = getenv('HOMEDRIVE') . getenv('HOMEPATH');
    }
    return str_replace('~', realpath($homeDirectory), $path);
}

// Get the API client and construct the service object.
$client = getClient($greouxlocation_api_key, $greouxlocation_key);
$service = new Google_Service_Sheets($client);

$spreadsheetId = $greouxlocation_doc;
$range = 'fares!A2:C';
$response = $service->spreadsheets_values->get($spreadsheetId, $range);
$values = $response->getValues();

$jsonObj = [];
foreach ($values as $row) {
    $jsonItem = array(
        "french" => $row[0],
        "english" => $row[1],
        "value" => $row[2]
    );
    array_push($jsonObj, $jsonItem);
}
print json_encode($jsonObj);
?>
