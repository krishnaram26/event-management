<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $college = strtolower($_POST['college']);

    if ($username === 'admin' && $password === 'admin' && $college === 'srptc') {
        $_SESSION['admin_authenticated'] = true;
        $_SESSION['college'] = $college;
        header('Location: view_registrations.php');
        exit;
    } else {
        header('Location: ../admin.html?error=1');
        exit;
    }
}
?>