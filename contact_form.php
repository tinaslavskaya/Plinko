<?php 
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['name'], $data['email'], $data['subject'], $data['message'])) {
 
    $name = htmlspecialchars(trim($data['name']));
    $email = htmlspecialchars(trim($data['email']));
    $subject = htmlspecialchars(trim($data['subject']));
    $message = htmlspecialchars(trim($data['message']));

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['message' => 'Invalid format email']);
        exit;
    }

    echo json_encode(['message' => 'Form successfully submitted!']);
} else {
    echo json_encode(['message' => 'Please fill in all fields']);
}

?>