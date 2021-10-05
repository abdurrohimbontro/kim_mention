module.exports = (client) => {
  return `
Commands
\`\`\`
@${client.user.username} mode <channel|dm|off>: aktifkan atau nonaktifkan sebutan untuk pengguna Anda dan pilih metode
@${client.user.username} name <username|nickname|both|off>: aktifkan sebutan untuk nama Anda
@${client.user.username} tambahkan <1>, <2>, <3>: tambahkan frasa yang harus Anda sebutkan
@${client.user.username} hapus <1>, <2>, <3>: hapus frasa yang harus Anda sebutkan
@${client.user.username} list: buat daftar pengaturan Anda dan tambahkan frasa penyebutan
@${client.user.username} channel #<channel name>: setel channel agar sebutan muncul (khusus admin)
@${client.user.username} init: Inisialisasi server secara manual jika bot tidak berfungsi (hanya admin)
@${client.user.username} bantuan: menampilkan perintah yang tersedia\`\`\`
`
}
