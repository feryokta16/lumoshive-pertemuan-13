// Sistem Kasir untuk Toko Sederhana dengan Diskon Membership
// Buat sebuah sistem kasir untuk toko yang menghitung total harga pembelian dengan mempertimbangkan diskon membership. Tugas ini melibatkan pewarisan, komposisi objek, dan penggunaan format uang menggunakan built-in class JavaScript.
// Instruksi Tugas:
// 1. Class Barang:
// o Buat class Barang dengan properti:
// § namaBarang
// § harga
// o Metode: getInfoBarang() untuk menampilkan informasi barang.
// 2. Class Keranjang (Composition):
// o Buat class Keranjang dengan properti:
// § daftarBarang (array berisi instance Barang).
// o Metode:
// § tambahBarang() untuk menambah barang ke dalam keranjang.
// § totalHarga() untuk menghitung total harga semua barang dalam keranjang.
// 3. Class Membership:
// o Buat class Membership dengan properti:
// § namaMember
// § tipeMembership (Gold, Silver, Bronze).
// o Metode diskonMember() untuk mengembalikan diskon:
// § Gold: 20%
// § Silver: 10%
// § Bronze: 5%
// 4. Class Transaksi:
// o Properti:
// § keranjang (instance dari Keranjang).
// § member (instance dari Membership).
// o Metode:
// § hitungTotalAkhir() untuk menghitung harga akhir dengan diskon membership.
// § Gunakan Intl.NumberFormat untuk memformat harga dalam Rupiah.

class Barang {
  constructor(namaBarang, harga) {
    this.namaBarang = namaBarang;
    this.harga = harga;
  }
  getInfoBarang() {
    return `${this.namaBarang} - ${new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(this.harga)}`;
  }
}
class Keranjang {
  constructor() {
    this.daftarBarang = [];
  }
  tambahBarang(barang) {
    this.daftarBarang.push(barang);
  }

  totalharga() {
    return this.daftarBarang.reduce((total, barang) => total + barang.harga, 0);
  }
}

class Membership {
  constructor(namaMember, tipe) {
    this.namaMember = namaMember;
    this.tipe = tipe;
  }
  diskonMember() {
    if (this.tipe === "gold") {
      return 0.2;
    } else if (this.tipe === "silver") {
      return 0.1;
    } else if (this.tipe === "bronze") {
      return 0.05;
    }
  }
}

class Transaksi {
  constructor(keranjang, member) {
    this.keranjang = keranjang;
    this.member = member;
  }
  hitungTotalAkhir() {
    const totalHarga = this.keranjang.totalharga();
    const diskon = this.member.diskonMember();
    const totalAkhir = totalHarga - totalHarga * diskon;
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(totalAkhir);
  }
  tampilkanRincian() {
    console.log("rincian barang");
    this.keranjang.daftarBarang.forEach((barang) => {
      console.log(barang.getInfoBarang());
    });
    console.log(
      `total harga sebelum diskon : ${new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(this.keranjang.totalharga())}`
    );
    console.log(`Diskon Member : ${this.member.diskonMember() * 100}%`);
    console.log(`total harga setelah diskon : ${this.hitungTotalAkhir()}`);
  }
}

const barang1 = new Barang("Sepatu", 500000);
const barang2 = new Barang("Bola", 70000);
const barang3 = new Barang("Bola Basket", 50000);

const keranjang = new Keranjang();
keranjang.tambahBarang(barang1);
keranjang.tambahBarang(barang2);
keranjang.tambahBarang(barang3);

const member = new Membership("Budi", "gold");

const transaksi = new Transaksi(keranjang, member);
transaksi.tampilkanRincian();
