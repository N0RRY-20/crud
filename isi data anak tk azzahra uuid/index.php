<?php
// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Koneksi ke database
$conn = mysqli_connect("localhost", "root", "", "api-belajar");

// Ambil data dari fetch (JSON)
$input = file_get_contents("php://input");
$data = json_decode($input, true); // decode ke array asosiatif

$response = [];

if ($data && isset($data['nama']) && isset($data['kelas'])) {
    $nama = mysqli_real_escape_string($conn, $data['nama']);
    $kelas = mysqli_real_escape_string($conn, $data['kelas']);

    $query = "INSERT INTO pegawai (nama, email) VALUES ('$nama', '$kelas')";
    $result = mysqli_query($conn, $query);

    if ($result) {
        $response['status'] = "success";
        $response['message'] = "Data berhasil disimpan";
    } else {
        $response['status'] = "error";
        $response['message'] = "Gagal menyimpan data";
    }
} else {
    $response['status'] = "error";
    $response['message'] = "Data tidak lengkap atau format salah";
}





// 🔥 Hanya 1x echo JSON
echo json_encode($response);
