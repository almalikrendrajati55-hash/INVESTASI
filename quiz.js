/* =========================================================
   JAVASCRIPT KUIS PROFIL RISIKO INVESTASI
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    const btnCekHasil = document.getElementById("btnCekHasil");
    const hasilQuiz = document.getElementById("hasilQuiz");

    btnCekHasil.addEventListener("click", function () {
        let totalSkor = 0;
        const daftarPertanyaan = ["q1", "q2", "q3", "q4", "q5"];
        let semuaDiisi = true;

        // 1. Cek dan jumlahkan jawaban dari pertanyaan 1 sampai 5
        for (let i = 0; i < daftarPertanyaan.length; i++) {
            const jawaban = document.querySelector(
                `input[name="${daftarPertanyaan[i]}"]:checked`
            );

            if (!jawaban) {
                semuaDiisi = false;
                break;
            }

            totalSkor += parseInt(jawaban.value);
        }

        // 2. Validasi jika ada pertanyaan yang belum dijawab
        if (!semuaDiisi) {
            alert("Harap jawab semua 5 pertanyaan sebelum melihat hasil!");
            return;
        }

        // 3. Penentuan Kategori Profil Risiko berdasarkan Total Skor (Skor Min: 5, Maks: 20)
        let profil = "";
        let deskripsi = "";
        let kelasWarna = "";

        if (totalSkor <= 9) {
            profil = "Konservatif";
            deskripsi = "Kamu cenderung mengutamakan keamanan modal utama dan menghindari penurunan nilai uang. Instrumen yang cocok: <strong>Deposito, Reksa Dana Pasar Uang, dan Emas</strong>.";
            kelasWarna = "hasil-konservatif";
        } else if (totalSkor <= 15) {
            profil = "Moderat";
            deskripsi = "Kamu siap menerima fluktuasi harga tingkat sedang demi mendapatkan potensi pertumbuhan aset yang lebih baik. Instrumen yang cocok: <strong>Obligasi Negara, Reksa Dana Campuran, dan ETF</strong>.";
            kelasWarna = "hasil-moderat";
        } else {
            profil = "Agresif";
            deskripsi = "Kamu siap menghadapi naik-turun harga yang tajam demi mengejar imbal hasil jangka panjang yang maksimal. Instrumen yang cocok: <strong>Saham dan Reksa Dana Saham</strong>.";
            kelasWarna = "hasil-agresif";
        }

        // 4. Tampilkan Hasil ke dalam div #hasilQuiz
        hasilQuiz.className = "hasil-quiz " + kelasWarna;
        hasilQuiz.style.display = "block";
        hasilQuiz.innerHTML = `
            <h3>Profil Risikomu: ${profil} (Skor: ${totalSkor})</h3>
            <p>${deskripsi}</p>
            <br>
            <small>*Hasil kuis ini bersifat simulasi edukasi dan bukan rekomendasi investasi mutlak.</small>
        `;

        // 5. Scroll otomatis menuju kotak hasil agar pengguna langsung bisa melihat hasilnya
        hasilQuiz.scrollIntoView({ behavior: "smooth" });
    });
});