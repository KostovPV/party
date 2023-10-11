import { useState } from 'react';

import { db } from '../../firebase/config';
import { collection, doc, setDoc, updateDoc, } from 'firebase/firestore';
import { useAuthContext } from '../../hooks/useAuthContext';
import Select from 'react-select'
import { useParams } from 'react-router-dom';
import { useDocument } from '../../hooks/useDocument';



const categories = [
  { value: 'birthday', label: 'Birthday-party' },
  { value: 'casual', label: 'Games' },
  { value: 'special', label: 'Single-Program' },
  { value: 'day-care', label: 'Kids-day' },
]


export default function Edit() {
  const { user } = useAuthContext();
  const [partyName, setPartyName] = useState('');
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')

  const { id } = useParams()
  console.log(id);
  const { document, error } = useDocument('parties', id)

  const [formError, setFormError] = useState(null)

  // setPartyName(document.partyName)

console.log(document);
 


  console.log('user', user);
  const newparty = {
    partyName,
    details,
    dueDate,
    category,
    author: user.uid,
    createdBy: user.email
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const ref = doc(db, "parties", id)
    setFormError(null)
    await updateDoc(ref, newparty
    )
    // setPartyName('')
    // setDetails('')
    // setDueDate('')
    // setCategory('')

  }

  return (
    <form onSubmit={handleSubmit}>
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
        <input
          required
          type="date"
          onChange={(e) => setDueDate(e.target.value)}
          value={dueDate}
        />
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