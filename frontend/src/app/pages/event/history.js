import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import Navbar from '../../components/navbar';
import { formatDate } from '../../../helper/format';

const History = () => {
    const [events, setEvents] = useState([]);
    const [details, setDetails] = useState([]);
    const [idAccord, setidAccord] = useState(0);
    const [total, setTotal] = useState(0);
    const auth = useSelector((state) => state.auth);
    const getEvents = async () => {
        try {
            const data = await axios.get(process.env.REACT_APP_API_URL + 'event/byuser/' + auth.id, {
                headers: { Authorization: `Bearer ${auth.token}` },
            });
            const result = data.data.values;
            console.log(result)
            setEvents(result);
        } catch (error) {
            Swal.fire('Error', error.message);
        }
    };

    const getEventsDetail = async (param) => {
        // if (details.length === 0) {
        setidAccord(param.id)
        try {
            const data = await axios.get(process.env.REACT_APP_API_URL + 'event/byuser/detail/' + param.id, {
                headers: { Authorization: `Bearer ${auth.token}` },
            });
            const result = data.data.values;
            setDetails(result);
            let totCheckout = 0
            result.map(i => totCheckout += i.price)
            setTotal(totCheckout)
        } catch (error) {
            Swal.fire('Error', error.message);
        }
        // }
        console.log(idAccord)

    };

    useEffect(() => {
        getEvents();
    }, []);

    return (
        <Navbar title="History">
            {
                events.map(i =>
                    <div className="accordion mt-2" id="accordionExample" key={i.id}>
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className={idAccord === i.id ? 'accordion-button gap-5' : 'accordion-button gap-5 collapsed'} type="button" data-bs-toggle="collapse" data-bs-target={"#collapse" + i.id} aria-expanded="true" aria-controls="collapseOne" onClick={() => getEventsDetail(i)}>
                                    <span>Transaction : {i.id}</span>  <span>Date : {formatDate(i.createdAt)}</span>
                                </button>
                            </h2>
                            <div id={"collapse" + i.id} className={idAccord === i.id ? 'accordion-collapse' : "accordion-collapse collapse"} data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    {details.map(i =>
                                        <div className="card m-2" key={i.id}>
                                            <div className="card-body d-flex justify-content-between">
                                                <div className="d-flex flex-column">
                                                    <span>{i.name}</span>
                                                    <span>Price : {i.price}</span>
                                                    <span>Venue : {i.venue}</span>
                                                    <span>Start : {formatDate(i.start)}</span>
                                                    <span>End : {formatDate(i.end)}</span>
                                                </div>

                                            </div>
                                        </div>
                                    )
                                    }
                                    <span>Total : {total}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </Navbar>
    )
}

export default History