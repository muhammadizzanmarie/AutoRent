<?php
include '../db.php';

if ($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['id'])) {
    $id = intval($_GET['id']);

    $query = "SELECT * FROM peminjamankendaraan WHERE id='$id'";
    $result = mysqli_query($koneksi, $query);

    if ($row = mysqli_fetch_assoc($result)) {
        echo json_encode($row);
    } else {
        echo json_encode(["status" => "error", "message" => "Data tidak ditemukan."]);
    }
}
?>
