// Sistem Rental Kendaraan dengan Membership dan Diskon Sederhana
// Buat sebuah sistem rental kendaraan sederhana yang menggabungkan inheritance, object composition, dan class bawaan JavaScript.
// Instruksi Tugas:
// 1. Class Utama:
// o Buat class Kendaraan dengan properti:
// § merek
// § model
// § tahun
// o Metode:
// § infoKendaraan() untuk menampilkan informasi kendaraan.
// 2. Inheritance:
// o Buat dua class turunan dari Kendaraan:
// § Class Mobil dengan properti tambahan kapasitasPenumpang.
// § Class Motor dengan properti tambahan jenisMotor.
// 3. Object Composition:
// o Buat class Mesin dengan properti:
// § jenis (contoh: Bensin, Diesel).
// § tenagaKuda (contoh: 100 HP).
// o Gunakan komposisi dengan menambahkan objek Mesin ke dalam setiap instance Mobil dan Motor.
// 4. Class Membership:
// o Buat class Membership dengan properti:
// § namaMember
// § tipeMembership (Gold, Silver, atau Bronze).
// o Metode diskonMember() untuk mengembalikan diskon:
// § Gold: 15%
// § Silver: 10%
// § Bronze: 5%
// 5. Class Rental:
// o Properti:
// § kendaraan (instance dari Mobil atau Motor).
// § member (instance dari Membership).
// § tanggalRental (gunakan Date).
// § lamaHari (ditentukan langsung saat rental dibuat).
// o Metode hitungTotal():
// § Tarif harian:
// § Mobil: Rp 100.000/hari.
// § Motor: Rp 50.000/hari.
// § Hitung total harga berdasarkan hari dan diskon membership.

class Kendaraan {
  constructor(merk, model, tahun) {
    this.merk = merk;
    this.model = model;
    this.tahun = tahun;
  }
  infoKendaraan() {
    return `Merk : ${this.merk} Model : ${this.model} \nTahun : ${this.tahun}`;
  }
}
class Mobil extends Kendaraan {
  constructor(merk, model, tahun, kapasitasPenumpang) {
    super(merk, model, tahun);
    this.kapasitasPenumpang = kapasitasPenumpang;
  }
}

class Motor extends Kendaraan {
  constructor(merk, model, tahun, jenisMotor) {
    super(merk, model, tahun);
    this.jenisMotor = jenisMotor;
  }
  infoKendaraan() {
    return `Merk : ${this.merk} Model : ${this.model} \nTahun : ${this.tahun} \nJenis Motor : ${this.jenisMotor}`;
  }
}

class Mesin {
  constructor(jenis, tenagaKuda) {
    this.jenis = jenis;
    this.tenagaKuda = tenagaKuda;
  }
  infoMesin() {
    return `Jenis : ${this.jenis} Tenaga Kuda : ${this.tenagaKuda}`;
  }
}

class Membership {
  constructor(namaMember, tipeMember) {
    this.namaMember = namaMember;
    this.tipeMember = tipeMember;
  }
  diskonMember() {
    if (this.tipeMember === "gold") {
      return 0.15;
    } else if (this.tipeMember === "silver") {
      return 0.1;
    } else if (this.tipeMember === "bronze") {
      return 0.05;
    }
  }
}

const formatMoney = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

class Rental {
  constructor(kendaraan, member, mesin, tanggalRental, lamaHari) {
    this.kendaraan = kendaraan;
    this.mesin = mesin;
    this.member = member;
    this.tanggalRental = tanggalRental;
    this.lamaHari = lamaHari;
  }

  hitungTotal() {
    let tarifHarian;
    if (this.kendaraan instanceof Mobil) {
      tarifHarian = 100000;
    } else if (this.kendaraan instanceof Motor) {
      tarifHarian = 50000;
    }
    let totalHarga = tarifHarian * this.lamaHari;
    const diskon = this.member.diskonMember();
    totalHarga -= totalHarga * diskon;
    return totalHarga;
  }
  infoRental() {
    const formatDay = new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const tanggalRental = formatDay.format(this.tanggalRental);
    const formatDuit = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    });
    const duitakhir = formatDuit.format(this.hitungTotal());
    return `${this.kendaraan.infoKendaraan()}\n ${this.mesin.infoMesin()} \nMember : ${
      this.member.namaMember
    } \nTanggal Rental : ${tanggalRental} \nLama Hari : ${
      this.lamaHari
    }\n ${duitakhir} `;
  }
}

const mesinMobil = new Mesin("Bensin", "150HP");
const mesinMotor = new Mesin("Diesel", "100HP");

const mobil1 = new Mobil("Toyota", "Avanxa", 2021, 5);
const motor = new Motor("Honda", "Beat", 2021, "Matic");

const member1 = new Membership("Budi", "gold");
const member2 = new Membership("Siti", "silver");

const rental1 = new Rental(
  mobil1,
  member2,
  mesinMobil,
  new Date("2024-10-24"),
  3
);

console.log(rental1.infoRental());
