import React, { useState } from 'react';
import { Row, Col, Card, Pagination, Button, Modal } from 'react-bootstrap';
import BTable from 'react-bootstrap/Table';

import { GlobalFilter } from './GlobalFilter';

import { useTable, useSortBy, usePagination, useGlobalFilter } from "react-table";
import makeData from "../../../data/schoolData";

function Table({ columns, data, modalOpen }) {

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,

        globalFilter,
        setGlobalFilter,

        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize }
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 10 }
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    return (
        <>
            <Row className='mb-3'>
                <Col className="d-flex align-items-center">
                    Show
                    <select
                        className='form-control w-auto mx-2'
                        value={pageSize}
                        onChange={e => {
                            setPageSize(Number(e.target.value))
                        }}
                    >
                        {[5, 10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize}
                            </option>
                        ))}
                    </select>
                    entries
                </Col>
                <Col className='d-flex justify-content-end'>
                    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
                    <Button variant="success" className="btn-sm btn-round has-ripple ml-2" onClick={modalOpen} ><i className="feather icon-plus"/> Add Teacher</Button>
                </Col>
            </Row>
            <BTable striped bordered hover responsive {...getTableProps()}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            // Add the sorting props to control sorting. For this example
                            // we can add them into the header props
                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                {column.render('Header')}
                                {/* Add a sort direction indicator */}
                                <span>
                    {column.isSorted
                        ? column.isSortedDesc
                            ? <span className='feather icon-arrow-down text-muted float-right' />
                            : <span className='feather icon-arrow-up text-muted float-right' />
                        : ''}
                  </span>
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {page.map(
                    (row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    )
                                })}
                            </tr>
                        )}
                )}
                </tbody>
            </BTable>
            <Row className='justify-content-between'>
                <Col>
                    <span className="d-flex align-items-center">
                        Page{' '} <strong> {pageIndex + 1} of {pageOptions.length} </strong>{' '}
                        | Go to page:{' '}
                        <input
                            type="number"
                            className='form-control ml-2'
                            defaultValue={pageIndex + 1}
                            onChange={e => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0
                                gotoPage(page)
                            }}
                            style={{ width: '100px' }}
                        />
                    </span>
                </Col>
                <Col>
                    <Pagination className='justify-content-end'>
                        <Pagination.First onClick={() => gotoPage(0)} disabled={!canPreviousPage} />
                        <Pagination.Prev onClick={() => previousPage()} disabled={!canPreviousPage} />
                        <Pagination.Next onClick={() => nextPage()} disabled={!canNextPage} />
                        <Pagination.Last onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} />
                    </Pagination>
                </Col>
            </Row>
        </>
    )
}

const Teacher = () => {
    const columns = React.useMemo(
        () => [
            {
                Header: '#',
                accessor: 'avatar',
            },
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Subject',
                accessor: 'department',
            },
            {
                Header: 'Options',
                accessor: 'action',
            },
        ],
        []
    );

    const data = React.useMemo(() => makeData(27), []);

    const [isOpen, setIsOpen] = useState(false);

    const openHandler = () => {
        setIsOpen(true);
    };

    return (
        <React.Fragment>
            <Row>
                <Col sm={12}>
                    <Card>
                    <Card.Header>
                            <Card.Title as='h5'>Teacher List</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Table columns={columns} data={data} modalOpen={openHandler} />
                        </Card.Body>
                    </Card>
                    <Modal show={isOpen} onHide={() => setIsOpen(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title as="h5">Add Teacher</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Row>
                                <Col sm={6}>
                                    <div className="form-group fill">
                                        <label className="floating-label" htmlFor="Name">Guardian Name</label>
                                        <input type="text" className="form-control" id="Name" placeholder="Guardian Name"/>
                                    </div>
                                </Col>
                                <Col sm={6}>
                                    <div className="form-group fill">
                                        <label className="floating-label" htmlFor="Email">Email</label>
                                        <input type="email" className="form-control" id="Email" placeholder="Email"/>
                                    </div>
                                </Col>
                                <Col sm={6}>
                                    <div className="form-group fill">
                                        <label className="floating-label" htmlFor="Password">Password</label>
                                        <input type="password" className="form-control" id="Password" placeholder="Password"/>
                                    </div>
                                </Col>
                                <Col sm={6}>
                                    <div className="form-group fill">
                                        <label className="floating-label" htmlFor="Subject">Subject</label>
                                        <input type="text" className="form-control" id="Subject" placeholder="Subject"/>
                                    </div>
                                </Col>
                                <Col sm={12}>
                                    <div className="form-group fill">
                                        <label className="floating-label" htmlFor="Address">Address</label>
                                        <textarea className="form-control" id="Address" rows="3" placeholder='Address'/>
                                    </div>
                                </Col>
                                <Col sm={6}>
                                    <div className="form-group fill">
                                        <label className="floating-label" htmlFor="Sex">Select Sex</label>
                                        <select className="form-control" id="Sex">
                                            <option value=""/>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>
                                </Col>
                                <Col sm={6}>
                                    <div className="form-group fill">
                                        <label className="floating-label" htmlFor="Icon">Profie Image</label>
                                        <input type="file" className="form-control" id="Icon" placeholder="Profie Image"/>
                                    </div>
                                </Col>
                                <Col sm={6}>
                                    <div className="form-group fill">
                                        <label className="floating-label" htmlFor="JDate">Joining Date</label>
                                        <input type="date" className="form-control" id="JDate" placeholder="Joining Date"/>
                                    </div>
                                </Col>
                                <Col sm={6}>
                                    <div className="form-group fill">
                                        <label className="floating-label" htmlFor="Age">Age</label>
                                        <input type="text" className="form-control" id="Age" placeholder="Age"/>
                                    </div>
                                </Col>
                            </Row>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" onClick={() => setIsOpen(false)}>Clear</Button>
                            <Button variant="primary">Submit</Button>
                        </Modal.Footer>
                    </Modal>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Teacher;