<?php
	header('Content-Type: application/json');
	$data = json_decode(file_get_contents("php://input"));

	if (isset($data->email)) {
	    $email = filter_var($data->email, FILTER_SANITIZE_EMAIL);
	    echo json_encode(['message' => 'Email submitted successfully: ' . $email]);
	} else {
	    echo json_encode(['message' => 'Email is required']);
	}
?>
