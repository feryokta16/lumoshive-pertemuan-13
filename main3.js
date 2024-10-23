// Sistem Dompet Digital untuk Pembayaran Online
// Buat sebuah sistem dompet digital yang dapat digunakan untuk transaksi pembayaran dengan fitur seperti top-up saldo dan pengurangan saldo. Sistem ini menggabungkan konsep inheritance, object composition, dan built-in class untuk memformat uang dan mencatat waktu transaksi.
// Instruksi Tugas:
// 1. Class Dompet:
// o Buat class Dompet dengan properti:
// § saldo (berisi jumlah saldo awal, misal Rp 500.000).
// o Metode:
// § topUp(nominal) untuk menambah saldo.
// § bayar(nominal) untuk mengurangi saldo (jika saldo mencukupi).
// § cekSaldo() untuk menampilkan saldo saat ini dalam format Rupiah (gunakan Intl.NumberFormat).
// 2. Class Transaksi (Composition):
// o Buat class Transaksi dengan properti:
// § dompet (instance dari Dompet).
// § nominal (jumlah uang yang dibayar).
// § jenisTransaksi (Top-up atau Pembayaran).
// § tanggalTransaksi (gunakan class Date untuk mencatat waktu transaksi).
// o Metode infoTransaksi() untuk menampilkan informasi transaksi.
// 3. Inheritance:
// o Buat class DompetPremium yang mewarisi dari Dompet dengan fitur tambahan:
// § Setiap top-up mendapatkan bonus 5% dari nominal top-up.

class Dompet {
  constructor(saldoAwal = 500000) {
    this.saldo = saldoAwal;
  }
  topUp(nominal) {
    this.saldo += nominal;
    return `top up sebesar ${this.formatUang(nominal)}`;
  }
  bayar(nominal) {
    if (this.saldo >= nominal) {
      this.saldo -= nominal;
      return `pembayaran sebesar ${this.formatUang(nominal)}`;
    } else {
      return `saldo tidak mencukupi`;
    }
  }

  cekSaldo() {
    return `saldo saat ini adalah ${this.formatUang(this.saldo)}`;
  }
  formatUang(nominal) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(nominal);
  }
}

class Transaksi {
  constructor(dompet, nominal, jenisTransaksi) {
    this.dompet = dompet;
    this.nominal = nominal;
    this.jenisTransaksi = jenisTransaksi;
    this.tanggalTransaksi = new Date();
  }
  infoTransaksi() {
    const formatDate = new Intl.DateTimeFormat("id-ID", {
      dateStyle: "full",
      timeStyle: "short",
    }).format(this.tanggalTransaksi);

    return `Jenis Transaksi :${this.jenisTransaksi}
    nominal :${this.dompet.formatUang(this.nominal)}
    tanggal transaksi : ${formatDate}`;
  }
}

class DompetPremium extends Dompet {
  topUp(nominal) {
    const bonus = nominal * 0.05;
    this.saldo += nominal + bonus;
    return `top up sebesar ${this.formatUang(
      nominal
    )} dan bonus ${this.formatUang(bonus)}`;
  }
}

const dompet = new Dompet();
console.log(dompet.cekSaldo());
console.log(dompet.topUp(100000));
console.log(dompet.cekSaldo());
console.log(dompet.bayar(2000000000));
console.log(dompet.cekSaldo());
const transaksi1 = new Transaksi(dompet, 2000000000, "Pembayaran");
console.log(transaksi1.infoTransaksi());

console.log("===================================");

// Dompet Premium
const dompetPremium = new DompetPremium(500000);
console.log(dompetPremium.cekSaldo());
console.log(dompetPremium.topUp(100000));
console.log(dompetPremium.cekSaldo());
console.log(dompetPremium.bayar(300000));
console.log(dompetPremium.cekSaldo());

// Transaksi dengan dompet premium
const transaksi2 = new Transaksi(dompetPremium, 300000, "Pembayaran");
console.log(transaksi2.infoTransaksi());
