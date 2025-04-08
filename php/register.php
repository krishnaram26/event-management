<?php
require_once 'config.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

try {
    $data = [
        'regno' => $_POST['regno'],
        'name' => $_POST['name'],
        'email' => $_POST['email'],
        'phone' => $_POST['phone'],
        'college' => $_POST['college'],
        'event_id' => $_POST['event_id']
    ];

    $sql = "INSERT INTO registrations (regno, name, email, phone, college, event_id) 
            VALUES (:regno, :name, :email, :phone, :college, :event_id)";
    
    $stmt = $pdo->prepare($sql);
    $result = $stmt->execute($data);

    if ($result) {
        echo json_encode(['success' => true, 'message' => 'Registration successful']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Registration failed']);
    }
} catch(PDOException $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>