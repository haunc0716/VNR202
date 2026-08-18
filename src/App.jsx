import React, { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Environment, Float, Sparkles } from '@react-three/drei';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import './App.css';

const stages = [
  { id:'01', period:'1939–1940', title:'Chọn đúng hướng rèn', sub:'Phần thân chìa',
    summary:'Khi chiến tranh bùng nổ và Đông Dương chịu cảnh “một cổ hai tròng”, Đảng chuyển trọng tâm sang nhiệm vụ giải phóng dân tộc.',
    events:[['09/1939','Chiến tranh thế giới thứ hai bùng nổ.'],['28/9/1939','Đảng Cộng sản Đông Dương bị đặt ra ngoài vòng pháp luật.'],['11/1939','Hội nghị Trung ương 6 đặt quyền lợi dân tộc lên hàng đầu.'],['27/9/1940','Khởi nghĩa Bắc Sơn — tiếng súng báo hiệu đấu tranh vũ trang.'],['23/11/1940','Khởi nghĩa Nam Kỳ bùng nổ, để lại kinh nghiệm xương máu.']],
    insight:'Trước khi có ổ khóa tháng 8, chiếc chìa đã được chọn hình dạng và bắt đầu được rèn.' },
  { id:'02', period:'1941–1944', title:'Rèn từng khớp chìa', sub:'Phần răng cưa',
    summary:'Đường lối được hoàn chỉnh; Việt Minh, lực lượng chính trị, căn cứ địa và lực lượng vũ trang được gây dựng.',
    events:[['28/1/1941','Nguyễn Ái Quốc về nước, trực tiếp lãnh đạo tại Cao Bằng.'],['05/1941','Hội nghị Trung ương 8 xác định nhiệm vụ cấp bách là dân tộc giải phóng.'],['1941–43','Việt Minh và các hội Cứu quốc mở rộng lực lượng chính trị.'],['1943','Đề cương văn hóa Việt Nam — văn hóa trở thành một trận địa cách mạng.'],['22/12/1944','Đội Việt Nam Tuyên truyền Giải phóng quân ra đời.']],
    insight:'Một thanh chìa trơn không mở được khóa. “Răng cưa” chính là lực lượng chính trị, lực lượng vũ trang và căn cứ địa được chuẩn bị trước thời cơ.' },
  { id:'03', period:'1945', title:'Hoàn thiện trước khi ổ khóa mở', sub:'Mảnh cuối cùng',
    summary:'Nhật đảo chính Pháp. Đảng phản ứng kịp thời, phát động cao trào kháng Nhật, thống nhất lực lượng và mở rộng khu giải phóng.',
    events:[['09/3/1945','Nhật đảo chính, lật đổ Pháp và độc chiếm Đông Dương.'],['12/3/1945','Chỉ thị “Nhật – Pháp bắn nhau và hành động của chúng ta”.'],['15/5/1945','Thống nhất các lực lượng vũ trang thành Việt Nam Giải phóng quân.'],['04/6/1945','Khu giải phóng Việt Bắc chính thức thành lập.'],['15/8/1945','Nhật đầu hàng — thời cơ tổng khởi nghĩa xuất hiện.']],
    insight:'Thời cơ là điều kiện khách quan; sự chuẩn bị trước đó là điều kiện để biến thời cơ thành thắng lợi.' }
];

function KeyModel({ completion=0, turning=false }){
  const ref=useRef();
  const piece1Ref=useRef();
  const piece2Ref=useRef();
  const piece3Ref=useRef();

  useFrame((s,d)=>{
    if(ref.current){
      ref.current.rotation.y += d*(turning?1.8:.3);
      ref.current.rotation.z = Math.sin(s.clock.elapsedTime*.7)*.03;
    }

    if(piece1Ref.current){
      piece1Ref.current.position.x = THREE.MathUtils.damp(piece1Ref.current.position.x,0,5,d);
      piece1Ref.current.position.y = THREE.MathUtils.damp(piece1Ref.current.position.y,0,5,d);
      piece1Ref.current.rotation.z = THREE.MathUtils.damp(piece1Ref.current.rotation.z,0,5,d);
    }
    if(piece2Ref.current){
      piece2Ref.current.position.x = THREE.MathUtils.damp(piece2Ref.current.position.x,0,5,d);
      piece2Ref.current.position.y = THREE.MathUtils.damp(piece2Ref.current.position.y,0,5,d);
      piece2Ref.current.rotation.z = THREE.MathUtils.damp(piece2Ref.current.rotation.z,0,5,d);
    }
    if(piece3Ref.current){
      piece3Ref.current.position.x = THREE.MathUtils.damp(piece3Ref.current.position.x,0,5,d);
      piece3Ref.current.position.y = THREE.MathUtils.damp(piece3Ref.current.position.y,0,5,d);
      piece3Ref.current.rotation.z = THREE.MathUtils.damp(piece3Ref.current.rotation.z,0,5,d);
    }
  });

  const has1 = completion >= 1/3;
  const has2 = completion >= 2/3;
  const has3 = completion >= 1;

  return <group ref={ref} rotation={[.18,-.35,-.12]}>
    {!has1 && <mesh position={[0,0,0]} castShadow>
      <boxGeometry args={[1.55,.10,.10]}/>
      <meshStandardMaterial color="#6b5127" metalness={.92} roughness={.34} emissive="#211708" emissiveIntensity={.15}/>
    </mesh>}

    {has1 && <group ref={piece1Ref} position={[-1.8,.55,0]} rotation={[0,0,-.45]}>
      <mesh castShadow>
        <cylinderGeometry args={[.105,.105,1.65,32]}/>
        <meshStandardMaterial color="#d2ad5b" metalness={.98} roughness={.17} emissive="#5d3f10" emissiveIntensity={.14}/>
      </mesh>
      <mesh position={[0,1.095,0]} castShadow>
        <torusGeometry args={[.32,.075,18,60]}/>
        <meshStandardMaterial color="#e0bf70" metalness={1} roughness={.13}/>
      </mesh>
    </group>}

    {has2 && <group ref={piece2Ref} position={[1.8,-.15,0]} rotation={[0,0,.5]}>
      {[0,1,2,3,4].map((i)=><mesh key={i} position={[.23,-.5+i*.23,0]} castShadow>
        <boxGeometry args={[.26,.10,.10]}/>
        <meshStandardMaterial color="#d9b765" metalness={.95} roughness={.2}/>
      </mesh>)}
    </group>}

    {has3 && <group ref={piece3Ref} position={[-1.7,-1.25,0]} rotation={[0,0,-.55]}>
      <mesh position={[.23,-.02,0]} castShadow>
        <boxGeometry args={[.42,.18,.18]}/>
        <meshStandardMaterial color="#d9b765" metalness={.97} roughness={.18}/>
      </mesh>
      <mesh position={[.39,-.02,0]} castShadow>
        <boxGeometry args={[.16,.28,.18]}/>
        <meshStandardMaterial color="#b99347" metalness={1} roughness={.17}/>
      </mesh>
      <mesh position={[0,.22,0]} castShadow>
        <sphereGeometry args={[.16,20,20]}/>
        <meshStandardMaterial color="#b99347" metalness={1} roughness={.17}/>
      </mesh>
    </group>}
  </group>
}
function KeyScene({completion=0,turning=false,className=''}){
  return <div className={`key-scene ${className}`}><Canvas camera={{position:[0,.05,4.6],fov:34}} dpr={[1,1.6]} shadows>
    <ambientLight intensity={.42}/><spotLight position={[3,4,4]} intensity={9} angle={.42} penumbra={1} castShadow/>
    <pointLight position={[-2.5,0,2]} intensity={3.2} color="#a6762d"/><pointLight position={[1,-2,-2]} intensity={1.5} color="#fff4cf"/>
    <Float speed={1.05} rotationIntensity={.07} floatIntensity={.18}><KeyModel completion={completion} turning={turning}/></Float>
    <Sparkles count={70} scale={4.8} size={1.5} speed={.3} color="#e5c57b"/><Environment preset="studio"/>
  </Canvas></div>
}
function DoorScene({open}){
  return <div className={`door-visual ${open?'is-open':''}`}><div className="door-backdrop"/><div className="door-frame"><div className="door-glow"/><div className="door-leaf"><div className="door-inset"/><div className="door-handle"/></div></div><div className="door-word">ĐỘC LẬP</div></div>
}

export default function App(){
  const {scrollYProgress}=useScroll();
  const progress=useSpring(scrollYProgress,{stiffness:70,damping:22,mass:.22});
  const heroY=useTransform(scrollYProgress,[0,.16],[0,-95]);
  const heroOpacity=useTransform(scrollYProgress,[0,.14],[1,.16]);
  const [before,setBefore]=useState(null),[after,setAfter]=useState(null),[piece,setPiece]=useState(0),[active,setActive]=useState(0),[open,setOpen]=useState(false),[menu,setMenu]=useState(false);
  const stats=useMemo(()=>{const b=before==='prepared'?48:before==='luck'?22:50;const a=after==='prepared'?86:after==='luck'?16:50;return {bl:100-b,bp:b,al:100-a,ap:a}},[before,after]);
  const chooseStage=(i)=>{
    if(i > piece) return;
    setActive(i);
    if(i === piece) setPiece(v=>v+1);
    document.getElementById('forge-detail')?.scrollIntoView({behavior:'smooth',block:'center'});
  };
  return <div className="app-shell">
    <div className="grain-overlay"/><div className="vignette-overlay"/><motion.div className="reading-line" style={{scaleX:progress}}/>
    <header className="topbar"><a className="brand" href="#top"><span>1945</span><b>THE KEY</b></a><nav className={menu?'open':''}><a href="#gate">Cánh cửa</a><a href="#forge">Ba mảnh ghép</a><a href="#moment">Thời cơ</a><a href="#verdict">Kết luận</a></nav><small>VNR202 · 1939—1945</small><button className="menu-btn" onClick={()=>setMenu(v=>!v)} aria-label="Menu"><i/><i/></button></header>
    <main>
      <section className="hero" id="top"><motion.div className="hero-aura" style={{y:heroY}}/><motion.div className="hero-copy" style={{opacity:heroOpacity}}>
        <div className="eyebrow">CHƯƠNG 1 · 1.2.3 · PHONG TRÀO GIẢI PHÓNG DÂN TỘC</div>
        <h1><span>Ổ khóa xuất hiện</span><span>trong một đêm.</span><em>Chiếc chìa</em><span>được rèn suốt sáu năm.</span></h1>
        <p>Liệu Cách mạng Tháng Tám 1945 là một cuộc “ăn may” của lịch sử — hay là khoảnh khắc một chiếc chìa đã được rèn đủ kỹ gặp đúng ổ khóa?</p>
        <div className="hero-actions"><a className="btn brass" href="#gate">BẮT ĐẦU CÂU CHUYỆN ↓</a><a className="btn quiet" href="#gate">BÌNH CHỌN TRƯỚC KHI XEM</a></div>
        <div className="hero-stats"><div><b>1939–45</b><span>Phong trào giải phóng</span></div><div><b>03</b><span>Mảnh ghép</span></div><div><b>15</b><span>Ngày làm nên tháng 8</span></div></div>
      </motion.div><div className="hero-object"><KeyScene completion={piece/3}/><div className="object-label">CHÌA KHÓA <small>chưa hoàn thiện</small></div></div><div className="scroll-cue"><i/> SCROLL TO UNLOCK</div></section>

      <section className="section" id="gate"><div className="index">MỤC 01 — CÁNH CỬA THÁNG TÁM</div><div className="gate-grid"><div><h2>Chiếc chìa này <em>nhặt được</em>, hay <strong>được rèn sẵn?</strong></h2><p>Ngày 15/8/1945, Nhật tuyên bố đầu hàng Đồng minh. Quân Nhật ở Đông Dương mất tinh thần, chính quyền thân Nhật hoang mang. Đó là thời cơ khách quan rất thuận lợi — nhưng thời cơ tự nó không mở được cánh cửa.</p><blockquote>“Nếu không có chiếc chìa, đứng trước cánh cửa mở ra cũng chưa chắc bước qua được.”</blockquote></div>
        <div className="vote-panel"><div className="mini-kicker">GIỮ LẠI CÂU TRẢ LỜI ĐẦU TIÊN</div><h3>Bạn nghiêng về đâu sau khi chỉ nhìn vào tháng 8/1945?</h3><div className="choices"><button className={before==='luck'?'selected':''} onClick={()=>setBefore('luck')}><span>01</span><b>CHÌA KHÓA TÌNH CỜ NHẶT ĐƯỢC</b><i>“Ăn may”</i></button><button className={before==='prepared'?'selected':''} onClick={()=>setBefore('prepared')}><span>02</span><b>CHÌA KHÓA ĐƯỢC RÈN SẴN</b><i>“Chuẩn bị”</i></button></div><div className="meter"><i style={{width:`${stats.bl}%`}}/><i style={{width:`${stats.bp}%`}}/></div><div className="meter-label"><span>Ăn may {stats.bl}%</span><span>Chuẩn bị {stats.bp}%</span></div><small className="note">Kết quả sẽ được đối chiếu lại ở cuối câu chuyện.</small></div></div></section>

      <section className="section forge" id="forge"><div className="index">MỤC 02 — BA MẢNH GHÉP CỦA CHÌA KHÓA</div><div className="intro"><h2>Một chiếc chìa<br/>không hình thành <em>trong một đêm.</em></h2><p>Ba công đoạn: chọn đúng hình dạng, mài từng khớp, rồi hoàn thiện đúng lúc ổ khóa xuất hiện. Click một mảnh — chiếc chìa trên màn hình thay đổi theo.</p></div>
        <div className="forge-stage"><div className="forge-nav">{stages.map((s,i)=>{const collected=piece>i;const locked=i>piece;return <button key={s.id} className={`${active===i?'active ':''}${locked?'locked':''}`} onClick={()=>chooseStage(i)} disabled={locked}><span>MẢNH {s.id}</span><b>{s.period}</b><strong>{s.title}</strong><small>{collected?'✓ ĐÃ RÈN':locked?'🔒 CHƯA MỞ': 'CLICK ĐỂ RÈN'}</small></button>})}</div>
          <div className="forge-key"><div className="orbit o1"/><div className="orbit o2"/><div className="orbit o3"/><KeyScene completion={piece/3}/><div className="progress-note"><b>{piece}/3</b> MẢNH ĐÃ GHÉP · {piece===0?'PHÔI KIM LOẠI':piece===1?'ĐÃ CÓ PHẦN THÂN':piece===2?'ĐÃ CÓ RĂNG CƯA':'CHÌA KHÓA HOÀN CHỈNH'}</div></div>
          <motion.div className="forge-detail" id="forge-detail" key={active} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}><span className="detail-tag">MẢNH {stages[active].id} · {stages[active].period}</span><h3>{stages[active].title}</h3><em>{stages[active].sub}</em><p>{stages[active].summary}</p><div className="events">{stages[active].events.map(([d,t])=><div key={d+t}><span>{d}</span><p>{t}</p></div>)}</div><div className="insight"><b>Ý nghĩa với câu hỏi “ăn may”</b><p>{stages[active].insight}</p></div></motion.div>
        </div></section>

      <section className="section moment" id="moment"><div className="index">MỤC 03 — CHỚP THỜI CƠ</div><div className="moment-head"><h2><span>72 giờ.</span><em>Một quyết định.</em></h2><p>Ngày 9/3/1945 Nhật đảo chính Pháp. Chỉ ba ngày sau, Ban Thường vụ Trung ương Đảng ra Chỉ thị “Nhật – Pháp bắn nhau và hành động của chúng ta”.</p></div><div className="moment-grid"><div className="timeline">{[['09/03/1945','Nhật đảo chính Pháp','Ổ khóa bất ngờ lộ diện.'],['12/03/1945','Chỉ thị chiến lược','Xác định kẻ thù trước mắt: phát xít Nhật.'],['15/05/1945','Việt Nam Giải phóng quân','Thống nhất lực lượng vũ trang.'],['04/06/1945','Khu giải phóng Việt Bắc','Căn cứ địa chính của cách mạng.'],['15/08/1945','Nhật đầu hàng','Cánh cửa mở toang.']].map(([d,t,x],i)=><motion.div className={i===4?'hot':''} key={d} initial={{opacity:0,x:-12}} whileInView={{opacity:1,x:0}} viewport={{once:true,amount:.45}} transition={{delay:i*.07}}><span>{d}</span><i/><div><h3>{t}</h3><p>{x}</p></div></motion.div>)}</div><div className="proof"><b>72</b><span>GIỜ</span><p>Phản ứng trong vài ngày không phải biểu hiện của ngẫu nhiên. Nó cho thấy một bộ máy đã có đường lối, kinh nghiệm và khả năng phân tích tình hình.</p><small>09/03 → 12/03</small></div></div></section>

      <section className="section compare" id="compare"><div className="index">MỤC 04 — AI CŨNG ĐỨNG TRƯỚC CỬA</div><div className="intro"><h2>Cùng biết Nhật đã đầu hàng.<br/><em>Nhưng ai có chìa?</em></h2><p>Thời cơ khách quan là điều kiện chung. Khác biệt nằm ở ai đã chuẩn bị tổ chức, lực lượng, căn cứ và khả năng hành động trước khi thời cơ biến mất.</p></div><div className="cards">{[
        ['VIỆT MINH','🗝','CÓ CHÌA',['Tổ chức quần chúng rộng','Lực lượng vũ trang','Căn cứ địa','Đường lối và kinh nghiệm','Khả năng chớp thời cơ'],true],
        ['BẢO ĐẠI – TRẦN TRỌNG KIM','⌁','KHÔNG CÓ CHÌA',['Chính quyền do Nhật dựng lên','Phụ thuộc vào Nhật','Bộ máy rệu rã khi Nhật đầu hàng','Không có quá trình chuẩn bị tương ứng','Không giữ được chính quyền'],false],
        ['VIỆT QUỐC – VIỆT CÁCH','⌁','KHÔNG CÓ CHÌA',['Thiếu cơ sở quần chúng trong nước','Không có lực lượng vũ trang đáng kể','Không có căn cứ địa tương ứng','Phụ thuộc hậu thuẫn bên ngoài','Không tự mình giành chính quyền'],false]
      ].map(([name,icon,badge,rows,accent],i)=><motion.article key={name} className={accent?'accent':''} whileHover={{y:-8,rotateY:i===0?-1.5:1.5}}><b>{icon}</b><span>{badge}</span><h3>{name}</h3><ul>{rows.map(r=><li key={r}>{r}</li>)}</ul></motion.article>)}</div></section>

      <section className="section verdict" id="verdict"><div className="index">MỤC 05 — TRANH LUẬN</div><div className="moment-head"><h2>Chiếc chìa này:<br/><em>tự nhiên hay được rèn?</em></h2><p>Đặt trực diện hai luồng lập luận — rồi để chính chuỗi bằng chứng vừa đi qua trả lời.</p></div><div className="arguments"><article><div className="arg-kicker">LẬP LUẬN “ĂN MAY”</div><h3>Thời cơ đến quá bất ngờ.</h3><ul><li>Nhật đầu hàng ngày 15/8/1945.</li><li>Pháp chưa kịp quay lại tái chiếm.</li><li>Khoảng trống quyền lực xuất hiện trong thời gian rất ngắn.</li><li>Tốc độ giành chính quyền chỉ trong khoảng hai tuần.</li></ul></article><article className="answer"><div className="arg-kicker">PHẢN BIỆN CỦA NHÓM</div><h3>Ổ khóa bất ngờ. Chiếc chìa thì không.</h3><ul><li>Đường lối giải phóng dân tộc đã được điều chỉnh từ 1939.</li><li>Việt Minh, lực lượng vũ trang và căn cứ địa được xây dựng trước thời cơ.</li><li>Ngày 12/3/1945, Đảng phản ứng và định hướng hành động trong vài ngày.</li><li>Chỉ thị chủ trương sẵn sàng tổng khởi nghĩa khi đủ điều kiện.</li></ul><blockquote>“Ăn may là khi không có gì trong tay mà vẫn thắng. Còn ở đây, khi thời cơ xuất hiện — bàn tay đã có sẵn chiếc chìa.”</blockquote></article></div></section>

      <section className="section unlock" id="unlock"><div><div className="index">MỤC 06 — MỞ CỬA</div><h2>Chìa khóa<br/><em>vừa khít.</em></h2><p>Ba mảnh đã đủ. Bây giờ là khoảnh khắc thử chìa vào ổ khóa.</p><button className="btn brass" disabled={piece<3} onClick={()=>setOpen(true)}>{piece<3?'RÈN ĐỦ 3 MẢNH TRƯỚC':open?'CÁNH CỬA ĐÃ MỞ':'TRA CHÌA & MỞ CỬA →'}</button></div><DoorScene open={open}/></section>

      <section className="section final"><div className="index">MỤC 07 — ĐỐI CHIẾU CÂU TRẢ LỜI</div><h2>Ăn may là khi<br/><em>không có chìa.</em></h2><p className="lead">Thời cơ tháng 8/1945 là ổ khóa xuất hiện bất ngờ. Nhưng chiếc chìa để mở nó — đường lối từ 1939, lực lượng chính trị và vũ trang từ 1941–1944, phản ứng tức thời năm 1945 — đã được rèn ròng rã suốt sáu năm.</p><KeyScene completion={1} turning={open} className="final-key"/><div className="final-votes"><div><span>TRƯỚC CÂU CHUYỆN</span><i><b style={{width:`${stats.bp}%`}}/></i><small>{stats.bl}% “ăn may” · {stats.bp}% “chuẩn bị”</small></div><div><span>SAU CÂU CHUYỆN</span><i className="brass"><b style={{width:`${stats.ap}%`}}/></i><small>{stats.al}% “ăn may” · {stats.ap}% “được rèn sẵn”</small></div></div><div className="final-choice"><p>Sau tất cả bằng chứng vừa xem — bạn nghĩ sao bây giờ?</p><div><button className={after==='luck'?'selected':''} onClick={()=>setAfter('luck')}>ĂN MAY</button><button className={after==='prepared'?'selected':''} onClick={()=>setAfter('prepared')}>ĐƯỢC RÈN SẴN</button></div></div><div className="final-quote">“Thời cơ tháng 8/1945 là ổ khóa xuất hiện bất ngờ. Nhưng chiếc chìa để mở nó đã được rèn từ trước.”</div><small className="final-note">Cánh cửa đã mở. Câu chuyện còn lại nằm trong những mảnh ghép — mỗi quyết định, mỗi lực lượng, mỗi khoảnh khắc không bỏ lỡ.</small><footer><span>CHƯƠNG 1 · 1.2.3</span><span>LỊCH SỬ ĐẢNG CỘNG SẢN VIỆT NAM</span><span>THE KEY · 1945</span></footer></section>
    </main>
  </div>
}
