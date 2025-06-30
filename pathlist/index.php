<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

$conn = mysqli_connect("localhost", "root", "", "tk_azzhara_pku");

// Ambil input JSON
$input = file_get_contents("php://input");
$data = json_decode($input, true);

// Method handler
$method = $_SERVER["REQUEST_METHOD"];

if ($method === "GET") {
    $QSquery = mysqli_query($conn, "SELECT * FROM test");
    $allData = [];

    while ($row = mysqli_fetch_assoc($QSquery)) {
        $allData[] = $row;
    }

    echo json_encode($allData);
    exit;
}

if ($method === "POST") {
    $id = $data["id"] ?? null;
    $nama = $data["nama"] ?? null;
    $kelas = $data["kelas"] ?? null;

    if ($id && $nama && $kelas) {
        mysqli_query($conn, "UPDATE test SET kelas='$kelas', nama='$nama' WHERE id='$id'");
        echo json_encode(["status" => "success", "message" => "Data updated"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid data"]);
    }
    exit;
}

// if ($method === "DELETE") {
//     $data = json_decode(file_get_contents("php://input"), true);
//     $id = $data['id'] ?? null;

//     if ($id) {
//         // JANGAN konversi ke int karena UUID adalah string
//         $id = mysqli_real_escape_string($conn, $id);
//         $query = mysqli_query($conn, "DELETE FROM test WHERE id = '$id'");

//         if ($query) {
//             echo json_encode(["status" => "success", "message" => "Data deleted"]);
//         } else {
//             echo json_encode(["status" => "error", "message" => "Query gagal"]);
//         }
//     } else {
//         echo json_encode(["status" => "error", "message" => "ID tidak ditemukan"]);
//     }
//     exit;
// }

if ($method === "DELETE") {
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data['id'] ?? null;

    if ($id) {
        $id = mysqli_real_escape_string($conn, $id);
        mysqli_query($conn, "DELETE FROM test WHERE id = '$id'");
        echo json_encode(["status" => "success", "message" => "Data deleted"]);
    } else {
        echo json_encode(["status" => "error", "message" => "ID not found"]);
    }
    exit;
}
