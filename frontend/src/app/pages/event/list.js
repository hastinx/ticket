import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { formatDate } from '../../../helper/format';
import { addItems } from '../../../redux/reducer/cartSlice';

const ListEvent = () => {
  const [events, setEvents] = useState([]);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const getEvents = async () => {
    try {
      const data = await axios.get(process.env.REACT_APP_API_URL + 'event', {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      const result = data.data.values;
      setEvents(result);
    } catch (error) {
      Swal.fire('Error', error.message);
    }
  };

  const handleAdd = (param) => {
    let item = {
      id: param.id,
      name: param.name,
      price: param.price,
      start: param.start,
      end: param.end,
      qty: param.qty
    };

    dispatch(addItems({ item: item }));
  };

  useEffect(() => {
    getEvents();
  }, []);
  return (
    <Navbar title="Events">
      {events.map((i) => (
        <div className="card m-2" key={i.id}>
          <div className="card-body d-flex justify-content-between">
            <div className="d-flex flex-column">
              <span>{i.name}</span>
              <span>Price : {i.price}</span>
              <span>Start : {formatDate(i.start)}</span>
              <span>End : {formatDate(i.end)}</span>
              <span>Venue : {i.venue}</span>
              <span>Available: {i.qty} tickets</span>
            </div>
            <div>
              <button className="btn btn-dark" onClick={() => handleAdd(i)}>
                Add
              </button>
            </div>
          </div>
        </div>
      ))}
    </Navbar>
  );
};

export default ListEvent;
