<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Koneksi ke database
$conn = mysqli_connect("localhost", "root", "", "tk_azzhara_pku");

$QSquery = mysqli_query($conn, "SELECT * FROM test");
$allData = [];

while ($row = mysqli_fetch_assoc($QSquery)) {
    $allData[] = $row;
}

$input = file_get_contents("php://input");
$data = json_decode($input, true);
$id = isset($data["id"]) ? $data["id"] : null;
$nama = isset($data["nama"]) ? $data["nama"] : null;
$kelas = isset($data["kelas"]) ? $data["kelas"] : null;

if (isset($nama, $kelas)) {

    mysqli_query($conn, "UPDATE test SET kelas='$kelas', nama='$nama' WHERE id='$id'");
}


echo json_encode($allData);
