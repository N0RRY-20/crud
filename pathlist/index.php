<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Koneksi ke database
$conn = mysqli_connect("localhost", "root", "", "api-belajar");

$QSquery = mysqli_query($conn, "SELECT * FROM pegawai");
$allData = [];

while ($row = mysqli_fetch_assoc($QSquery)) {
    $allData[] = $row;
}

echo json_encode($allData);
