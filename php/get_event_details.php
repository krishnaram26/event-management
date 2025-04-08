<?php
require_once 'config.php';

if(isset($_GET['id'])) {
    $event_id = $_GET['id'];
    
    try {
        $stmt = $pdo->prepare("SELECT * FROM events WHERE id = ?");
        $stmt->execute([$event_id]);
        $event = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if($event) {
            echo json_encode([
                'status' => 'success',
                'data' => [
                    'name' => $event['name'],
                    'description' => $event['description'],
                    'date' => $event['date'],
                    'venue' => $event['venue'],
                    'price' => $event['price'],
                    'coordinators' => explode(',', $event['coordinators'])
                ]
            ]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Event not found']);
        }
    } catch(PDOException $e) {
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
}
?>