const nama = document.getElementById("nama");
const kelas = document.getElementById("kelas");
const btnSubmit = document.getElementById("btnSubmit");

const submit = async (e) => {
  e.preventDefault();
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
      // Handle success (e.g., show a success message)
      nama.value = "";
      kelas.value = "";
      alert("data berhasil dikirim");
      console.log("Success:", result);
    } else {
      // Handle error response
      console.error("Error:", res.statusText);
      alert("data gagal dikirim");
    }
  } catch (error) {
    // Handle network or other errors
    console.error("Fetch error:", error);
  }
};

btnSubmit.addEventListener("click", submit);
