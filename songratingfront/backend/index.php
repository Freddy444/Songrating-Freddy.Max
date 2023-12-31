<?php

	require "/Applications/XAMPP/xamppfiles/htdocs/Songrating-Freddy.Max/songratingfront/backend/config/boot.php";

	if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        header('Access-Control-Allow-Origin: http://localhost:3000');
        header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
		header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Headers: Content-Type, Custom-Header');
        header('Referrer-Policy: no-referrer');
        exit;
    }

	//CORS Header (NOT SECURE AS OF RIGHT NOW)
	header('Access-Control-Allow-Origin: http://localhost:3000');
	header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Custom-Header');
	header('Referrer-Policy: no-referrer-when-downgrade'); 

	$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
	$uri = explode( '/', $uri );

	if ((isset($uri[2]) && !($uri[2] == 'user' || $uri[2] == 'music')) || !isset($uri[3])) {
		header("HTTP/1.1 404 Not Found");
		echo "BAD 1";
		exit();
	}

	if($uri[2] == 'user') {
		require PROJECT_ROOT_PATH . "/Controller/UserController.php";
		$objFeedController = new UserController();
		$strMethodName = $uri[3] . 'Action';
		$objFeedController->{$strMethodName}();
	}

	else if ($uri[2] == 'music') {
		require PROJECT_ROOT_PATH . "/Controller/SongController.php";
		$objFeedController = new MusicController();
		$strMethodName = $uri[3] . 'Action';
		$objFeedController->{$strMethodName}();
	}


?>