const nama = document.getElementById("nama");
const kelas = document.getElementById("kelas");
const form = document.querySelector("form"); // ambil form langsung

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Cek validasi input sebelum kirim
  if (!nama.checkValidity() || !kelas.checkValidity()) {
    // Ini akan memicu browser menampilkan pesan validasi default
    form.reportValidity();
    return;
  }

  const data = {
    nama: nama.value,
    kelas: kelas.value,
  };

  try {
    const res = await fetch(
      "http://localhost/projectTkAzzhara/isi%20data%20anak%20tk%20azzahra%20uuid/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (res.ok) {
      const result = await res.json();
      nama.value = "";
      kelas.value = "";
      alert("Data berhasil dikirim");
      console.log("Success:", result);
    } else {
      console.error("Error:", res.statusText);
      alert("Data gagal dikirim");
    }
  } catch (error) {
    console.error("Fetch error:", error);
    alert("Terjadi kesalahan jaringan");
  }
});
