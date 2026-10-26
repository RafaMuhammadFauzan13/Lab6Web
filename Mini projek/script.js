// script.js - Mini Project Praktikum 6: Form Pendaftaran Workshop

const form = document.getElementById("formWorkshop");
const inputNama = document.getElementById("nama");
const inputEmail = document.getElementById("email");
const pilihSesi = document.getElementById("sesi");
const catatan = document.getElementById("catatan");
const tombolReset = document.getElementById("tombolReset");

const errNama = document.getElementById("errNama");
const errEmail = document.getElementById("errEmail");
const errSesi = document.getElementById("errSesi");
const infoSesi = document.getElementById("infoSesi");
const hitungCatatan = document.getElementById("hitungCatatan");
const pesanForm = document.getElementById("pesanForm");

const ringNama = document.getElementById("ringNama");
const ringEmail = document.getElementById("ringEmail");
const ringSesi = document.getElementById("ringSesi");

const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Menandai kolom valid / tidak valid
function tandai(elemen, pesanError, elemenError) {
 elemenError.textContent = pesanError;
 elemen.classList.toggle("invalid", pesanError !== "");
 elemen.classList.toggle("valid", pesanError === "");
}

// Fungsi validasi per kolom (mengembalikan teks error, "" jika valid)
function cekNama() {
 const nilai = inputNama.value.trim();
 if (nilai === "") return "Nama wajib diisi.";
 if (nilai.length < 3) return "Nama minimal 3 karakter.";
 return "";
}
function cekEmail() {
 const nilai = inputEmail.value.trim();
 if (nilai === "") return "Email wajib diisi.";
 if (!polaEmail.test(nilai)) return "Masukkan email yang valid, contoh: nama@email.com.";
 return "";
}
function cekSesi() {
 return pilihSesi.value === "" ? "Pilih salah satu sesi workshop." : "";
}

// Fitur 1: ringkasan input langsung (event input)
function perbaruiRingkasan() {
 ringNama.textContent = inputNama.value.trim() || "-";
 ringEmail.textContent = inputEmail.value.trim() || "-";
 ringSesi.textContent = pilihSesi.value || "-";
}

inputNama.addEventListener("input", function () {
 perbaruiRingkasan();
 if (inputNama.classList.contains("invalid")) tandai(inputNama, cekNama(), errNama);
});
inputEmail.addEventListener("input", function () {
 perbaruiRingkasan();
 if (inputEmail.classList.contains("invalid")) tandai(inputEmail, cekEmail(), errEmail);
});

// Validasi saat pengguna selesai mengisi satu kolom
inputNama.addEventListener("blur", function () { tandai(inputNama, cekNama(), errNama); });
inputEmail.addEventListener("blur", function () { tandai(inputEmail, cekEmail(), errEmail); });

// Fitur 2: event change pada dropdown sesi
pilihSesi.addEventListener("change", function () {
 perbaruiRingkasan();
 infoSesi.textContent = pilihSesi.value ? "Sesi dipilih: " + pilihSesi.value : "";
 tandai(pilihSesi, cekSesi(), errSesi);
});

// Fitur 3: penghitung karakter catatan
catatan.addEventListener("input", function () {
 hitungCatatan.textContent = catatan.value.length;
});

// Fitur 4: validasi saat submit + pesan sukses / gagal
form.addEventListener("submit", function (event) {
 event.preventDefault();

 const eNama = cekNama();
 const eEmail = cekEmail();
 const eSesi = cekSesi();
 tandai(inputNama, eNama, errNama);
 tandai(inputEmail, eEmail, errEmail);
 tandai(pilihSesi, eSesi, errSesi);

 pesanForm.className = "pesan";
 if (eNama || eEmail || eSesi) {
  pesanForm.textContent = "Pendaftaran belum berhasil. Perbaiki kolom yang bertanda merah.";
  pesanForm.classList.add("gagal");
  return;
 }

 const nama = inputNama.value.trim();
 const sesi = pilihSesi.value;
 pesanForm.textContent = "Terima kasih, " + nama + ". Kamu terdaftar di sesi " + sesi + ".";
 pesanForm.classList.add("sukses");
 bersihkanForm(false);
});

// Fitur 5: tombol reset / hapus isian
function bersihkanForm(hapusPesan) {
 form.reset();
 [inputNama, inputEmail, pilihSesi].forEach(function (el) {
  el.classList.remove("invalid", "valid");
 });
 errNama.textContent = "";
 errEmail.textContent = "";
 errSesi.textContent = "";
 infoSesi.textContent = "";
 hitungCatatan.textContent = "0";
 perbaruiRingkasan();
 if (hapusPesan) {
  pesanForm.textContent = "";
  pesanForm.className = "pesan";
 }
}
tombolReset.addEventListener("click", function () { bersihkanForm(true); });

