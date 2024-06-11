import React, { useState ,useEffect} from 'react';
import './App.css';

function App() {
  const [toDos, setToDos] = useState([]);
  const [toDo, setToDo] = useState('');
  const [currentDay,setCurrentDay]= useState('');

  useEffect(()=>{
      updateCurrentDay();
  },[]);

  const updateCurrentDay=()=>{
    const daysOfWeek=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    const currentDate=new Date();
    const dayOfWeek=daysOfWeek[currentDate.getDay()];
    setCurrentDay(dayOfWeek)
  };

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, its {currentDay} 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input
          value={toDo}
          onChange={(e) => setToDo(e.target.value)}
          type="text"
          placeholder="🖊️ Add item..."
        />
        <i
          onClick={() =>
            setToDos([
              ...toDos,
              { id: Date.now(), text: toDo, status: false },
            ])
          }
          className="fas fa-plus"
        ></i>
      </div>
      <div className="todos">
        {toDos.map((obj) => (
          <div className="todo" key={obj.id}>
            <div className="left">
              <input
                onChange={(e) => {
                  console.log(e.target.value);
                  console.log(obj);
                  setToDos((prevToDos) =>
                    prevToDos.map((obj2) =>
                      obj2.id === obj.id
                        ? { ...obj2, status: e.target.checked }
                        : obj2
                    )
                  );
                }}
                value={obj.status}
                type="checkbox"
                name=""
                id=""
              />
              <p>{obj.text}</p>
            </div>
            <div className="right">
              <i onClick={()=>{
                setToDos((prevToDos) =>
                prevToDos.filter((obj2)=> obj2.id !== obj.id)
                )
              }} 
              className="fas fa-times"
              ></i>
            </div>
          </div>
        ))}
        {toDos.map((obj) => {
          if (obj.status) {
            return <h1 key={obj.id}>{obj.text}</h1>;
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default App;
