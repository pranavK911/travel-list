
import { useState } from 'react';
import './App.css';

function App() {
  const [sItem,setSitem]=useState([]);
  console.log(sItem);
  function handleAllDelete(){
    const confirmed=window.confirm("Are you sure you want to delete all items?")
    if(confirmed) setSitem([])
  }
  function handleAddItems(item){
    setSitem((items)=>[...items,item])
  }
  function handleDelete(id){
    // console.log(id);
    console.log(sItem);
    
    setSitem(sItem=>sItem.filter(items=>items.id!==id))
  }
  function handleToggle(id){
      // console.log(id);
     setSitem(s=>s.map(ss=>ss.id===id?{...ss,packed:!ss.packed}:ss))
  }

  // console.log(sItem);
  
  return (
    <div className='app'>
      <Logo/>
      <Form onAddItem={ handleAddItems}/>
      <PackingList onAllDelete={handleAllDelete} items={sItem} onDelte={handleDelete} onToggle={handleToggle}/>
      <Stats items={sItem} />
    </div>
  );
}
function Logo(){ 
  return <h1>Far Away</h1>
}
function Form({onAddItem}){
  const [description,setDescription]=useState('');
  const [quantity,setQuantity]=useState(1);
  
  // console.log(sItem);
  
  function handleSubmit(e){
    e.preventDefault();
    if(!description) return;
    
    const itemArr={description,quantity,packed:false,id: Date.now()}
    // console.log(itemArr);
    onAddItem(itemArr);
    
    setDescription('')
    setQuantity(1)
    
  }
  // console.log(quantity);
  
  return(
   
    <form className='add-form' onSubmit={handleSubmit}>
      <h3> What do youn need for your trip</h3>
      <select value={quantity}  
      onChange={(e)=>setQuantity(+e.target.value)}
     
        >
        {Array.from({ length: 20 }, (_, index) => index + 1)
        .map(value => <option key={value}
          value={value}
          >
          {value}</option>)}
      </select>
      <input 
       type='text' 
       value={description}
       placeholder='items...'
       onChange={(e)=>setDescription(e.target.value)}
       />
      <button onClick={handleSubmit}>Add</button>
    </form>
  )
}
function PackingList({items,onDelte,onToggle,onAllDelete}){
  const [typesort,setTypeSort]=useState('input');
  let sortedBy;
  if(typesort==='input') sortedBy=items;
  if(typesort==='description') sortedBy=items.slice().sort((a,b)=> a.description.localeCompare(b.description));
  if(typesort==='packed') sortedBy=items.slice().sort((a,b)=>Number(a.packed)-Number(b.packed))
  return <div className='list'>
  <ul >
   {sortedBy.map((item)=>{
     return <Item item={item} key={item.id} onToggle={onToggle} onDelte={onDelte}/>
   })}
  </ul>
   <div className='actions'>
   {/* value={inputs}  value={descriptions} value={packeds}*/}
    <select value={typesort} onChange={e=>setTypeSort(e.target.value)}>
      <option value='input'>Sort by input</option>
      <option value='description'>Sort by description</option>
      <option value='packed'>Sort by packed</option>
    </select>
    <button onClick={onAllDelete}>Clear list</button>
   </div>
  </div> 
}
function Item({item,onDelte,onToggle}){
  return <li>
    <input type='checkbox' value={item.packed}  onChange={()=>onToggle(item.id)} />
     <spanb style={item.packed?{textDecoration:"line-through"}:{}}> {item.quantity}  {item.description}</spanb>
     <button onClick={()=>onDelte(item.id)}>❌</button>
  </li>
}
function Stats({items}){
  if(!items.length) return <p className='stats'><em>Start adding some items to your packing list</em></p>
  const num=items.length;
  const packed=items.filter((items)=>items.packed).length;
  const per=Math.floor((packed/num)*100)
  return<footer className='stats'><em>
    {per===100?"You got everything! Ready to go":
   ` You have ${num} items on your list,and you alredy packed ${packed} (${per}%)`}</em></footer>
}
export default App;
