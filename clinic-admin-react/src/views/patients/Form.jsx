import React from 'react'
import api from '../../api'

export default function PatientForm(){
  const [form,setForm] = React.useState({
    first_name:'', last_name:'', cin:'', phone:'', email:'', address:''
  })
  const [msg,setMsg] = React.useState('')

  const submit = async(e)=>{
    e.preventDefault()
    await api.post('/patients', form)
    setMsg('Patient created')
    setForm({first_name:'', last_name:'', cin:'', phone:'', email:'', address:''})
  }

  const on = (k)=>(e)=>setForm({...form,[k]:e.target.value})

  return (
    <form onSubmit={submit} className="max-w-xl space-y-3">
      <h2 className="text-lg font-semibold">New Patient</h2>
      <div className="grid md:grid-cols-2 gap-3">
        <input className="border p-2 rounded" placeholder="First name" value={form.first_name} onChange={on('first_name')} />
        <input className="border p-2 rounded" placeholder="Last name" value={form.last_name} onChange={on('last_name')} />
        <input className="border p-2 rounded" placeholder="CIN" value={form.cin} onChange={on('cin')} />
        <input className="border p-2 rounded" placeholder="Phone" value={form.phone} onChange={on('phone')} />
        <input className="border p-2 rounded" placeholder="Email" value={form.email} onChange={on('email')} />
        <input className="border p-2 rounded md:col-span-2" placeholder="Address" value={form.address} onChange={on('address')} />
      </div>
      <button className="px-4 py-2 rounded bg-black text-white">Save</button>
      {msg && <p className="text-green-600">{msg}</p>}
    </form>
  )
}
