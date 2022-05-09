import { useEffect, useState } from "react";

function TextFilter(props) {
    const [input, setInput] = useState('');

    // ทุกครั้งที่ input มีการ update ตัว state searchText ต้องรอ 3 วินาที ถึงจะ update ตาม แต่สิ่งที่เราต้องการคือ พิมพ์ตัวสุดท้ายจบ searchText ค่อย update หลังจากผ่านไป 3 วิ (update แค่ครั้งเดียว) ดังนั้น ต้องใช้ cleaning effect
    useEffect( () => {
        // setTimeout ใช้ถ่วงเวลาไม่ให้ state searchText update ทันทีที่พิมพ์
        const timerId = setTimeout( () => props.setSearchText(input), 3000);
        // cleaning effect ช่วย clear timerId ให้เหลือตัวเดียวหลังจากพิมพ์เสร็จ แล้วพอผ่านไป 3 วินาที setSearchText ถึงจะ update 
        return () => clearTimeout(timerId);
    }, [input, props]); // ใส่ props เข้าไปเพราะ โปรแกรมมัน warning มาว่า props ที่ส่งมาใช้กับ useEffect ค่ามันมีสิทธิ์เปลี่ยนได้ ให้ใส่เข้าไปเป็น dependencies ด้วย ซึ่งจริงๆ ไม่ใส่ก็ได้ เพราะ setSearchText จะมีค่าเดิมตลอดทุกการทำงาน แต่โปรแกรมมันไม่รู้เลยขึ้นมาแนะนำ

    const handleText = (e) => {
        // update แค่ text แต่ status ค่าเดิม ใช้ callback เพราะไม่มีตัวเดิมมาใช้ ต้องใช้อันที่เป็นปัจจุบัน
        // props.setSearchText(prev => ({...prev, text: e.target.value }));
        // props.setSearchText(e.target.value);

        // set ค่าใหม่ เพื่อเอาไปใช้ถ่วงเวลา ไม่ให้ state searchText update ทันที
        setInput(e.target.value);
    }
    return(
        <div className="input-group">
            {/* <input type='text' className="form-control rounded-0" value={props.text} onChange={handleText}/> วิธีนี้ทำให้เกิดการส่ง request ไป server ทุกตัวอักษรที่พิมพ์จะทำให้ server ทำงานหนัก */}
            <input type='text' className="form-control rounded-0" value={input} onChange={handleText}/>
            {/* <button  className="btn btn-secondary rounded-0" onClick={() => props.setSearchText(prev => ( {...prev, text: ''} ) )} > */}
            {/* <button  className="btn btn-secondary rounded-0" onClick={() => props.setSearchText('')} > */}
            <button  className="btn btn-secondary rounded-0" onClick={() => setInput('')} >
                <i className="fa-solid fa-xmark"/>
            </button>
        </div> 
    )
}
export default TextFilter;