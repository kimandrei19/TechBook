<?php
header('Content-Type: application/json');
require_once 'db_connect.php';

$orderBy = "title ASC";

$sql = "SELECT * FROM books ORDER BY $orderBy";
$result = mysqli_query($conn, $sql);
$books = mysqli_fetch_all($result, MYSQLI_ASSOC);

mysqli_free_result($result);
mysqli_close($conn);

echo json_encode($books);