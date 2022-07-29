//declare yang dibutuhkan yaitu expressJS untuk routes dan mysql untuk koneksi ke database
const express = require("express") //fungsinya untuk bermain app.get yang bisa dibuka dibrowser untuk bermain routes
const mysql = require("mysql") // untuk koneksi ke databasenya
const BodyParser = require("body-parser")// kerena ada metode post yang dipakai maka harus require body parser

//Definisi express nya lagi karena express itu function, yang isinya adalah untuk membuka routes atau server sidenya javascript adalah express js
const application = express()

// format standar untuk menerima form input yang metodenya post
application.use(BodyParser.urlencoded({ extended: true }))

//setup databasenya
const db = mysql.createConnection({ //ini adalah configurasi awal
    host: "localhost",
    database: "KosTadikaMesra",
    user: "root",
    password: "",
})

application.set("view engine", "ejs") // ini untuk ngeset view engine yg dipakai adalah ejs
application.set("views", "views")  //ini untuk ngasih tau bahwa views/template engine(ejsnya)/html kita ada di folder views


// untuk menghubungkan ke mysql
db.connect((err) => { //terdapat callback yaitu errornya
    if (err) throw err // jika error maka lempar errornya
    console.log("database Connected...") //ngetes saja klw terhubung, dan akan terprint di terminal

    //untuk get data
    application.get("/", (req, res) => {    // untuk menampilkan ke alamat localhost:3000
        const sql = "SELECT * FROM KosTadikaMesra"  //versi mudahnya
        db.query(sql, (err, result) => {
            const dataBayar = JSON.parse(JSON.stringify(result)) //di parse dlu agar diterminal tidak muncul rawdatapocket lgi
            res.render("index", { data: dataBayar, title: "Pencatatan Pembayaran - Kos Pak Imam" }) //karena kita mau ngerender ke html yg ada di index, {} => supaya jadi objek
        })
        // res.send(dataBayar)   // untuk menampilkan data di layar
    })


    //untuk insert data
    application.post("/tambah", (req, res) => {
        const insertSql = `INSERT INTO KosTadikaMesra (bayarApa, siPembayar, totalBayar, persenPafras, persenHadad, persenFaldi, persenAthailah, tanggal, bulan, tahun) VALUES ('${req.body.button}', '${req.body.siPembayar}', '${req.body.totalBayar}', '${req.body.persenPafras}', '${req.body.persenHadad}', '${req.body.persenFaldi}', '${req.body.persenAthailah}', '${req.body.tanggal}', '${req.body.bulan}', '${req.body.tahun}');`
        db.query(insertSql, (err, result) => {
            if (err) throw err
            res.redirect("/");
        })
    })
})


application.listen(3000, () => (
    console.log("server ready....")
))

