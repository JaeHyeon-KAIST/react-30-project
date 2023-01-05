import React, {useState, useEffect} from 'react';
import './FuncComp.css';
import hand from '../images/hand.png';

var funcStyle = 'color:blue';
var funcId = 0;
function FuncComp(props){
  var numberState = useState(props.initNumber);
  var number = numberState[0];
  var setNumber = numberState[1];

//   var dateState = useState((new Date()).toString());
//   var _date = dateState[0];
//   var setDate = dateState[1];

  var [_date, setDate] = useState((new Date()).toString());  
  
  useEffect(function(){
    console.log('%cfunc => useEffect (componentDidMount) '+(++funcId), funcStyle);
    document.title = number;
    return function(){
      console.log('%cfunc => useEffect return (componentWillUnMount) '+(++funcId), funcStyle);
    }
  }, []);
  
  //side effect
  useEffect(function(){
    console.log('%cfunc => useEffect number (componentDidMount & componentDidUpdate) '+(++funcId), funcStyle);
    document.title = number;
    return function(){
      console.log('%cfunc => useEffect number return (componentDidMount & componentDidUpdate) '+(++funcId), funcStyle);
    }
  }, [number]);

  useEffect(function(){
    console.log('%cfunc => useEffect _date (componentDidMount & componentDidUpdate) '+(++funcId), funcStyle);
    document.title = _date;
    return function(){
      console.log('%cfunc => useEffect _date return (componentDidMount & componentDidUpdate) '+(++funcId), funcStyle);
    }
  }, [_date]);

  console.log('%cfunc => render '+(++funcId), funcStyle);
  return (
    <div className="container">
      <h2>function style component</h2>
      <p>Number : {number}</p>
      <p>Date : {_date}</p>
      <input type="button" value="random" onClick={
          function(){
            setNumber(Math.random());
          }
        }></input>
      <input type="button" value="date" onClick={
          function(){
            setDate((new Date()).toString());
          }
        }></input>
        <img src={hand} />
    </div>
  );
}

export default FuncComp;