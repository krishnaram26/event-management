<?php
session_start();
if (!isset($_SESSION['admin_authenticated'])) {
    header('Location: ../admin.html');
    exit;
}
require_once 'config.php';

// Fetch registrations with event details
$query = "SELECT r.*, e.name as event_name 
          FROM registrations r 
          JOIN events e ON r.event_id = e.id 
          ORDER BY r.registration_date DESC";
$stmt = $pdo->prepare($query);
$stmt->execute();
$registrations = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - Evendz</title>
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/admin-panel.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <nav>
        <div class="logo">Evendz</div>
        <div class="nav-links">
            <a href="../index.html">Home</a>
            <a href="#" class="active">Admin Dashboard</a>
            <a href="logout.php">Logout</a>
        </div>
    </nav>

    <main>
        <h1>Admin Dashboard</h1>
        <h2>Welcome, <?php echo strtoupper($_SESSION['college']); ?></h2>

        <div class="admin-container">
            <div class="registrations-section">
                <h3><i class="fas fa-list"></i> Recent Registrations</h3>
                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Reg No</th>
                                <th>Event</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>College</th>
                                <th>Registration Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php if (empty($registrations)): ?>
                                <tr>
                                    <td colspan="7" class="no-data">No registrations found</td>
                                </tr>
                            <?php else: ?>
                                <?php foreach ($registrations as $reg): ?>
                                    <tr>
                                        <td><?php echo htmlspecialchars($reg['name']); ?></td>
                                        <td><?php echo htmlspecialchars($reg['regno']); ?></td>
                                        <td><?php echo htmlspecialchars($reg['event_name']); ?></td>
                                        <td><?php echo htmlspecialchars($reg['email']); ?></td>
                                        <td><?php echo htmlspecialchars($reg['phone']); ?></td>
                                        <td><?php echo htmlspecialchars($reg['college']); ?></td>
                                        <td><?php echo date('d M Y, H:i', strtotime($reg['registration_date'])); ?></td>
                                    </tr>
                                <?php endforeach; ?>
                            <?php endif; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </main>
</body>
</html>