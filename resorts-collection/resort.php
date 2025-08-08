<?php
$res = $_GET['slug'] ?? '';

if (!$res) {
    http_response_code(404);
    echo "Resort not specified.";
    exit;
}

$url = "http://skylinebackend.local/get_resorts.php";
$jsonData = file_get_contents($url);
if ($jsonData === false) {
    die("Failed to fetch data");
}
$resorts = json_decode($jsonData, true);

if (!is_array($resorts)) {
    die("Invalid data");
}

function createSlug($string) {
    $res = strtolower($string);
    $res = preg_replace('/[^a-z0-9]+/', '-', $res);
    $res = trim($res, '-');
    return $res;
}

$resort = null;
foreach ($resorts as $r) {
    if (createSlug($r['name']) === $res) {
        $resort = $r;
        break;
    }
}

if (!$resort) {
    http_response_code(404);
    echo "Resort not found.";
    exit;
}
?>



<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="../fonts/stylesheet.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="stylesheet" href="resorts.css">
    <link rel="stylesheet" href="../similar.css">
    <meta charset="UTF-8" />
    <title><?php echo htmlspecialchars($resort['name']); ?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/x-icon" href="../imgs/logo2-crop.png">
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">
</head>
<body oncontextmenu="return false;">
    <!-- top part -->
    <header class="top">
        <!-- top part shi here -->
        <img class="top-logo" src="../logo/logo.png" alt="image">
        
        <section class="top-header-section">
            <a href="../">Home</a>
            <a style="color: rgb(90, 182, 151);" href="./">Resorts</a>
            <a href="../guest-houses/">Guest Houses</a>
            <a href="">About</a>
            <a href="">Reach Us</a>
        </section>
        <section class="top-header-buttonsection">
            <button id="booknowbutton" class="top-bookbutton">Book Now ></button>
        </section>  
        <section class="top-section-menu">
            <button id="menuopenorclose" class="buttonsformenu fa-solid fa-bars" onclick="topmenufunc()"></button>
            
        </section>     
        
    </header>
    <section id="idmenuforsmallwindow" class="menuforsmallwindow">
        <a href="../">Home</a>
        <a style="color: rgb(90, 182, 151);" href="">Resorts</a>
        <a href="../guest-houses/">Guest Houses</a>
        <a href="">About</a>
        <a href="">Reach Us</a>
    </section>

    

</body>

<script src="resorts.js"></script>
<script src="../similar.js"></script>

</html>