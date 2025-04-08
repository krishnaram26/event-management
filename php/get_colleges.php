<?php
require_once 'config.php';
header('Content-Type: application/json');

try {
    $stmt = $pdo->query("SELECT * FROM colleges");
    $colleges = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($colleges);
} catch(PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>