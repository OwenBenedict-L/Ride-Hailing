# UTS Backend (Ride-Hailing)

Sistem Ride-Hailing yang dirancang merupakan layanan transportasi berbasis aplikasi online, bertujuan untuk membuat suatu siklus layanan transportasi digital dalam satu alur yang saling berkaitan. 

Alur kerja sistem dimulai dari manajemen identitas melalui User & Driver Management, di mana setiap akun yang terverifikasi secara otomatis terhubung dengan Wallet System untuk memfasilitasi transaksi non-tunai, baik berupa top-up maupun pembayaran perjalanan.

Pada fase operasional, sistem menerapkan perhitungan rute, jarak, dan biaya (estimasi) yang hanya dapat diakses secara dinamis oleh pengguna selama proses booking berlangsung. Hal ini memastikan bahwa data biaya yang disajikan selalu akurat dan relevan dengan kondisi perjalanan terkini, termasuk saat dikombinasikan dengan potongan harga dari Promo Management.

Selama perjalanan aktif, koordinasi antara penumpang dan pengemudi diperkuat melalui fitur In-App Chat. Setelah status pemesanan mencapai tahap penyelesaian, sistem secara otomatis mengeksekusi penyelesaian pembayaran melalui wallet dan membuka akses untuk user dapat melakukan Review & Rating sebagai indikator kualitas perjalanan, serta terdapat Help Center untuk penanganan kendala atau laporan dari pengguna.

Layanan notifikasi secara aktif akan memantau dan menginformasikan setiap aktivitas penting yang terjadi di seluruh modul kepada pengguna secara real-time.

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

## 6. Endpoint untuk Mengambil Notifikasi User
-> menampilkan seluruh daftar pesan notifikasi yang masuk ke akun user

1. Endpoint: GET /api/notifications
2. URL: localhost:5000/api/notifications
3. Parameter: userId
4. Input: Query Parameter (di tab Params)

## 7. Endpoint untuk Mengirim Notifikasi Baru
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
## 8. Endpoint untuk Menghapus Riwayat Notifikasi
-> membersihkan seluruh daftar notifikasi yang dimiliki oleh user

1. Endpoint: DELETE /api/notifications/clear
2. URL: localhost:5000/api/notifications/clear
3. Parameter: userId
4. Input: Query Parameter (di tab Params)

---

---

### HELP CENTER

## 1. Membuat Tiket

POST localhost:5001/api/helpcenter/tickets
{
"transactionId":"rideId",
"userId": "user111",
"subject": "Barang Tertinggal",
"description": "Dompet saya tertinggal di kereta"
}

## 2. Mengecek Tiket

Get localhost:5001/api/helpcenter/tickets?userId=

## 3. Melihat Detail Tiket

GET localhost:5001/api/helpcenter/tickets/rideId

## 4. Menambah Balasan ke Tiket Aktif

POST localhost:5001/api/helpcenter/tickets/ride_id/replies

{
"sender": "user",
"message": "Ini kapan kelar ya HAlooo....?"
}

### jika ada pov developer bisa juga gunain ini :v

{
"sender": "cs",
"message": "Halo, ini bla bla...."
}

## 5. Menutup/Menyelesaikan Tiket

## PUT localhost:5001/api/helpcenter/tickets/ride_id/resolve -> dari sheireen

---

### Estimation

## Delete & Get

localhost:5001/api/estimations/"DataBase_Id"
localhost:5001/api/estimations/69e3c37ac4f08e6ddbaa9e67

## Post

localhost:5001/api/estimations
{
"userId": "nama",
"origin": "lokasi penjemputan",
"destination": "lokasi tujuan",
"distance": angka
}

# post-response

let responseData = pm.response.json();
pm.environment.set("harga_estimasi", responseData.fare);
pm.environment.set("id_estimasi", responseData.\_id);

## Put

localhost:5001/api/estimations/url/route
{
"userId": "nama",
"origin": "lokasi penjemputan",
"destination": "lokasi tujuan",
"distance": angka
}

let responseData = pm.response.json();
pm.environment.set("harga_estimasi", responseData.fare);
pm.environment.set("id_estimasi", responseData.\_id);

---

---

## Validate Promo

localhost:5001/api/promos/validate
{
"estimationId": "{{id_estimasi}}",
"code": "UNTAR",
"fare": "{{harga_estimasi}}"
}

### Create Promo

localhost:5001/api/promos
{
"estimationId": "{{id_estimasi}}", //optional
"fare": "{{harga_estimasi}}",
"code": "UNTAR",
"discount_percentage": 20,
"max_discount": 15000,
"expiry_date": "2026-12-31T23:59:59.000Z"
}

### AUTH DARREN

localhost:5001/api/auth/login
{

    "email": "darren123@gmail.com",
    "password": "12345678"

}
