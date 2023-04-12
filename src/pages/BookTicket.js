import './BookTicket.css'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import Axios from 'axios';


const BookTicket = () => {
  const [employeeList, setEmployeeList] = useState([]);


  const [selectedItems, setSelectedItems] = useState([]);
  const [food, setFood] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);
  const [orderid, setOrderid] = useState(0);

  const menu = [ 
    'ข้าวไข่เจียว', 'ข้าวหมูแดง', 'ข้าวหมูกรอบ', 'บะหมี่หมูแดง', 
    'บะหมี่หมูกรอบ', 'ข้าวมันไก่ต้ม', 'ข้าวมันไก่ทอด', 'ข้าวผัดกระเทียม', 
    'ข้าวผัดปลาสลิด', 'ข้าวเห็ดผัดน้ำมันหอย', 'ข้าวกะเพราเต้าหู้ไข่หมูสับ', 
    'ข้าวกุ้งทอดกระเทียม', 'ข้าวขาหมู', 'ข้าวต้มปลา', 'ข้าวผัดกะเพราไก่',
    'ข้าวหมูอบ','ไข่ดาว','ไข่ต้ม','ไข่ลวก'
  ]

  const handleItemClick = (item) => {
    const updatedSelectedItems = [...selectedItems, item];
    setSelectedItems(updatedSelectedItems);
    const updatedFood = [...food, item.name];
    setFood(updatedFood);
    const updatedTotalPrice = totalPrice + item.price;
    setTotalPrice(updatedTotalPrice);
    const updatedTotalCalories = totalCalories + item.calories;
    setTotalCalories(updatedTotalCalories);
  };

  const addEmployee = () => {
    Axios.post("http://localhost:3001/create", {
      orderID: orderid,
      food: food,
      price: totalPrice,
      calories: totalCalories,
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          orderID: orderid,
          food: food,
          price: totalPrice,
          calories: totalCalories,
        },
      ]);
      console.log(employeeList)
    });
  };

  const handleRemoveItemClick = (item) => {
    const updatedSelectedItems = selectedItems.filter(
      (selectedItem) => selectedItem.id !== item.id
    );
    setSelectedItems(updatedSelectedItems);


    if (updatedSelectedItems.length === 0) {
      console.log(item.id)

      setTotalPrice(0);
      setTotalCalories(0);
      setFood("")
      console.log(food)

    } else {
      console.log(item.id)
      setTotalPrice(prevTotalPrice => prevTotalPrice - item.price);
      setTotalCalories(prevTotalCalories => prevTotalCalories - item.calories);
      setFood(menu[20])
      console.log(food)
    }
  };
  return (

    <div className="food-menu">
      <Link to='/'><button className="buttonorb">
        Back
      </button>
      </Link>
      <h1 className="food-menu-title">Food Menu</h1>
      <ul className="menu-items">
        {menuItems.map((item) => (
          <li key={item.id} className="menu-item">
            <span className="item-info">
              {item.name} - {item.price}฿ - {item.calories} calories
            </span>
            <button className="add-button" onClick={() => handleItemClick(item)}>
              Add
            </button>
          </li>
        ))}
      </ul>
      <h2 className="selected-items-title">Selected Items</h2>
      <ul className="selected-items">
        {selectedItems.map((selectedItem) => (
          <li key={selectedItem.id} className="selected-item">
            <span className="item-info">
              {selectedItem.name} - {selectedItem.price}฿ - {selectedItem.calories} calories
            </span>

            <button
              className="remove-button"
              onClick={() => handleRemoveItemClick(selectedItem)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder=' orderID '
        className="field"
        onChange={(event) => {
          setOrderid(event.target.value)
        }}
      />
      <h3 className="total-price">Total Price : {totalPrice} ฿</h3>
      <h3 className="total-calories">Total Calories : {totalCalories} calories</h3>

      <button className="buttonmenu" onClick={addEmployee}>
        try
      </button>

      <Link to='./Payment'><button className="buttonmenu" onClick={addEmployee}>
        Checkout
      </button>
      </Link>


    </div>

  );
};



const menuItems = [
  { id: 1, name: 'ข้าวไข่เจียว', price: 50, calories: 400 },
  { id: 2, name: 'ข้าวหมูแดง', price: 70, calories: 540 },
  { id: 3, name: 'ข้าวหมูกรอบ', price: 70, calories: 600 },
  { id: 4, name: 'บะหมี่หมูแดง', price: 70, calories: 450 },
  { id: 5, name: 'บะหมี่หมูกรอบ', price: 70, calories: 500 },
  { id: 6, name: 'ข้าวมันไก่ต้ม', price: 60, calories: 585 },
  { id: 7, name: 'ข้าวมันไก่ทอด', price: 60, calories: 695 },
  { id: 8, name: 'ข้าวผัดกระเทียม', price: 60, calories: 400 },
  { id: 9, name: 'ข้าวผัดปลาสลิด', price: 65, calories: 540 },
  { id: 10, name: 'ข้าวเห็ดผัดน้ำมันหอย', price: 65, calories: 250 },
  { id: 11, name: 'ข้าวกะเพราเต้าหู้ไข่หมูสับ', price: 70, calories: 450 },
  { id: 12, name: 'ข้าวกะหล่ำปลีทอดน้ำปลาหมูกรอบ', price: 60, calories: 320 },
  { id: 13, name: 'ข้าวกุ้งทอดกระเทียม', price: 60, calories: 350 },
  { id: 14, name: 'ข้าวขาหมู', price: 60, calories: 690 },
  { id: 15, name: 'ข้าวต้มปลา', price: 60, calories: 325 },
  { id: 16, name: 'ข้าวผัดกะเพราไก่', price: 60, calories: 554 },
  { id: 17, name: 'ข้าวหมูอบ', price: 60, calories: 385 },
  { id: 18, name: 'ไข่ดาว', price: 10, calories: 165 },
  { id: 19, name: 'ไข่ต้ม', price: 10, calories: 155 },
  { id: 20, name: 'ไข่ลวก', price: 12, calories: 80 }
];





















































































// function BookTicket() {
//     const navigate = useNavigate();
//     const [isActive, setIsActive] = useState(false);
//     const [isActive1, setIsActive1] = useState(false);
//     const [isActive2, setIsActive2] = useState(false);
//     const [isActive3, setIsActive3] = useState(false);
//     const [selected, setSelected] = useState("")
//     const [selected1, setSelected1] = useState("")
//     const [selected2, setSelected2] = useState("")
//     const [selected3, setSelected3] = useState("")
//     const [totalLay, setTotallay] = useState(0)
//     const [employeeList,setEmployeeList] = useState([])
//     const origins = [
//         'กรุงเทพ'
//     ]
//     const destination = [
//         'เชียงใหม่', 'ลำปาง', 'พิษณุโลก', 'นครสวรรค์', 
//         'ลพบุรี' , 'อยุธยา', 'หนองคาย', 'ขอนแก่น',
//         'อุบลราชธานี', 'ศรีสะเกษ', 'บุรีรัมย์', 'นครราชสีมา',
//         'สระบุรี', 'นครศรีธรรมราช', 'ตรัง', 'ยะลา',
//         'หาดใหญ่', 'สุราษฎร์ธานี', 'หัวหิน'
//     ]
//     const time = [
//         '8:00', '15:00', '18:00'
//     ]
//     const layer = [
//         '1', '2', '3'
//     ]
//     const price_layer1= [
//         1653, 1572, 1354, 1038, 684, 543, 1557, 1398, 1520, 1476, 1376, 1230, 738, 1472, 1480, 1675, 1594, 1379, 982
//     ]
//     const price_layer2= [
//         1041, 1004, 889, 630, 374, 65, 998, 909, 981, 961, 785, 715, 154, 868, 871, 942, 905, 808, 532 
//     ]
//     const price_layer3= [
//         271, 256, 219, 198, 58, 45, 231, 187, 245, 237, 217, 100, 54, 283, 285, 355, 339, 297, 194
//     ]

//     const addEmployee = () => {
//         Axios.post("http://localhost:3001/create1", {
//             origin1:selected,
//             destination1:selected1,
//             time1:selected2,
//             class1:selected3,
//             total1:totalLay,
//         }).then(() => {
//           setEmployeeList([
//             ...employeeList,
//             {
//                 origin1:selected,
//                 destination1:selected1,
//                 time1:selected2,
//                 class1:selected3,
//                 total1:totalLay,
//             },
//           ]);
//           console.log(employeeList)
//         });
//       };

//     return(
//         <div>
//             <header>
//                 <Link to="/" ><img className='bt_home' src='/train3.jpg' alt='home'/></Link>
//                 <h2 className='header'> Book Tickets </h2> 
//             </header>
//             <div className='row_tickets'>
//                 <div className='drop_down'>
//                     <div className='text'>ต้นทาง</div>
//                     <div className='drop_bt' onClick={(e) =>
//                     setIsActive(!isActive)}>
//                         {selected}
//                         <span class="triangle"></span>
//                     </div>
//                     {isActive && (
//                         <div className='drop_content' >
//                             {origins.map((origins,index) => (
//                             <div onClick={e => {
//                                 setSelected(origins)

//                                 setIsActive(false)                               
//                                 }
//                             }className='drop_item'>{origins}</div>
//                         ))}
//                     </div>
//                     )}
//                 </div>
//                 <div className='drop_down'>
//                     <div className='text'>ปลายทาง</div>
//                     <div className='drop_bt' onClick={(e) =>
//                     setIsActive1(!isActive1)}>
//                         {selected1}
//                         <span class="triangle"></span>
//                     </div>
//                     {isActive1 && (
//                         <div className='drop_content' >
//                             {destination.map((destination,index) => (
//                             <div onClick={e => {
//                                 setSelected1(destination)

//                                 if(index===0 && selected3===layer[0]){setTotallay(price_layer1[0])}
//                                 if(index===0 && selected3===layer[1]){setTotallay(price_layer2[0])}
//                                 if(index===0 && selected3===layer[2]){setTotallay(price_layer3[0])}

//                                 if(index===1 && selected3===layer[0]){setTotallay(price_layer1[1])}
//                                 if(index===1 && selected3===layer[1]){setTotallay(price_layer2[1])}
//                                 if(index===1 && selected3===layer[2]){setTotallay(price_layer3[1])}

//                                 if(index===2 && selected3===layer[0]){setTotallay(price_layer1[2])}
//                                 if(index===2 && selected3===layer[1]){setTotallay(price_layer2[2])}
//                                 if(index===2 && selected3===layer[2]){setTotallay(price_layer3[2])}

//                                 if(index===3 && selected3===layer[0]){setTotallay(price_layer1[3])}
//                                 if(index===3 && selected3===layer[1]){setTotallay(price_layer2[3])}
//                                 if(index===3 && selected3===layer[2]){setTotallay(price_layer3[3])}

//                                 if(index===4 && selected3===layer[0]){setTotallay(price_layer1[4])}
//                                 if(index===4 && selected3===layer[1]){setTotallay(price_layer2[4])}
//                                 if(index===4 && selected3===layer[2]){setTotallay(price_layer3[4])}

//                                 if(index===5 && selected3===layer[0]){setTotallay(price_layer1[5])}
//                                 if(index===5 && selected3===layer[1]){setTotallay(price_layer2[5])}
//                                 if(index===5 && selected3===layer[2]){setTotallay(price_layer3[5])}

//                                 if(index===6 && selected3===layer[0]){setTotallay(price_layer1[6])}
//                                 if(index===6 && selected3===layer[1]){setTotallay(price_layer2[6])}
//                                 if(index===6 && selected3===layer[2]){setTotallay(price_layer3[6])}

//                                 if(index===7 && selected3===layer[0]){setTotallay(price_layer1[7])}
//                                 if(index===7 && selected3===layer[1]){setTotallay(price_layer2[7])}
//                                 if(index===7 && selected3===layer[2]){setTotallay(price_layer3[7])}

//                                 if(index===8 && selected3===layer[0]){setTotallay(price_layer1[8])}
//                                 if(index===8 && selected3===layer[1]){setTotallay(price_layer2[8])}
//                                 if(index===8 && selected3===layer[2]){setTotallay(price_layer3[8])}

//                                 if(index===9 && selected3===layer[0]){setTotallay(price_layer1[9])}
//                                 if(index===9 && selected3===layer[1]){setTotallay(price_layer2[9])}
//                                 if(index===9 && selected3===layer[2]){setTotallay(price_layer3[9])}

//                                 if(index===10 && selected3===layer[0]){setTotallay(price_layer1[10])}
//                                 if(index===10 && selected3===layer[1]){setTotallay(price_layer2[10])}
//                                 if(index===10 && selected3===layer[2]){setTotallay(price_layer3[10])}

//                                 if(index===11 && selected3===layer[0]){setTotallay(price_layer1[11])}
//                                 if(index===11 && selected3===layer[1]){setTotallay(price_layer2[11])}
//                                 if(index===11 && selected3===layer[2]){setTotallay(price_layer3[11])}

//                                 if(index===12 && selected3===layer[0]){setTotallay(price_layer1[12])}
//                                 if(index===12 && selected3===layer[1]){setTotallay(price_layer2[12])}
//                                 if(index===12 && selected3===layer[2]){setTotallay(price_layer3[12])}

//                                 if(index===13 && selected3===layer[0]){setTotallay(price_layer1[13])}
//                                 if(index===13 && selected3===layer[1]){setTotallay(price_layer2[13])}
//                                 if(index===13 && selected3===layer[2]){setTotallay(price_layer3[13])}

//                                 if(index===14 && selected3===layer[0]){setTotallay(price_layer1[14])}
//                                 if(index===14 && selected3===layer[1]){setTotallay(price_layer2[14])}
//                                 if(index===14 && selected3===layer[2]){setTotallay(price_layer3[14])}

//                                 if(index===15 && selected3===layer[0]){setTotallay(price_layer1[15])}
//                                 if(index===15 && selected3===layer[1]){setTotallay(price_layer2[15])}
//                                 if(index===15 && selected3===layer[2]){setTotallay(price_layer3[15])}

//                                 if(index===16 && selected3===layer[0]){setTotallay(price_layer1[16])}
//                                 if(index===16 && selected3===layer[1]){setTotallay(price_layer2[16])}
//                                 if(index===16 && selected3===layer[2]){setTotallay(price_layer3[16])}

//                                 if(index===17 && selected3===layer[0]){setTotallay(price_layer1[17])}
//                                 if(index===17 && selected3===layer[1]){setTotallay(price_layer2[17])}
//                                 if(index===17 && selected3===layer[2]){setTotallay(price_layer3[17])}

//                                 if(index===18 && selected3===layer[0]){setTotallay(price_layer1[18])}
//                                 if(index===18 && selected3===layer[1]){setTotallay(price_layer2[18])}
//                                 if(index===18 && selected3===layer[2]){setTotallay(price_layer3[18])}

//                                 setIsActive1(false)
//                                 }
//                             }className='drop_item'>{destination}</div>
//                         ))}
//                     </div>
//                     )}
//                 </div>
//                 <div className='drop_down'>
//                     <div className='text'>เวลา</div>
//                     <div className='drop_bt' onClick={(e) =>
//                     setIsActive2(!isActive2)}>
//                         {selected2}
//                         <span class="triangle"></span>
//                     </div>
//                     {isActive2 && (
//                         <div className='drop_content' >
//                             {time.map(time => (
//                             <div onClick={e => {
//                                 setSelected2(time)
//                                 setIsActive2(false)                             
//                                 }
//                             }className='drop_item'>{time}</div>
//                         ))}
//                     </div>
//                     )}
//                 </div>
//                 <div className='drop_down'>
//                     <div className='text'>ชั้น</div>
//                     <div className='drop_bt' onClick={(e) =>
//                     setIsActive3(!isActive3)}>
//                         {selected3}
//                         <span class="triangle"></span>
//                     </div>
//                     {isActive3 && (
//                         <div className='drop_content' >
//                             {layer.map((layer,index) => (
//                             <div onClick={e => {
//                                 setSelected3(layer)
//                                 console.log(selected1)
//                                 if(index===0 && selected1===destination[0]){setTotallay(price_layer1[0])}
//                                 if(index===0 && selected1===destination[1]){setTotallay(price_layer1[1])}
//                                 if(index===0 && selected1===destination[2]){setTotallay(price_layer1[2])}
//                                 if(index===0 && selected1===destination[3]){setTotallay(price_layer1[3])}
//                                 if(index===0 && selected1===destination[4]){setTotallay(price_layer1[4])}
//                                 if(index===0 && selected1===destination[5]){setTotallay(price_layer1[5])}
//                                 if(index===0 && selected1===destination[6]){setTotallay(price_layer1[6])}
//                                 if(index===0 && selected1===destination[7]){setTotallay(price_layer1[7])}
//                                 if(index===0 && selected1===destination[8]){setTotallay(price_layer1[8])}
//                                 if(index===0 && selected1===destination[9]){setTotallay(price_layer1[9])}
//                                 if(index===0 && selected1===destination[10]){setTotallay(price_layer1[10])}
//                                 if(index===0 && selected1===destination[11]){setTotallay(price_layer1[11])}
//                                 if(index===0 && selected1===destination[12]){setTotallay(price_layer1[12])}
//                                 if(index===0 && selected1===destination[13]){setTotallay(price_layer1[13])}
//                                 if(index===0 && selected1===destination[14]){setTotallay(price_layer1[14])}
//                                 if(index===0 && selected1===destination[15]){setTotallay(price_layer1[15])}
//                                 if(index===0 && selected1===destination[16]){setTotallay(price_layer1[16])}
//                                 if(index===0 && selected1===destination[17]){setTotallay(price_layer1[17])}
//                                 if(index===0 && selected1===destination[18]){setTotallay(price_layer1[18])}

//                                 if(index===1 && selected1===destination[0]){setTotallay(price_layer2[0])}
//                                 if(index===1 && selected1===destination[1]){setTotallay(price_layer2[1])}
//                                 if(index===1 && selected1===destination[2]){setTotallay(price_layer2[2])}
//                                 if(index===1 && selected1===destination[3]){setTotallay(price_layer2[3])}
//                                 if(index===1 && selected1===destination[4]){setTotallay(price_layer2[4])}
//                                 if(index===1 && selected1===destination[5]){setTotallay(price_layer2[5])}
//                                 if(index===1 && selected1===destination[6]){setTotallay(price_layer2[6])}
//                                 if(index===1 && selected1===destination[7]){setTotallay(price_layer2[7])}
//                                 if(index===1 && selected1===destination[8]){setTotallay(price_layer2[8])}
//                                 if(index===1 && selected1===destination[9]){setTotallay(price_layer2[9])}
//                                 if(index===1 && selected1===destination[10]){setTotallay(price_layer2[10])}
//                                 if(index===1 && selected1===destination[11]){setTotallay(price_layer2[11])}
//                                 if(index===1 && selected1===destination[12]){setTotallay(price_layer2[12])}
//                                 if(index===1 && selected1===destination[13]){setTotallay(price_layer2[13])}
//                                 if(index===1 && selected1===destination[14]){setTotallay(price_layer2[14])}
//                                 if(index===1 && selected1===destination[15]){setTotallay(price_layer2[15])}
//                                 if(index===1 && selected1===destination[16]){setTotallay(price_layer2[16])}
//                                 if(index===1 && selected1===destination[17]){setTotallay(price_layer2[17])}
//                                 if(index===1 && selected1===destination[18]){setTotallay(price_layer2[18])}

//                                 if(index===2 && selected1===destination[0]){setTotallay(price_layer3[0])}
//                                 if(index===2 && selected1===destination[1]){setTotallay(price_layer3[1])}
//                                 if(index===2 && selected1===destination[2]){setTotallay(price_layer3[2])}
//                                 if(index===2 && selected1===destination[3]){setTotallay(price_layer3[3])}
//                                 if(index===2 && selected1===destination[4]){setTotallay(price_layer3[4])}
//                                 if(index===2 && selected1===destination[5]){setTotallay(price_layer3[5])}
//                                 if(index===2 && selected1===destination[6]){setTotallay(price_layer3[6])}
//                                 if(index===2 && selected1===destination[7]){setTotallay(price_layer3[7])}
//                                 if(index===2 && selected1===destination[8]){setTotallay(price_layer3[8])}
//                                 if(index===2 && selected1===destination[9]){setTotallay(price_layer3[9])}
//                                 if(index===2 && selected1===destination[10]){setTotallay(price_layer3[10])}
//                                 if(index===2 && selected1===destination[11]){setTotallay(price_layer3[11])}
//                                 if(index===2 && selected1===destination[12]){setTotallay(price_layer3[12])}
//                                 if(index===2 && selected1===destination[13]){setTotallay(price_layer3[13])}
//                                 if(index===2 && selected1===destination[14]){setTotallay(price_layer3[14])}
//                                 if(index===2 && selected1===destination[15]){setTotallay(price_layer3[15])}
//                                 if(index===2 && selected1===destination[16]){setTotallay(price_layer3[16])}
//                                 if(index===2 && selected1===destination[17]){setTotallay(price_layer3[17])}
//                                 if(index===2 && selected1===destination[18]){setTotallay(price_layer3[18])}

//                                 setIsActive3(false)
//                                 }                              
//                             }className='drop_item'>{layer}</div>
//                         ))}
//                     </div>
//                     )}
//                 </div>
//             </div>
//             <div className='block_price'>
//                 <p>ราคา(รวมภาษี 7%) : {(totalLay)} </p>
//                 <Link to = './Thank'><button className='bt' onClick={addEmployee}>ยืนยันการจอง</button></Link>
//             </div>
//             <div>
//                 <button type="primary" className='bt_back_bookticket' onClick={() => navigate(-1)}> กลับ </button>   
//             </div>

//         </div>
//     )
// }

export default BookTicket