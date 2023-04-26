const express = require("express");
const cors = require("cors");
const path = require("path");


const app = express();
app.use(cors());

const urunler = [
    {"isim": "Deri Çanta", "fiyat": 100, "stok": 5},
    {"isim": "Spor Ayakkabı", "fiyat": 200, "stok": 10},
    {"isim": "Siyah Ceket", "fiyat": 150, "stok": 2},
    {"isim": "Kadın Pantolon", "fiyat": 80, "stok": 7},
    {'isim': 'Deri Cüzdan', 'fiyat': 50.0, 'stok': 10},
    {'isim': 'Kanvas Sırt Çantası', 'fiyat': 75.0, 'stok': 7},
    {'isim': 'Kumaş Şapka', 'fiyat': 20.0, 'stok': 20},
    {'isim': 'Polar Bere', 'fiyat': 15.0, 'stok': 30},
    {'isim': 'Kürklü Eldiven', 'fiyat': 35.0, 'stok': 12},
    {'isim': 'Deri Ayakkabı', 'fiyat': 150.0, 'stok': 3},
]


app.use(express.json());

function Promosyon (numara){
    var first4 = numara.substring(0,4);
    var last4 = numara.substring(numara.length - 4);
    
    var x = 2023 - first4;

    var last4data = last4.split("");
    const promosyon = (Number(last4data[0])* x ** 3 + Number(last4data[1]) * x ** 2 + Number(last4data[2]) * x + Number(last4data[3])) / x ** 4; 
  
    return promosyon;
}

app.use("/api",(req,res)=>{
    const data = []
    urunler.find((urun)=>{
       if(urun.isim.includes(req.query.q)){
        urun.promosyon = (1 - Promosyon(req.query.n)) * urun.fiyat;
        data.push(urun)
    }
        })
    res.json({data : data , time : Date.now()} );
});

const PORT = 8080;

app.listen(PORT ,()=>{
    console.log("backend server is running");
})