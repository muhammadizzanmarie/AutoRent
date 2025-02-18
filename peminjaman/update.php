<?php
header("Content-Type: application/json");
include '../db.php'; // Pastikan db.php sudah benar

// Pastikan hanya menerima request method PUT
if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
    exit();
}

// Ambil data JSON dari request body
$data = json_decode(file_get_contents("php://input"), true);

// Cek apakah data dikirim dengan benar
if (!isset($data['id'], $data['nama'], $data['alamat'], $data['no_telepon'], $data['kendaraan'], $data['bensin_awal'], $data['sisa_etol'], $data['tanggal_pengembalian'])) {
    echo json_encode(["status" => "error", "message" => "Data tidak lengkap"]);
    exit();
}

$id = intval($data['id']);
$nama = mysqli_real_escape_string($koneksi, $data['nama']);
$alamat = mysqli_real_escape_string($koneksi, $data['alamat']);
$no_telepon = mysqli_real_escape_string($koneksi, $data['no_telepon']);
$kendaraan = mysqli_real_escape_string($koneksi, $data['kendaraan']);
$bensin_awal = intval($data['bensin_awal']);
$sisa_etol = intval($data['sisa_etol']);
$tanggal_pengembalian = date('Y-m-d', strtotime($data['tanggal_pengembalian']));

// Debug: Tampilkan data yang diterima
error_log("Update request: " . json_encode($data));

// Periksa apakah ID ada di database sebelum update
$cek_id = mysqli_query($koneksi, "SELECT * FROM peminjamankendaraan WHERE id = '$id'");
if (mysqli_num_rows($cek_id) == 0) {
    echo json_encode(["status" => "error", "message" => "Data tidak ditemukan"]);
    exit();
}

// Query update
$query = "UPDATE peminjamankendaraan 
          SET nama='$nama', alamat='$alamat', no_telepon='$no_telepon', kendaraan='$kendaraan', 
              bensin_awal='$bensin_awal', sisa_etol='$sisa_etol', tanggal_pengembalian='$tanggal_pengembalian' 
          WHERE id='$id'";

if (mysqli_query($koneksi, $query)) {
    // Ambil data setelah update untuk konfirmasi
    $cek_update = mysqli_query($koneksi, "SELECT * FROM peminjamankendaraan WHERE id = '$id'");
    $data_baru = mysqli_fetch_assoc($cek_update);
    
    echo json_encode(["status" => "success", "message" => "Peminjaman berhasil diperbarui.", "updated_data" => $data_baru]);
} else {
    echo json_encode(["status" => "error", "message" => "Gagal memperbarui peminjaman: " . mysqli_error($koneksi)]);
}
?>
