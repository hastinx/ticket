import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../../components/navbar'


const Attendance = () => {
    const [attendance, setAttendance] = useState([])
    const auth = useSelector(state => state.auth)

    const getAttendance = async () => {
        try {
            const data = await axios.get(process.env.REACT_APP_API_URL + 'mst-event/attendance', {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            })

            setAttendance(data.data.values)
        } catch (error) {

        }
    }

    useEffect(() => {
        getAttendance()
    }, [])
    return (
        <Navbar title="Event Attendance">
            {
                attendance.map(i =>
                    <div className="accordion mt-2" id="accordionExample" key={i.username}>
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className='accordion-button gap-5 collapsed' type="button" data-bs-toggle="collapse" data-bs-target={"#collapse" + i.username} aria-expanded="true" aria-controls="collapseOne">
                                    <span>Attendance Name : {i.username}</span>
                                </button>
                            </h2>
                            <div id={"collapse" + i.username} className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <div className="accordion-body">

                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </Navbar>
    )
}

export default Attendance