const no = document.getElementById("no");
const id = document.getElementById("id");
const nama = document.getElementById("nama");
const kelas = document.getElementById("kelas");
const tbody = document.getElementById("tbody");

const viewData = async () => {
  const res = await fetch("http://localhost/projectTkAzzhara/pathlist/");
  const result = await res.json();
  console.log(result);
  result.forEach((data, index) => {
    const tr = document.createElement("tr");
    tr.classList.add("data-row");
    tr.innerHTML = `<td  class="data-cell">${index + 1}</td>
                    <td  class="data-cell">${data.id}</td>
                    <td  class="data-cell">${data.nama}</td>
                    <td  class="data-cell">${data.email}</td>
    `;
    tbody.appendChild(tr);
  });
};
viewData();
