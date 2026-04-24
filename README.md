# UTS Backend (Ride-Hailing)

Sistem Ride-Hailing yang dirancang merupakan layanan transportasi berbasis aplikasi online, bertujuan untuk membuat suatu siklus layanan transportasi digital dalam satu alur yang saling berkaitan.

Alur kerja sistem dimulai dari manajemen identitas melalui User & Driver Management, di mana setiap akun yang terverifikasi secara otomatis terhubung dengan Wallet System untuk memfasilitasi transaksi non-tunai, baik berupa top-up maupun pembayaran perjalanan.

Pada fase operasional, sistem menerapkan perhitungan rute, jarak, dan biaya (estimasi) yang hanya dapat diakses secara dinamis oleh pengguna selama proses booking berlangsung. Hal ini memastikan bahwa data biaya yang disajikan selalu akurat dan relevan dengan kondisi perjalanan terkini, termasuk saat dikombinasikan dengan potongan harga dari Promo Management.

Selama perjalanan aktif, koordinasi antara penumpang dan pengemudi diperkuat melalui fitur In-App Chat. Setelah status pemesanan mencapai tahap penyelesaian, sistem secara otomatis mengeksekusi penyelesaian pembayaran melalui wallet dan membuka akses untuk user dapat melakukan Review & Rating sebagai indikator kualitas perjalanan, serta terdapat Help Center untuk penanganan kendala atau laporan dari pengguna.

Layanan notifikasi secara aktif akan memantau dan menginformasikan setiap aktivitas penting yang terjadi di seluruh modul kepada pengguna secara real-time.

# ENDPOINTS

## USERS (Elfrandt Goldjer (535250092))
### Register Users

POST localhost:5001/api/auth/register
{
"email": "elfrandtgold77@gmail.com",
"password": "G1o2l3d4j5e6r7!?",
"full_name": "Elfrandt Ganteng",
"confirm_password": "G1o2l3d4j5e6r7!?"
}

### Get Users

GET localhost:5001/api/users

### Login Users

POST localhost:5001/api/auth/login
{
"email": "elfrandtgold77@gmail.com",
"password": "G1o2l3d4j5e6r7!?"
}

### Protected

GET localhost:5001/api/auth/protected
Headers: Authentication, jwt {token}

### Profile Users{
"estimationId": "{{id_estimasi}}",
"code": "UNTAR",
"fare": "{{harga_estimasi}}"
}

GET localhost:5001/api/users/profile

### Update Profile

PUT localhost:5001/api/users/profile
{
"phone_number": "085770607933",
"profile_picture": "https://images.ctfassets.net/100cwma5ubtt/1GiiFUhJfnfFaV9apeWqYo/24d806d058e8892474c72197daec2486/FS_1440x810_cat-entertainment_7-reasons-you-should-adopt-a-cat.jpg?fm=webp&w=1200&q=50"
}

### Change Password

PUT localhost:5001/api/users/change-password
{
"old_password": "G1o2l3d4j5e6r7!?",
"new_password": "12345678",
"confirm_new_password": "12345678"
}

### Update Users

PUT localhost:5001/api/users/:id
{
"email": "email_baru@untar.ac.id",
"full_name": "Nama Baru Tersimpan"
}

### Delete Users

DELETE localhost:5001/api/users/:id

## Promo (Elfrandt Goldjer (535250092))

### Get Promo

GET localhost:5001/api/promos

### Delete Promo

DELETE localhost:5001/api/promos/:id

### Validate Promo

POST localhost:5001/api/promos/validate


### Create Promo

POST localhost:5001/api/promos
{
"estimationId": "{{id_estimasi}}", //optional
"fare": "{{harga_estimasi}}",
"code": "UNTAR",
"discount_percentage": 20,
"max_discount": 15000,
"expiry_date": "2026-12-31T23:59:59.000Z"
}

## REVIEWS (William Richie 535250075)

### Create Review (Membuat Review)

Membuat review perjalanan berdasarkan rideId (sama dengan bookingId)

1. Endpoint: POST /api/reviews
2. URL: localhost:5000/api/reviews
3. Parameter: rideId, rating, comment, userId
4. Input: Request Body (dibagian raw)

```
{
    "rideId": "(rideId)",
    "rating": (rating 1 - 5),
    "comment": "(Komentar dari user)",
    "userId": "(userId)"
}
```

### Edit Review (Mengubah Review)

Mengubah review yang telah dibuat

1. Endpoint: PUT /api/reviews
2. URL: localhost:5000/api/reviews
3. Parameter: rideId, rating, comment, userId
4. Input: Request Body (dibagian raw)

```
{
    "rideId": "(rideId)",
    "rating": (rating baru 1 - 5),
    "comment": "(Komentar baru dari user)",
    "userId": "(userId)"
}
```

### Check Review (Melihat Review)

Melihat review yang telah dibuat user pada sebuah perjalanan

1. Endpoint: GET /api/reviews/:ride_id (Ganti :ride_id dengan rideId)
2. URL: localhost:5000/api/reviews/:ride_id (Ganti :ride_id dengan rideId)

## WALLETS (William Richie 535250075)

### Top-Up (Isi Saldo)

Mengisi saldo ke wallet user

1. Endpoint: POST /api/wallets
2. URL: localhost:5000/api/wallets
3. Parameter: userId, amount
4. Input: Request Body (dibagian raw)

```
{
  "userId": "(userId)",
  "amount": (nominal)
}
```

### Check Balance (Cek Saldo)

Melihat saldo wallet user

1. Endpoint: GET /api/wallets/balance/:id (Ganti :id dengan userId)
2. URL: localhost:5000/api/wallets/balance/:id (Ganti :id dengan userId)

### Check History (Cek Riwayat)

Melihat riwayat transaksi wallet user

1. Endpoint: GET /api/wallets/history/:id (Ganti :id dengan userId)
2. URL: localhost:5000/api/wallets/history/:id (Ganti :id dengan userId)

---

## DRIVERS (Owen Benedict Lukman 5353250067)

### Register Driver

Membuat akun baru untuk drivers
1. Endpoint: POST /api/auth/register/driver
2. URL: localhost:5000/api/auth/register/driver
3. Parameter: email, full_name, password, confirm_password
4. Input: Request Body (dibagian raw)
```
{
    "email": "string (email yang akan dimasukkan)",
    "full_name": "string (nama dari driver)",
    "password": "string (susunan kata sebagai pertahanan keamanan)",
    "confirm_password": "string (memastikan susunan kata di password sudah benar)"
}
```

### Login Driver

Membuat ke dalam akun driver dengan password untuk meningkatkan keamanan.
1. Endpoint: POST /api/auth/login
2. URL: localhost:5000/api/auth/login
3. Parameter: email, password
4. Input: Request Body (dibagian raw)
```
{
    "email": "string (email yang akan dimasukkan)",
    "password": "string (susunan kata sebagai pertahanan keamanan)"
}
```

### Cek Drivers Profile

Mengakses data-data dari seluruh akun drivers yang terdaftar di database.
1. Endpoint: GET /api/drivers/profile
2. URL: localhost:5000/api/drivers/profile

### Change Password (Mengubah Password)

Mengubah data password dalam akun driver
1. Endpoint: POST /api/drivers/changePassword
2. URL: localhost:5000/api/drivers/changePassword
3. Parameter: key (json web token), old_password, new_password, confirm_new_password
4. Input: Request Header + Request Body (dibagian raw)
```
key: Authentication
value: jwt <RANDOM_STRING>
```

```
{
    "old_password": "string (berisi password lama yang ingin diubah)",
    "new_password": "string (berisi password baru yang akan digunakan)",
    "confirm_new_password": "string (memastikan bahwa password yang ingin digunakan sudah sama)"
}
```

### Update Name (Mengubah nama driver)

Mengubah nama driver yang terdaftar di dalam database.
1. Endpoint: PUT /api/drivers/:id (:id itu userId)
2. URL: localhost:5000/api/drivers/:id (:id itu userId)
3. Parameter: email, full_name
4. Input: Request Body (dibagian raw)
```
{
    "email": "string (email dari driver)",
    "full_name": "string (nama yang akan menggantikan nama lama di database driver)"
}
```

### Status Driver

Melihat status driver pada bookings
1. Endpoint: GET /api/drivers/status/:id (:id itu userId)
2. URL: localhost:5000/api/drivers/status/:id (:id itu userId)

### Delete Driver (Menghapus akun driver)

Menghapus akun driver secara halus (Data tetap ada, namun sudah tidak bisa diakses >> Supaya tidak error saat di endpoint lain)
1. Endpoint: DELETE /api/drivers/:id (:id itu userId)
2. URL: localhost:5000/api/drivers/:id (:id itu userId)

---

## CHATS (Owen Benedict Lukman 5353250067)

### Send Message (Memberi pesan)

Memberikan message kepada pihak lain.
1. Endpoint: POST /api/chats/send
2. URL: localhost:5000/api/chats/send
3. Parameter: rideId, senderId, message
4. Input: Request Body (dibagian raw)
```
{
    "rideId": "string (id yang sama dengan bookingsId)",
    "senderId": "string (id yang dimasukkan antara userId dan driverId, yang akan menentukan role nya)",
    "message": "string (isi pesan yang akan dikirim)
}
```

### Chat Log

Mengakses isi chat dari sender (Tidak peduli itu user atau driver).
1. Endpoint: GET /api/chats/messages/:id (:id itu rideId)
2. URL: localhost:5000/api/messages/:id (:id itu rideId)

### Edit Message (Mengubah pesan)

Mengedit dan mengubah pesan yang dikirim sebelumnya.
1. Endpoint: POST /api/chats/edit
2. URL: localhost:5000/api/chats/edit
3. Parameter: id, message
4. Input: Request Body (dibagian raw)
```
{
    "id": "string (id yang digunakan adalah chatId)",
    "message": "string (isi pesan yang akan mengedit pesan lama)
}
```

### Delete Chat (Menghapus pesan)

Menghapus pesan yang sudah dikirimkan
1. Endpoint: GET /api/chats/messages/:id (:id itu chatId)
2. URL: localhost:5000/api/chats/messages/:id (:id itu chatId)

---

## BOOKINGS (Sheireen Sadeli 535250083)

### Endpoint untuk Membuat Booking Baru

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

### Endpoint untuk Mendapatkan Pesanan yang Aktif (Booking Actives)

-> mengambil data booking yang sedang berlangsung (status: confirmed, on_way)

1. Endpoint: GET /api/bookings/actives
2. URL: localhost:5000/api/bookings/actives
3. Parameter: userId
4. Input: Query Parameter (di tab Params)

### Endpoint untuk Mendapatkan Riwayat Pesanan (Booking History)

-> mengambil seluruh daftar transaksi perjalanan yang pernah dilakukan oleh user (status: completed)

1. Endpoint: GET /api/bookings/history
2. URL: localhost:5000/api/bookings/history
3. Parameter: userId
4. Input: Query Parameter (di tab Params)

### Endpoint untuk Memperbarui Data Pesanan

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

### Endpoint untuk Menghapus Data Pesanan

-> mengambil seluruh daftar transaksi perjalanan yang pernah dilakukan oleh user (status: completed)

1. Endpoint: DELETE /api/bookings/:id
2. URL: localhost:5000/api/bookings/:id
3. Parameter: id
4. Input: URL Parameter

---

## NOTIFICATIONS (Sheireen Sadeli 535250083)

### Endpoint untuk Mengambil Notifikasi User

-> menampilkan seluruh daftar pesan notifikasi yang masuk ke akun user

1. Endpoint: GET /api/notifications
2. URL: localhost:5000/api/notifications
3. Parameter: userId
4. Input: Query Parameter (di tab Params)

### Endpoint untuk Mengirim Notifikasi Baru

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

### Endpoint untuk Menghapus Riwayat Notifikasi

-> membersihkan seluruh daftar notifikasi yang dimiliki oleh user

1. Endpoint: DELETE /api/notifications/clear
2. URL: localhost:5000/api/notifications/clear
3. Parameter: userId
4. Input: Query Parameter (di tab Params)

## HELP CENTER (Darren Sebastian 535250076)

### Endpoint untuk Membuat Tiket Baru

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

### Endpoint untuk Mengecek Daftar Tiket User

-> Mengambil semua tiket yang pernah dibuat oleh user tertentu.

1. Endpoint: GET /api/helpcenter/tickets
2. URL: localhost:5000/api/helpcenter/tickets?userId=
3. Parameter: userId
4. Input: Query Parameter (di params)

### Endpoint untuk Melihat Detail Tiket

-> Mengambil informasi mendalam dari satu tiket spesifik berdasarkan ID Transaksi.

1. Endpoint: GET /api/helpcenter/tickets/:tickets_Id
2. URL: localhost:5000/api/helpcenter/tickets/:tickets_Id
3. Parameter: tickets_id
4. Input: Path Parameter (rideId)

### Endpoint untuk Menambah Balasan (Reply)

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

### Endpoint untuk Menyelesaikan Tiket

-> Mengubah status tiket menjadi selesai atau resolved.

1. Endpoint: PUT /api/helpcenter/tickets/:tickets_id/resolve
2. URL: localhost:5000/api/helpcenter/tickets/tickets_id/resolve
3. Parameter: tickets_id
4. Input: Path Parameter

## ESTIMATION (Darren Sebastian 535250076)

### Endpoint untuk Membuat Estimasi Baru

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

#### 1.1 Post-Response

```
let responseData = pm.response.json();
pm.environment.set("harga_estimasi", responseData.fare);
```

### Endpoint untuk Update Rute Estimasi

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

### Endpoint untuk Mengambil / Menghapus Estimasi Berdasarkan ID

-> Digunakan untuk melihat detail atau menghapus data estimasi dari database.

1. Endpoint: GET / DELETE /api/estimations/:estimations_id
2. URL: localhost:5001/api/estimations/69e3c37ac4f08e6ddbaa9e67
3. Parameters: id
4. Input: Path Parameter (id)
