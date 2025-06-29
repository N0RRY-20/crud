const tbody = document.getElementById("tbody");

const editModal = document.getElementById("editModal");
const closeBtn = document.querySelector(".close");
const edit = document.getElementById("edit");
const editNama = document.getElementById("edit-nama");
const editKelas = document.getElementById("edit-kelas");
const editForm = document.getElementById("editForm");
const editId = document.getElementById("edit-id");

const viewData = async () => {
  const res = await fetch("http://localhost/projectTkAzzhara/pathlist/");
  const result = await res.json();
  console.log(result);

  result.forEach((data, index) => {
    const tr = document.createElement("tr");
    tr.classList.add("data-row");

    tr.innerHTML = `
      <td class="data-cell">${index + 1}</td>
      <td class="data-cell" id="id">${data.id}</td>
      <td class="data-cell nama">${data.nama}</td>
      <td class="data-cell kelas">${data.kelas}</td>
      <td class="data-cell">
        <button onclick='editData(${JSON.stringify(data.id)})'>Edit</button>
        <button >Delete</button>
      </td>
      <td><button>Download</button></td>
    `;

    tbody.appendChild(tr);
  });
};
viewData();

// edit data
const editData = (dataId) => {
  editModal.style.display = "block";
  editId.value = dataId;
};
closeBtn.onclick = () => {
  editModal.style.display = "none";
};

window.onclick = (e) => {
  if (e.target == editModal) {
    editModal.style.display = "none";
  }
};

// tekan btn submit modal form
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
    tbody.innerHTML = "";
    editModal.style.display = "none";
    viewData();
    console.log(result);
  } catch (err) {
    console.log(err);
  }
});
