Ini adalah bot telegram dapat menyebut Anda ketika frasa tertentu yang Anda tetapkan digunakan oleh orang lain dalam obrolan. Itu dibuat untuk mereplikasi fungsionalitas kata sorotan dari Slack dan Skype.
#### Commands
```
@kimabsenbot mode <channel|dm|off> : aktifkan atau nonaktifkan sebutan untuk pengguna Anda dan pilih metode
@kimabsenbot name <username|nickname|both|off> : aktifkan sebutan untuk nama Anda
@kimabsenbot add <1>, <2>, <3> : tambahkan frasa yang harus disebutkan namanya
@kimabsenbot remove <1>, <2>, <3> : hapus frasa yang harus Anda sebutkan
@kimabsenbot list : buat daftar pengaturan Anda dan tambahkan frasa penyebutan
@kimabsenbot channel #<channel name> : atur channel agar sebutan muncul (khusus admin)
@kimabsenbot init : Inisialisasi server secara manual jika bot tidak berfungsi (khusus admin)
@kimabsenbot help : menampilkan perintah yang tersedia
```

##### Deploy the app

    [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/abdurrohimbontro/kim_mention)

#### Penggunaan

- Jika bot sudah ada di server Anda sebelum menerapkan aplikasi, Anda mungkin perlu menjalankan perintah `init` agar semuanya berfungsi
- Admin harus menyetel saluran sebutan menggunakan perintah `saluran` sebelum pengguna dapat memilih mode saluran
- Untuk mengaktifkan sebutan untuk pengguna Anda, Anda perlu
  1. Pilih mode dengan perintah `mode`
  2. Pilih opsi nama dengan perintah `name` (opsional)
  3. Pilih frasa penyebutan menggunakan perintah `add`
