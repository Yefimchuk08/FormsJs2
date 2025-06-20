const form = document.getElementById("carForm");
    const tableBody = document.getElementById("carTableBody");
    const clearTableBtn = document.getElementById("clearTable");

    form.addEventListener("submit", function(e) {
      e.preventDefault();

      const model = document.getElementById("model").value.trim();
      const year = document.getElementById("year").value.trim();
      const type = document.getElementById("type").value;

      if (!model || !year || !type) return;

      addCarToTable(model, year, type);
      form.reset();
    });

    function addCarToTable(model, year, type) {
      const row = document.createElement("tr");
      const index = tableBody.children.length + 1;

      row.innerHTML = `
        <td>${index}</td>
        <td class="model">${model}</td>
        <td class="year">${year}</td>
        <td class="type">${type}</td>
        <td>
          <button class="btn btn-warning btn-sm me-2 edit">Редагувати</button>
          <button class="btn btn-danger btn-sm delete">Видалити</button>
        </td>
      `;

      tableBody.appendChild(row);
    }

    tableBody.addEventListener("click", function(e) {
      const target = e.target;
      const row = target.closest("tr");

      if (target.classList.contains("delete")) {
        row.remove();
        updateRowNumbers();
      }

      if (target.classList.contains("edit")) {
        const modelCell = row.querySelector(".model");
        const yearCell = row.querySelector(".year");
        const typeCell = row.querySelector(".type");

        const newModel = prompt("Нова модель:", modelCell.textContent);
        const newYear = prompt("Новий рік:", yearCell.textContent);
        const newType = prompt("Новий тип:", typeCell.textContent);

        if (newModel && newYear && newType) {
          modelCell.textContent = newModel;
          yearCell.textContent = newYear;
          typeCell.textContent = newType;
        }
      }
    });

    function updateRowNumbers() {
      [...tableBody.children].forEach((row, index) => {
        row.firstElementChild.textContent = index + 1;
      });
    }

    clearTableBtn.addEventListener("click", function() {
      tableBody.innerHTML = "";
    });
