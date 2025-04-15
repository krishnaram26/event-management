<?php
require_once 'php/config.php';

// Check if events table exists
try {
    $stmt = $pdo->query("SHOW TABLES LIKE 'events'");
    $tableExists = $stmt->rowCount() > 0;
    
    echo "<h2>Database Check Results</h2>";
    
    if (!$tableExists) {
        echo "<p>Error: 'events' table does not exist!</p>";
    } else {
        echo "<p>'events' table exists.</p>";
        
        // Check events in the database
        $stmt = $pdo->query("SELECT id, name FROM events ORDER BY id");
        $events = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo "<h3>Events in database:</h3>";
        echo "<ul>";
        foreach ($events as $event) {
            echo "<li>ID: {$event['id']} - {$event['name']}</li>";
        }
        echo "</ul>";
        
        // Check if registrations table exists and its structure
        $stmt = $pdo->query("SHOW TABLES LIKE 'registrations'");
        $regTableExists = $stmt->rowCount() > 0;
        
        if (!$regTableExists) {
            echo "<p>Error: 'registrations' table does not exist!</p>";
        } else {
            echo "<p>'registrations' table exists.</p>";
            
            // Check registrations table structure
            $stmt = $pdo->query("SHOW CREATE TABLE registrations");
            $tableInfo = $stmt->fetch(PDO::FETCH_ASSOC);
            
            echo "<h3>Registrations table structure:</h3>";
            echo "<pre>" . htmlspecialchars($tableInfo['Create Table']) . "</pre>";
            
            // Check existing registrations
            $stmt = $pdo->query("SELECT event_id, COUNT(*) as count FROM registrations GROUP BY event_id");
            $registrations = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            echo "<h3>Existing registrations by event ID:</h3>";
            if (count($registrations) > 0) {
                echo "<ul>";
                foreach ($registrations as $reg) {
                    echo "<li>Event ID: {$reg['event_id']} - Count: {$reg['count']}</li>";
                }
                echo "</ul>";
            } else {
                echo "<p>No registrations found.</p>";
            }
        }
    }
} catch(PDOException $e) {
    echo "<p>Error: " . $e->getMessage() . "</p>";
}
?>

<p><a href="index.html">Return to homepage</a></p>