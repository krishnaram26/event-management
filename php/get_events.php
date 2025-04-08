<?php
require_once 'config.php';

try {
    $stmt = $pdo->query("SELECT id, name, description, date, time, venue, price, coordinators FROM events WHERE id = 2");
    $event = $stmt->fetch(PDO::FETCH_ASSOC);
    
    // Format the data
    $event['short_description'] = strlen($event['description']) > 100 ? 
                                 substr($event['description'], 0, 100) . '...' : 
                                 $event['description'];
    
    echo json_encode($event);
} catch(PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
?>