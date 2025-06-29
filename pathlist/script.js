const tbody = document.getElementById("tbody");
const editModal = document.getElementById("editModal");
const closeBtn = document.querySelector(".close");
const editForm = document.getElementById("editForm");
const editId = document.getElementById("edit-id");
const editNama = document.getElementById("edit-nama");
const editKelas = document.getElementById("edit-kelas");

// Fungsi tampilkan modal dan isi input
const editData = (dataId) => {
  const row = document.querySelector(`tr[data-id="${dataId}"]`);
  const nama = row.querySelector(".nama-cell").textContent;
  const kelas = row.querySelector(".kelas-cell").textContent;

  editId.value = dataId;
  editNama.value = nama;
  editKelas.value = kelas;

  editModal.style.display = "block";
};

// Saat form disubmit
editForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    id: editId.value,
    nama: editNama.value,
    kelas: editKelas.value,
  };

  try {
    const res = await fetch("http://localhost/projectTkAzzhara/pathlist/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    console.log(result);

    // Refresh tampilan
    tbody.innerHTML = "";
    viewData();

    editModal.style.display = "none"; // Tutup modal
  } catch (err) {
    console.log(err);
  }
});

closeBtn.onclick = () => {
  editModal.style.display = "none";
};

window.onclick = (e) => {
  if (e.target == editModal) {
    editModal.style.display = "none";
  }
};

// Tampilkan data awal
const viewData = async () => {
  const res = await fetch("http://localhost/projectTkAzzhara/pathlist/");
  const result = await res.json();
  console.log(result);

  result.forEach((data, index) => {
    const tr = document.createElement("tr");
    tr.classList.add("data-row");
    tr.setAttribute("data-id", data.id); // Penting!

    tr.innerHTML = `
      <td class="data-cell">${index + 1}</td>
      <td class="data-cell">${data.id}</td>
      <td class="data-cell nama-cell">${data.nama}</td>
      <td class="data-cell kelas-cell">${data.kelas}</td>
      <td class="data-cell">
        <button onclick='editData(${JSON.stringify(data.id)})'>Edit</button>
        <button>Delete</button>
      </td>
      <td><button>Download</button></td>
    `;

    tbody.appendChild(tr);
  });
};

viewData();
