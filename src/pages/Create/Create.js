import { useState } from 'react';

import { db } from '../../firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import { useAuthContext} from '../../hooks/useAuthContext';
import Select from 'react-select'

import DatePicker from "react-datepicker";


import './Create.css'
import "react-datepicker/dist/react-datepicker.css";

const categories = [
    { value: 'birthday', label: 'Birthday-party' },
    { value: 'casual', label: 'Games' },
    { value: 'special', label: 'Single-Program' },
    { value: 'day-care', label: 'Kids-day' },
  ]
  

export default function Create() {
  const [partyName, setPartyName] = useState('');
  const { user} = useAuthContext();
  const [details, setDetails] = useState('')
  // const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')

  const [formError, setFormError] = useState(null)
  const [date, setDate] = useState(new Date());
  console.log('user' ,user);
  const newparty = {
    partyName,
    details,
    date,
    category,
    author: user.uid, 
    createdBy: user.email
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const ref = collection(db, "parties")
    setFormError(null)
    await addDoc(ref, newparty
    )
    setPartyName('')
    setDetails('')
    setDate('')
    setCategory('')
    
  }

  return (
    <form className='create-form' onSubmit={handleSubmit}>
      <label>
        <span>Add a new book title:</span>
        <input 
          required
          type="text"
          onChange={(e) => setPartyName(e.target.value)}
          value={partyName}
        />
      </label>
      <label>
          <span>Project Details:</span>
          <textarea 
            required
            onChange={(e) => setDetails(e.target.value)}
            value={details} 
          ></textarea>
        </label>
        <label>
          <span>Set due date:</span>
          {/* <input
            required 
            type="date" 
            onChange={(e) => setDueDate(e.target.value)} 
            value={dueDate}
          /> */}
         <div>
      <DatePicker 
      selected={date} 
      onChange={(date) => setDate(date)} 
      />
    </div>
        </label>
        <label>
          <span>Project category:</span>
          <Select
            onChange={(option) => setCategory(option)}
            options={categories}
          />
        </label>
      <button>Add</button>

    </form>
  )
}