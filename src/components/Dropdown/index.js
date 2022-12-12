import React, { useState, useEffect, useRef } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';


export const Dropdown = ({ value, data, onChange, type, types, width }) => {

  let [open, setOpen] = useState(false);

  const myRef = useRef();

  const handleClickOutside = e => {
    if (!myRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    if (types !== type) {
      setOpen(false);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [types])


  let mouseEnter = (e) => {
    setOpen(true);
  }

  let mouseLeave = (e) => {
    setOpen(false);
  }

  return (
    <div ref={myRef} className={'calendar-dropdown'} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} style={{ width: width }}>
      <div>{type === 'month' ? data[value] : value}</div>
      <div className='calendar-list' style={open ? { transition: '0.25s', top: 22 } : { height: 0, top: 0 }}>
        <SimpleBar style={{maxHeight: 95}} autoHide={false}>
          {data.map((x, index) => (
            <div key={index} className={x === (type === 'month' ? data[value] : value) ? 'calendar-item select-btn' : 'calendar-item'} onClick={e => { onChange(type === 'month' ? index : x); setOpen(false) }}>{x}</div>
          ))}
        </SimpleBar>
      </div>
    </div>
  )
}