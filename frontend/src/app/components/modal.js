import React from 'react'
import { Modal } from 'react-bootstrap'

const ModalInsert = ({ show, handleClose, save, setStart, setEnd, setName, setPrice, setQty, setVenue }) => {
    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Insert Event</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <div class="mb-3 row">
                    <div class="col-sm-12">
                        <input type="text" class="form-control" placeholder="event name" onChange={setName} />
                    </div>
                </div>
                <div class="mb-3 row">
                    <div class="col-sm-12">
                        <input type="text" class="form-control" placeholder="price" onChange={setPrice} />
                    </div>
                </div>
                <div class="mb-3 row">
                    <div class="col-sm-12">
                        <select class="form-select" aria-label="Select Venue" onChange={setVenue}>
                            <option selected>Open this select menu</option>
                            <option value="1">Venue 1</option>
                            <option value="2">Venue 2</option>
                            <option value="3">Venue 3</option>
                        </select>
                    </div>
                </div>
                <div class="mb-3 row">
                    <div class="col-sm-12">
                        <input
                            type="text"
                            class="form-control"
                            placeholder="Quantity"
                            onChange={setQty}
                        />
                    </div>
                </div>
                <div class="mb-3 row">
                    <div class="col-sm-12">
                        <input
                            type="text"
                            class="form-control"
                            placeholder="Start Date"
                            onChange={setStart}
                        />
                    </div>
                </div>
                <div class="mb-3 row">
                    <div class="col-sm-12">
                        <input
                            type="text"
                            class="form-control"
                            placeholder="End Date"
                            onChange={setEnd}
                        />
                    </div>
                </div>

            </Modal.Body>
            <Modal.Footer>
                <div className='bg-white d-flex justify-content-between align-items-center w-100'>
                    {/* <div className='d-flex align-items-center gap-3 p-2 rounded border'>
                            <button className='btn btn-sm btn-success fw-bold' onClick={increment}>+</button>
                            <span>{countItems === undefined ? 1 : countItems}</span>
                            <button className='btn btn-sm btn-light fw-bold' onClick={decrement}>-</button>
                        </div> */}
                    <div className='d-flex align-items-center gap-3 bg-light p-2 rounded'>
                        <button className='btn btn-sm btn-light' onClick={save}>Save Event</button>
                    </div>
                </div>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalInsert