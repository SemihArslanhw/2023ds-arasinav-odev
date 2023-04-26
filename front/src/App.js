import { useState } from 'react';
import './App.css';

function App() {
  
  const [data , setData] = useState([]);
  const [time , setTime] = useState(0);
  const [numara , setNumara] = useState("");
  const [q , setQ] = useState("");
  
  return (
    <div className="App">
      <h1 className='title'>Ürün Arama</h1>
      <h2 className='subtitle'>Öğrenci numaranızı giriniz</h2>
      <input className='input' value={numara} onChange={(e)=>setNumara(e.target.value)}></input>
      <h2 className='subtitle'>Ürün ismi giriniz</h2>
      <input className='input' value={q} onChange={(e)=>{setQ(e.target.value)}}></input>
      <button className='button' onClick={()=>{fetch(`http://localhost:8080/api?q=${q}&n=${numara}`).then(res=>res.json()).then(data=>{setData(data.data);setTime(data.time)})}}>Ara</button>
        {data.map((urun)=>{
          return(
            <div className='urun'>
              <div className='urun-isim'>İsim : {urun.isim}</div>
              <div className='urun-fiyat'>Fiyat : {urun.fiyat}</div>
              <div className='urun-stok'>Stok : {urun.stok}</div>
              <div className='urun-promosyon'>Promosyon : {urun.promosyon}</div>
              </div>
          )
        })}
        {time !== 0 && <div className='time'>İsteğin yapıldığı zaman : {new Date(time).toString()}</div>}
    </div>
  );
}

export default App;
