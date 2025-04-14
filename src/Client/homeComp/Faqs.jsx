// import React, { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/all";
// gsap.registerPlugin(ScrollTrigger);

// const Faqs = () => {
//   const faqs = [
//     {
//       ques: "แฮมเบอร์เกอร์เซาท์ ตอกย้ำจัมโบ้แรลลี่ทอร์ ?",
//       ans: "เยอบีราโปรโมเตอร์ รวมมิตรเทรลเล่อร์คลาสสิกฟิวเจอร์ ยอน คอร์สมุมมองป๊อก มินต์จัมโบ้อะ ดยุกอยุติธรรมสตาร์ท โดมิโน ฮีโร่ สปิริต คาวบอยหลวงปู่เปียโนขั้นตอน อาว์ ศิลปวัฒนธรรมล็อบบี้ เลิฟ วีเจโฟนคาวบอย อิ่มแปร้พาร์ทเนอร์ ศึกษาศาสสะบึมส์สะก อมบ๋อยไทยแลนด์ หมิงรามาธิบดี",
//     },
//     {
//       ques: "ลิมิตกษัตริยาธิราชเอ็กซ์เพรสแทงโก้โปรโมท ?",
//       ans: "ตพิสัยว้าวกิฟท์แฟรี่ อไรเซอร์ดีมานด์โปรโมเตอร์ คูลเลอร์ เคลื่อนย้ายปฏิสัมพันธ์เมเปิลพุทธศตวรรษโอ้ย เบนโตะสะบึมทำงานเซอร์บ๋อย แคนยอนไลฟ์เธคไอติมแฟร์ สุริยยาตร์ ยังไงโง่เขลาโดมิโนถ่ายทำ ออโต้จังโก้วิลเลจแฟลชแทงโก้สติ๊กเกอร์อีแต๋น เทป ไคลแมกซ์ซีอีโอมายาคติ ป่าไม้นู้ดแบนเนอร์ ห่วยเยลลี่ แอร์สเต็ปติว วันเวย์ โบตั๋นวีไอพีเทรนด์สโตร์",
//     },
//     {
//       ques: "แฟ้บชาร์ป โบตั๋นช็อต เตี๊ยมน็อก ?",
//       ans: " สันทนาการอ่อนด้อยคำตอบฮัลโลวีน ปฏิสัมพันธ์คัตเอาต์ไมค์ซีอีโอเป็นไง สกรัมฮิต โบรชัวร์ อมาตยาธิปไตยมอนสเตอร์แบ็กโฮจูเนีอไรเซอร์ดีมานด์โปรโมเตอร์ คูลเลอร์ เคลื่อนย้ายปฏิสัมพันธ์เมเปิลพุทธศตวรรษโอ้ย เบนโตะสะบึมทำงานเซอร์บ๋อย แคนยอนไลฟ์เธคไอติมแฟร์ สุริยยาตร์ ยังไงโง่เขลาโดมิโนถ่ายทำ ออโต้จังโก้วิลเลจยร์เคลียร์ น็อกแต๋ว ฮ่องเต้โชห่วยไง",
//     },
//     {
//       ques: "อัตลักษณ์ปิกอัพผู้นำเก๊ะโฟน",
//       ans: "โฮป เกสต์เฮอไรเซอร์ดีมานด์โปรโมเตอร์ คูลเลอร์ เคลื่อนย้ายปฏิสัมพันธ์เมเปิลพุทธศตวรรษโอ้ย เบนโตะสะบึมทำงานเซอร์บ๋อย แคนยอนไลฟ์เธคไอติมแฟร์ สุริยยาตร์ ยังไงโง่เขลาโดมิโนถ่ายทำ ออโต้จังโก้วิลเลจาส์เดี้ยง รุสโซเจ๊เด้อแอปเปิลเยอบีร่า ซาบะแ",
//     },
//     {
//       ques: "ราเม็ง โมเต็ล ว้อดก้าเทรลเลอร์แคมปัส ?",
//       ans: "แฮมเบอร์เกอร์อไรเซอร์ดีมานด์โปรโมเตอร์ คูลเลอร์ เคลื่อนย้ายปฏิสัมพันธ์เมเปิลพุทธศตวรรษโอ้ย เบนโตะสะบึมทำงานเซอร์บ๋อย แคนยอนไลฟ์เธคไอติมแฟร์ สุริยยาตร์ ยังไงโง่เขลาโดมิโนถ่ายทำ ออโต้จังโก้วิลเลจสตรอเบอร์รี ตรวจทานพลาซ่าพลาซ่าพรีเซ็นเตอร์ภควัทคีตา แฟร์โหง",
//     },
//   ];

//   const containerRef = useRef(null);
//   const itemRefs = useRef([]);

//   useEffect(() => {
//     const itemsTL = gsap.timeline({
//       scrollTrigger: {
//         trigger: containerRef.current,
//         // start: "top 10%",
//         start: "top top",
//         end: "bottom bottom",
//         // end: "bottom 50%",
//         // markers: true,
//         scrub: 2
//       }
//     })

//     // const itemsTL = gsap.timeline();
//     itemRefs.current.forEach(item => (
//       itemsTL.fromTo(
//         item,
//         { x: 100, opacity: 0 },
//         { x: 0, opacity: 1, duration: .6, ease: "power2.out" }
//       )

//     ))
//   }, [])

//   return (
//     <main ref={containerRef} className="faqs-container row m-0">
//         <section className="title-container col-md-6">
//             <h1 className="title">What you want to know ?</h1>
//         </section>

//       <div className="accordion col-md-6" id="accordionParent">
//         {faqs.map((faq, idx) => (
//           <div 
//             ref={el => itemRefs.current[idx] = el}
//             className="accordion-item"
//             key={idx}
//           >
//             <h2 className="accordion-header">
//               <button
//                 className={`accordion-button ${idx !== 0 ? "collapsed" : ""}`}
//                 type="button"
//                 data-bs-toggle="collapse"
//                 data-bs-target={`#collapse${idx}`}
//                 aria-expanded={idx !== 0 ? "true" : "false"}
//                 aria-controls={`collapse${idx}`}
//               >
//                 <h1 className="ques">{faq.ques}</h1>
//               </button>
//             </h2>
//             <div
//               id={`collapse${idx}`}
//               className={`accordion-collapse collapse ${
//                 idx === 0 ? "show" : ""
//               }`}
//               data-bs-parent="#accordionParent"
//             >
//               <div className="accordion-body">{faq.ans}</div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </main>
//   );
// };

// export default Faqs;
