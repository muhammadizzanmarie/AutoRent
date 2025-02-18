<?php
include '../db.php';

$query = "SELECT * FROM peminjamankendaraan";
$result = mysqli_query($koneksi, $query);

$data = [];
while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

echo json_encode($data);
?>
