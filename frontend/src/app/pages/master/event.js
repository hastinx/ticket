import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { formatDate } from '../../../helper/format'
import ModalInsert from '../../components/modal'
import Navbar from '../../components/navbar'


const MasterEvent = () => {
    const [events, setEvents] = useState([])
    const [status, setStatus] = useState(false)
    const [eventName, setEventName] = useState('')
    const [price, setPrice] = useState('')
    const [venue, setVenue] = useState(0)
    const [qty, setQty] = useState(0)
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const auth = useSelector(state => state.auth)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getList = async () => {
        try {
            const data = await axios.get(process.env.REACT_APP_API_URL + 'mst-event', {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            })

            const result = data.data.values
            setEvents(result)
        } catch (error) {

        }
    }

    const handleSave = async () => {
        console.log(eventName, venue, price, qty, start, end)
        try {
            const data = await axios.post(process.env.REACT_APP_API_URL + 'mst-event', {
                name: eventName,
                price: price,
                venue: venue,
                qty: qty,
                start_date: start,
                end_date: end
            }, {
                headers: { Authorization: `Bearer ${auth.token}` }
            })

            Swal.fire('Success', data.data.message)
            handleClose()
        } catch (error) {
            Swal.fire('Success', error.message)
        }
    }

    useEffect(() => {
        getList()
    }, [show])
    return (
        <Navbar title="Master Event">
            <div className='d-flex justify-content-between my-3'>
                <button className='btn btn-success ' onClick={() => handleShow()}><i className='bi bi-plus' /> Add Event</button>
                <Link to='/mst-event/attendance' className='btn btn-dark'> Attendance</Link>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">NO</th>
                        <th scope="col">EVENT NAME</th>
                        <th scope="col">PRICE</th>
                        <th scope="col">VENUE</th>
                        <th scope="col">QTY</th>
                        <th scope="col">START DATE</th>
                        <th scope="col">END DATE</th>
                        <th scope="col">ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        events.map(i =>

                            <tr key={i.id}>
                                <th scope="row">{i.id}</th>
                                <td>{i.name}</td>
                                <td>{i.price}</td>
                                <td>{i.venue}</td>
                                <td>{i.qty}</td>
                                <td>{formatDate(i.start)}</td>
                                <td>{formatDate(i.end)}</td>
                                <td><button className='btn btn-primary'><i className='bi bi-pencil' /></button><button className='btn btn-danger'><i className='bi bi-trash' /></button></td>
                            </tr>

                        )
                    }

                </tbody>
            </table>


            <ModalInsert
                show={show}
                handleClose={() => handleClose()}
                save={() => handleSave()}
                setStart={(e) => setStart(e.target.value)}
                setEnd={(e) => setEnd(e.target.value)}
                setName={(e) => setEventName(e.target.value)}
                setPrice={(e) => setPrice(e.target.value)}
                setQty={(e) => setQty(e.target.value)}
                setVenue={(e) => setVenue(e.target.value)}
            />
        </Navbar>


    )
}

export default MasterEvent