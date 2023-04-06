import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { formatDate } from '../../../helper/format';
import { checkout, removeItems } from '../../../redux/reducer/cartSlice';
import Navbar from '../../components/navbar';
import axios from 'axios'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const handleRemove = (param) => {
    dispatch(removeItems({ id: param.id, price: param.price }));
  };

  const handleCheckout = async () => {
    try {
      const data = await axios.post(process.env.REACT_APP_API_URL + 'event/checkout', {
        user_id: auth.id,
        event: cart.item,
        total: cart.total
      }, {
        headers: { Authorization: `Bearer ${auth.token}` }
      })

      console.log(data)
      Swal.fire('Success', data.data.message)
      dispatch(checkout())
      navigate('/history')
    } catch (error) {
      Swal.fire('Error', error.message)
    }
  }

  return (
    <Navbar title="Wishlist">
      {cart.item.map((i) => (
        <div className="card m-2" key={i.name}>
          <div className="card-body d-flex justify-content-between">
            <div className="d-flex flex-column">
              <span>{i.name}</span>
              <span>Price : {i.price}</span>
              <span>Start : {formatDate(i.start)}</span>
              <span>End : {formatDate(i.end)}</span>
              <span>Category : {i.category}</span>
            </div>
            <div>
              <button
                className="btn btn-danger"
                onClick={() => handleRemove(i)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
      <hr />
      <div className="d-flex justify-content-between p-3">
        <button className="btn btn-dark" onClick={(e) => handleCheckout(e)}>Checkout</button>{' '}
        <span>Total : {cart.total}</span>
      </div>
    </Navbar>
  );
};

export default Wishlist;
