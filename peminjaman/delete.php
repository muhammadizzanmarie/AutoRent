<?php
include '../db.php';
header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['id'])) {
    echo json_encode(["status" => "error", "message" => "ID tidak ditemukan dalam request."]);
    exit();
}

$id = intval($input['id']);

// Cek apakah ID ada di database sebelum menghapus
$cek_id = "SELECT id FROM peminjamankendaraan WHERE id = '$id'";
$result = mysqli_query($koneksi, $cek_id);

if (mysqli_num_rows($result) == 0) {
    echo json_encode(["status" => "error", "message" => "ID peminjaman tidak ditemukan."]);
    exit();
}

// Hapus data
$query = "DELETE FROM peminjamankendaraan WHERE id='$id'";
if (mysqli_query($koneksi, $query)) {
    echo json_encode(["status" => "success", "message" => "Peminjaman berhasil dihapus."]);
} else {
    echo json_encode(["status" => "error", "message" => "Gagal menghapus peminjaman: " . mysqli_error($koneksi)]);
}
?>
