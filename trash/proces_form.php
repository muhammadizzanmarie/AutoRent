<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nama = mysqli_real_escape_string($koneksi, $_POST['nama']);
    $nik = mysqli_real_escape_string($koneksi, $_POST['nik']);
    $alamat = mysqli_real_escape_string($koneksi, $_POST['alamat']);
    $email = mysqli_real_escape_string($koneksi, $_POST['email']);

    // Validasi file upload
    $direktori = "upload/";

    // Foto KTP
    $ktp_name = $_FILES['foto_ktp']['name'];
    $ktp_tmp = $_FILES['foto_ktp']['tmp_name'];
    $ktp_size = $_FILES['foto_ktp']['size'];
    $ktp_ext = pathinfo($ktp_name, PATHINFO_EXTENSION);
    
    // Foto Selfie
    $selfie_name = $_FILES['foto_diri']['name'];
    $selfie_tmp = $_FILES['foto_diri']['tmp_name'];
    $selfie_size = $_FILES['foto_diri']['size'];
    $selfie_ext = pathinfo($selfie_name, PATHINFO_EXTENSION);

    // Validasi ukuran file (max 5MB)
    $max_size = 5 * 1024 * 1024; // 5 MB

    if ($ktp_size > $max_size || $selfie_size > $max_size) {
        echo "Ukuran file harus di bawah 5 MB.";
        exit;
    }

    // Validasi ekstensi file
    $allowed_ext = ['jpg', 'jpeg', 'png'];

    if (!in_array(strtolower($ktp_ext), $allowed_ext) || !in_array(strtolower($selfie_ext), $allowed_ext)) {
        echo "Format file tidak valid. Hanya gambar JPG, JPEG, atau PNG yang diperbolehkan.";
        exit;
    }

    // Tentukan path file
    $ktp_path = $direktori . uniqid() . "_ktp." . $ktp_ext;
    $selfie_path = $direktori . uniqid() . "_selfie." . $selfie_ext;

    // Cek apakah file berhasil dipindahkan
    if (move_uploaded_file($ktp_tmp, $ktp_path) && move_uploaded_file($selfie_tmp, $selfie_path)) {
        // Simpan data ke database
        $query = "INSERT INTO peminjaman (nama, nik, alamat, email, foto_ktp, foto_diri) VALUES ('$nama', '$nik', '$alamat', '$email', '$ktp_path', '$selfie_path')";
        if (mysqli_query($koneksi, $query)) {
            echo "Peminjaman berhasil!";
        } else {
            echo "Gagal menyimpan data: " . mysqli_error($koneksi);
        }
    } else {
        echo "Gagal mengupload file.";
    }
}
?>
