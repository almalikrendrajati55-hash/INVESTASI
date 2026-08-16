/* =========================================================
   JAVASCRIPT KALKULATOR INVESTASI
   File ini terhubung dengan kalkulator.html
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    // Ambil elemen tombol hitung
    const btnHitung = document.getElementById("btnHitung");

    // Jalankan fungsi saat tombol ditekan
    btnHitung.addEventListener("click", function () {
        // 1. Ambil nilai input dari form
        const modalAwal = parseFloat(document.getElementById("modalAwal").value) || 0;
        const setoranBulanan = parseFloat(document.getElementById("setoranBulanan").value) || 0;
        const bungaTahunan = parseFloat(document.getElementById("bungaTahunan").value) || 0;
        const lamaTahun = parseInt(document.getElementById("lamaTahun").value) || 0;

        // 2. Validasi input: Lama investasi tidak boleh kosong atau <= 0
        if (lamaTahun <= 0) {
            alert("Harap masukkan lama investasi minimal 1 tahun.");
            return;
        }

        // 3. Konversi variabel untuk perhitungan bulanan
        const totalBulan = lamaTahun * 12;
        const bungaBulanan = (bungaTahunan / 100) / 12;

        // Hitung total setoran murni (Modal Awal + Total Setoran Rutin)
        const totalSetoran = modalAwal + (setoranBulanan * totalBulan);

        let nilaiAkhir = 0;

        // 4. Perhitungan Nilai Akhir dengan Bunga Majemuk Bulanan
        if (bungaBulanan > 0) {
            // Pertumbuhan dari Modal Awal
            const fvModalAwal = modalAwal * Math.pow(1 + bungaBulanan, totalBulan);
            
            // Pertumbuhan dari Setoran Rutin Bulanan
            const fvSetoranBulanan = setoranBulanan * ((Math.pow(1 + bungaBulanan, totalBulan) - 1) / bungaBulanan);
            
            nilaiAkhir = fvModalAwal + fvSetoranBulanan;
        } else {
            // Jika estimasi bunga 0%
            nilaiAkhir = totalSetoran;
        }

        // Hitung total keuntungan (Nilai Akhir - Total Setoran)
        const totalKeuntungan = nilaiAkhir - totalSetoran;

        // 5. Fungsi untuk mengubah angka biasa menjadi Format Rupiah
        const formatRupiah = (angka) => {
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                maximumFractionDigits: 0
            }).format(angka);
        };

        // 6. Tampilkan hasil kalkulasi ke dalam elemen HTML
        document.getElementById("hasilTotalSetoran").innerText = formatRupiah(totalSetoran);
        document.getElementById("hasilKeuntungan").innerText = formatRupiah(totalKeuntungan);
        document.getElementById("hasilNilaiAkhir").innerText = formatRupiah(nilaiAkhir);
    });
});