const API_URL = "" //add your API endpoint here, e.g. "https://myapi.com/expense"

let total = 0
let expenseCount = 0
const categoryTotals = {}
let currentSymbol = "₹"

// Color palette ONLY for chart
const PALETTE = [
  "#FF6B6B","#4ECDC4","#FFD166","#6C5CE7","#00D084",
  "#FF9F1C","#3A86FF","#F72585","#43AA8B","#F9844A"
]

// Header date
const headerDate = document.getElementById("headerDate")
if (headerDate) {
  headerDate.textContent = new Date().toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric"
  })
}

// Default date
const dateInput = document.getElementById("date")
if (dateInput) dateInput.value = new Date().toISOString().split("T")[0]

// Currency setup
const currencySelect = document.getElementById("currency")
if (currencySelect) {
  currencySelect.value = "₹"
  document.getElementById("currencyPrefix").textContent = "₹"
  document.getElementById("currencySymbolHero").textContent = "₹"
}

function setStatus(msg, type = "success") {
  const el = document.getElementById("formStatus")
  el.textContent = msg
  el.className = `form-status ${type}`
  setTimeout(() => { el.textContent = ""; el.className = "form-status" }, 3000)
}

function updateCurrency() {
  currentSymbol = document.getElementById("currency").value
  document.getElementById("currencyPrefix").textContent = currentSymbol

  document.querySelectorAll(".amount-cell").forEach(cell => {
    const raw = parseFloat(cell.dataset.amount || 0)
    cell.textContent = currentSymbol + raw.toFixed(2)
  })

  updateHero()
  updateChart()
}

async function addExpense() {
  const amount   = document.getElementById("amount").value.trim()
  const category = document.getElementById("category").value.trim()
  const date     = document.getElementById("date").value

  if (!amount || isNaN(amount) || parseFloat(amount) <= 0) { setStatus("Enter a valid amount.", "error"); return }
  if (!category) { setStatus("Enter a category.", "error"); return }
  if (!date)     { setStatus("Pick a date.", "error"); return }

  const btn = document.querySelector(".add-btn")
  btn.disabled = true
  btn.style.opacity = "0.5"

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, category, date })
    })

    if (!response.ok) throw new Error("API error")

    const data = await response.json()
    addRow(data.id, amount, category, date)

    document.getElementById("amount").value = ""
    document.getElementById("category").value = ""

    setStatus("Expense added ✓", "success")
  } catch (e) {
    console.error(e)
    setStatus("Failed to save.", "error")
  } finally {
    btn.disabled = false
    btn.style.opacity = ""
  }
}

function addRow(id, amount, category, date) {
  const empty = document.querySelector(".empty-row")
  if (empty) empty.remove()

  const table = document.getElementById("expenseTable")
  const row   = document.createElement("tr")

  const val = parseFloat(amount)
  const shortId = (id || "—").toString().slice(-8)

  row.innerHTML = `
    <td>${shortId}</td>
    <td class="amount-cell" data-amount="${val}">${currentSymbol}${val.toFixed(2)}</td>
    <td><span class="category-tag">${category}</span></td>
    <td class="date-cell">${formatDate(date)}</td>
    <td>
      <button class="delete-btn" onclick="deleteExpense('${id}', this)">✕</button>
    </td>
  `

  table.insertBefore(row, table.firstChild)

  total += val
  expenseCount++

  const key = category.toLowerCase()
  categoryTotals[key] = (categoryTotals[key] || 0) + val

  updateHero()
  updateChart()
  updateTableCount()
}

async function deleteExpense(id, btn) {
  const row = btn.closest("tr")
  const val = parseFloat(row.querySelector(".amount-cell").dataset.amount || 0)
  const cat = row.querySelector(".category-tag")?.textContent.toLowerCase() || ""

  btn.disabled = true
  btn.style.opacity = "0.5"

  try {
    const response = await fetch(`${API_URL}?expense_id=${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    })

    // critical fix
    if (!response.ok) {
      throw new Error("Delete failed at API")
    }

    // update state ONLY after success
    total -= val
    expenseCount--

    if (categoryTotals[cat] !== undefined) {
      categoryTotals[cat] -= val
      if (categoryTotals[cat] <= 0.001) delete categoryTotals[cat]
    }

    // smooth animation
    row.style.transition = "opacity 0.2s, transform 0.2s"
    row.style.opacity = "0"
    row.style.transform = "translateX(10px)"

    setTimeout(() => {
      row.remove()

      if (!document.getElementById("expenseTable").children.length) {
        showEmptyState()
      }

      updateHero()
      updateChart()
      updateTableCount()
    }, 200)

  } catch (error) {
    console.error("DELETE ERROR:", error)
    setStatus("Delete failed (check API/CORS)", "error")

    btn.disabled = false
    btn.style.opacity = ""
  }
}

function showEmptyState() {
  const table = document.getElementById("expenseTable")
  const row = document.createElement("tr")
  row.className = "empty-row"
  row.innerHTML = `<td colspan="5"><div class="empty-state">
    <p>No expenses recorded yet</p>
  </div></td>`
  table.appendChild(row)
}

function updateHero() {
  document.getElementById("total").textContent = total.toFixed(2)

  document.getElementById("expenseCount").textContent =
    expenseCount === 0 ? "No expenses yet" :
    expenseCount === 1 ? "1 expense tracked" :
    `${expenseCount} expenses tracked`
}

function updateTableCount() {
  document.getElementById("tableCount").textContent =
    expenseCount === 1 ? "1 entry" : `${expenseCount} entries`
}

function updateChart() {
  const legend = document.getElementById("chartLegend")
  const donutVal = document.getElementById("donutTotal")

  const cats = Object.entries(categoryTotals)

  if (!cats.length) {
    legend.innerHTML = `<div class="chart-empty">Add expenses</div>`
    donutVal.textContent = "—"
    drawDonut([])
    return
  }

  donutVal.textContent = currentSymbol + total.toFixed(2)

  const data = cats.map(([cat, val], i) => ({
    label: cat,
    value: val,
    color: PALETTE[i % PALETTE.length]
  }))

  drawDonut(data)

  legend.innerHTML = data.map(d => `
    <div class="legend-item">
      <span class="legend-dot" style="background:${d.color}"></span>
      <span class="legend-name">${d.label}</span>
      <span class="legend-amt">${currentSymbol}${d.value.toFixed(2)}</span>
    </div>
  `).join("")
}

function drawDonut(data) {
  const canvas = document.getElementById("donutChart")
  const ctx = canvas.getContext("2d")

  const W = canvas.width
  const H = canvas.height
  const cx = W / 2
  const cy = H / 2

  const outerR = W / 2 - 8
  const innerR = outerR * 0.65

  ctx.clearRect(0, 0, W, H)

  if (!data.length) return

  const totalVal = data.reduce((s, d) => s + d.value, 0)

  let angle = -Math.PI / 2

  data.forEach(d => {
    const slice = (d.value / totalVal) * Math.PI * 2

    ctx.beginPath()
    ctx.arc(cx, cy, outerR, angle, angle + slice)
    ctx.arc(cx, cy, innerR, angle + slice, angle, true)
    ctx.closePath()

    ctx.fillStyle = d.color
    ctx.fill()

    angle += slice
  })
}

function formatDate(dateStr) {
  const [y, m, d] = dateStr.split("-")
  return `${d}/${m}/${y}`
}