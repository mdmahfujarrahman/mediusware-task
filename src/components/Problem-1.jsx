import React, { useState } from "react";

const Problem1 = () => {
    const [show, setShow] = useState("all");
    const [tasks, setTasks] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [inputData, setInputData] = useState({ name: "", status: "" });

    // handle click event
    const handleClick = (val) => {
        setShow(val);
        if (val === "all") {
            setFilterData(sortData(tasks));
            return;
        }
        const newData = tasks.filter(
            (item) => item.status?.toLowerCase() === val
        );
        setFilterData(newData);
    };

    // handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputData.name || !inputData.status)
            return alert("Please fill all the fields");
        setTasks((prev) => [...prev, inputData]);
        setFilterData((prev) => [...prev, inputData]);
        setInputData({
            name: "",
            status: "",
        });
    };
    // hnadle input change and set input data to state
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputData((prev) => ({ ...prev, [name]: value }));
    };

    // sort data by status
    const sortData = (array) => {
        const sortItem = array.sort((a, b) => {
            if (a.status.toLowerCase() === "active") return -1;
            if (b.status.toLowerCase() === "active") return 1;
            if (a.status.toLowerCase() === "completed") return -1;
            if (b.status.toLowerCase() === "completed") return 1;
            return 0;
        });
        return sortItem;
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
                <div className="col-6 ">
                    <form className="row gy-2 gx-3 align-items-center mb-4">
                        <div className="col-auto">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                value={inputData.name}
                                onChange={handleChange}
                                name="name"
                            />
                        </div>
                        <div className="col-auto">
                            <input
                                onChange={handleChange}
                                name="status"
                                type="text"
                                value={inputData.status}
                                className="form-control"
                                placeholder="Status"
                            />
                        </div>
                        <div className="col-auto">
                            <button
                                onClick={handleSubmit}
                                type="submit"
                                className="btn btn-primary"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
                <div className="col-8">
                    <ul
                        className="nav nav-pills mb-3"
                        id="pills-tab"
                        role="tablist"
                    >
                        <li className="nav-item">
                            <button
                                className={`nav-link ${
                                    show === "all" && "active"
                                }`}
                                type="button"
                                onClick={() => handleClick("all")}
                            >
                                All
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${
                                    show === "active" && "active"
                                }`}
                                type="button"
                                onClick={() => handleClick("active")}
                            >
                                Active
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${
                                    show === "completed" && "active"
                                }`}
                                type="button"
                                onClick={() => handleClick("completed")}
                            >
                                Completed
                            </button>
                        </li>
                    </ul>
                    <div className="tab-content"></div>
                    <table className="table table-striped ">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterData.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.status}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Problem1;
