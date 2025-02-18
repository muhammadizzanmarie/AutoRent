<?php
include '../db.php';
header('Content-Type: application/json');
session_start();

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["status" => "error", "message" => "Anda harus login terlebih dahulu."]);
    exit();
}

$user_id = $_SESSION['user_id'];

$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    echo json_encode(["status" => "error", "message" => "Data tidak valid atau format JSON salah."]);
    exit();
}

$nama = mysqli_real_escape_string($koneksi, $input['nama']);
$alamat = mysqli_real_escape_string($koneksi, $input['alamat']);
$no_telepon = mysqli_real_escape_string($koneksi, $input['no_telepon']);
$instansi = mysqli_real_escape_string($koneksi, $input['instansi']);
$nik = mysqli_real_escape_string($koneksi, $input['nik']);
$kendaraan = mysqli_real_escape_string($koneksi, $input['kendaraan']);
$kondisi_kendaraan = mysqli_real_escape_string($koneksi, $input['kondisi_kendaraan']);
$bensin_awal = intval($input['bensin_awal']);
$sisa_etol = intval($input['sisa_etol']);
$tanggal_pengembalian = date('Y-m-d', strtotime($input['tanggal_pengembalian']));

// Cek apakah NIK sudah ada di database
$cek_nik = "SELECT * FROM peminjamankendaraan WHERE nik = '$nik'";
$result = mysqli_query($koneksi, $cek_nik);
if (mysqli_num_rows($result) > 0) {
    echo json_encode(["status" => "error", "message" => "NIK sudah digunakan."]);
    exit();
}

// Insert ke database
$query = "INSERT INTO peminjamankendaraan 
          (user_id, nama, alamat, no_telepon, instansi, nik, kendaraan, kondisi_kendaraan, bensin_awal, sisa_etol, tanggal_pengembalian) 
          VALUES ('$user_id', '$nama', '$alamat', '$no_telepon', '$instansi', '$nik', '$kendaraan', '$kondisi_kendaraan', '$bensin_awal', '$sisa_etol', '$tanggal_pengembalian')";

if (mysqli_query($koneksi, $query)) {
    echo json_encode(["status" => "success", "message" => "Peminjaman berhasil dibuat."]);
} else {
    echo json_encode(["status" => "error", "message" => "Gagal membuat peminjaman: " . mysqli_error($koneksi)]);
}
?>
