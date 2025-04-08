<?php
require_once 'config.php';

$query = "SELECT * FROM colleges";
$result = mysqli_query($conn, $query);

$colleges = array();
while($row = mysqli_fetch_assoc($result)) {
    $colleges[] = $row;
}

echo json_encode($colleges);
mysqli_close($conn);
?>