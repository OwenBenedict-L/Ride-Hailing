# UTS Backend (Ride-Hailing)

Sistem Ride-Hailing yang dirancang merupakan layanan transportasi berbasis aplikasi online, bertujuan untuk membuat suatu siklus layanan transportasi digital dalam satu alur yang saling berkaitan.

Alur kerja sistem dimulai dari manajemen identitas melalui User & Driver Management, di mana setiap akun yang terverifikasi secara otomatis terhubung dengan Wallet System untuk memfasilitasi transaksi non-tunai, baik berupa top-up maupun pembayaran perjalanan.

Pada fase operasional, sistem menerapkan perhitungan rute, jarak, dan biaya (estimasi) yang hanya dapat diakses secara dinamis oleh pengguna selama proses booking berlangsung. Hal ini memastikan bahwa data biaya yang disajikan selalu akurat dan relevan dengan kondisi perjalanan terkini, termasuk saat dikombinasikan dengan potongan harga dari Promo Management.

Selama perjalanan aktif, koordinasi antara penumpang dan pengemudi diperkuat melalui fitur In-App Chat. Setelah status pemesanan mencapai tahap penyelesaian, sistem secara otomatis mengeksekusi penyelesaian pembayaran melalui wallet dan membuka akses untuk user dapat melakukan Review & Rating sebagai indikator kualitas perjalanan, serta terdapat Help Center untuk penanganan kendala atau laporan dari pengguna.

Layanan notifikasi secara aktif akan memantau dan menginformasikan setiap aktivitas penting yang terjadi di seluruh modul kepada pengguna secara real-time.

# BOOKING

## 1. Endpoint untuk Membuat Booking Baru

-> membuat pesanan baru dengan menentukan lokasi jemput, lokasi tujuan, dan kode promo

1. Endpoint: POST /api/bookings
2. URL: localhost:5000/api/bookings
3. Parameter: userId, pickupLocation, destinationLocation, promoCode
4. Input: Request Body (dibagian raw)

```
{
  "userId": "string (ID User)",
  "pickupLocation": "string (alamat penjemputan)",
  "destinationLocation": "string (alamat tujuan)",
  "promoCode": "string (opsional)"
}
```

## 2. Endpoint untuk Mendapatkan Pesanan yang Aktif (Booking Actives)

-> mengambil data booking yang sedang berlangsung (status: confirmed, on_way)

1. Endpoint: GET /api/bookings/actives
2. URL: localhost:5000/api/bookings/actives
3. Parameter: userId
4. Input: Query Parameter (di tab Params)

## 3. Endpoint untuk Mendapatkan Riwayat Pesanan (Booking History)

-> mengambil seluruh daftar transaksi perjalanan yang pernah dilakukan oleh user (status: completed)

1. Endpoint: GET /api/bookings/history
2. URL: localhost:5000/api/bookings/history
3. Parameter: userId
4. Input: Query Parameter (di tab Params)

## 4. Endpoint untuk Memperbarui Data Pesanan

-> mengubah status pesanan atau menempatkan driver ke pesanan tertentu

1. Endpoint: PUT /api/bookings/:id
2. URL: localhost:5000/api/bookings/:id
3. Parameter: id, status, driverId
4. Input: URL Parameter & Request Body (dibagian raw)

```
{
  "status": "string (pending/confirmed/on_way/completed/cancelled)",
  "driverId": "string (ID driver yang mengambil orderan)"
}
```

## 5. Endpoint untuk Menghapus Data Pesanan

-> mengambil seluruh daftar transaksi perjalanan yang pernah dilakukan oleh user (status: completed)

1. Endpoint: DELETE /api/bookings/:id
2. URL: localhost:5000/api/bookings/:id
3. Parameter: id
4. Input: URL Parameter

# NOTIFICATION

## 1. Endpoint untuk Mengambil Notifikasi User

-> menampilkan seluruh daftar pesan notifikasi yang masuk ke akun user

1. Endpoint: GET /api/notifications
2. URL: localhost:5000/api/notifications
3. Parameter: userId
4. Input: Query Parameter (di tab Params)

## 2. Endpoint untuk Mengirim Notifikasi Baru

-> membuat pesanan baru dengan menentukan lokasi jemput, lokasi tujuan, dan kode promo

1. Endpoint: POST /api/notifications
2. URL: localhost:5000/api/notifications
3. Parameter: userId, title, message, type
4. Input: Request Body (dibagian raw)

```
{
  "userId": "string (ID penerima notif)",
  "title": "string (judul notifikasi)",
  "message": "string (isi pesan)",
  "type": "string (system/promo/payment/booking_info)"
}
```

## 3. Endpoint untuk Menghapus Riwayat Notifikasi

-> membersihkan seluruh daftar notifikasi yang dimiliki oleh user

1. Endpoint: DELETE /api/notifications/clear
2. URL: localhost:5000/api/notifications/clear
3. Parameter: userId
4. Input: Query Parameter (di tab Params)

# HELP CENTER

## 1. Endpoint untuk Membuat Tiket Baru

-> Digunakan untuk melaporkan masalah atau bantuan (seperti barang tertinggal).

1. Endpoint: POST /api/helpcenter/tickets
2. URL: localhost:5000/api/helpcenter/tickets
3. Parameter: userId
4. Input: Request Body (dibagian raw)

```
{
"transactionId": "rideId",
"userId": "user111",
"subject": "Barang Tertinggal",
"description": "Dompet saya tertinggal di kereta"
}
```

## 2. Endpoint untuk Mengecek Daftar Tiket User

-> Mengambil semua tiket yang pernah dibuat oleh user tertentu.

1. Endpoint: GET /api/helpcenter/tickets
2. URL: localhost:5000/api/helpcenter/tickets?userId=
3. Parameter: userId
4. Input: Query Parameter (di params)

## 3. Endpoint untuk Melihat Detail Tiket

-> Mengambil informasi mendalam dari satu tiket spesifik berdasarkan ID Transaksi.

1. Endpoint: GET /api/helpcenter/tickets/:tickets_Id
2. URL: localhost:5000/api/helpcenter/tickets/:tickets_Id
3. Parameter: tickets_id
4. Input: Path Parameter (rideId)

## 4. Endpoint untuk Menambah Balasan (Reply)

-> Digunakan oleh user atau CS untuk berkomunikasi di dalam tiket yang aktif.

1. Endpoint: POST /api/helpcenter/tickets/:tickets_id/replies
2. URL: localhost:5000/api/helpcenter/tickets/tickets_id/replies
3. Parameter: tickets_id
4. Input: Request Body (dibagian raw)

```
{
"sender": "user", // atau "cs"
"message": "Halo, ini balasan saya..."
}
```

## 5. Endpoint untuk Menyelesaikan Tiket

-> Mengubah status tiket menjadi selesai atau resolved.

1. Endpoint: PUT /api/helpcenter/tickets/:tickets_id/resolve
2. URL: localhost:5000/api/helpcenter/tickets/tickets_id/resolve
3. Parameter: tickets_id
4. Input: Path Parameter

# ESTIMATION

## 1. Endpoint untuk Membuat Estimasi Baru

-> Menghitung tarif perjalanan berdasarkan asal dan tujuan.

1. Endpoint: POST /api/estimations
2. URL: localhost:5001/api/estimations
3. Parameters:
4. Input: Body (JSON):

```
{
"userId": "nama",
"origin": "lokasi penjemputan",
"destination": "lokasi tujuan",
}
```

### 1.1 Post-Response

```
let responseData = pm.response.json();
pm.environment.set("harga_estimasi", responseData.fare);
```

## 2. Endpoint untuk Update Rute Estimasi

-> Memperbarui data estimasi yang sudah ada.

1. Endpoint: PUT /api/estimations/estimation_id/route
2. URL: localhost:5001/api/estimations/estimation_id/route
3. Parameters: id
4. Input: Body (id)

```
{
"userId": "nama",
"origin": "lokasi penjemputan",
"destination": "lokasi tujuan",
}
```

## 3. Endpoint untuk Mengambil / Menghapus Estimasi Berdasarkan ID

-> Digunakan untuk melihat detail atau menghapus data estimasi dari database.

1. Endpoint: GET / DELETE /api/estimations/:estimations_id
2. URL: localhost:5001/api/estimations/69e3c37ac4f08e6ddbaa9e67
3. Parameters: id
4. Input: Path Parameter (id)
