import { Modal } from "react-bootstrap";
import { searchIcon } from "../../assets/Image";
import { useEffect } from "react";

const ContactModal = ({
    show,
    handleClose,
    modalData,
    handleModal,
    setModalData,
    fetchData,
    isLoading,
    handleDeatilsModal,
    handleSerachChnage,
}) => {
    const handleChnage = (e) => {
        if (e.target.checked) {
            const newData = modalData?.data.filter((item) => item.id % 2 === 0);
            setModalData((prev) => ({ ...prev, filterData: newData }));
        } else {
            setModalData((prev) => ({ ...prev, filterData: modalData?.data }));
        }
    };

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop !==
                document.documentElement.offsetHeight ||
            isLoading
        ) {
            return;
        }
        fetchData();
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isLoading]);

    return (
        <Modal size="lg" centered show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{modalData.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex justify-content-between mb-4">
                    <button
                        className={`btn btn-lg btn-outline-primary btnA ${
                            modalData.title === "Modal A" ? "active" : ""
                        }`}
                        type="button"
                        onClick={() => handleModal("Modal A")}
                    >
                        All Contacts
                    </button>
                    <button
                        className={`btn btn-lg btn-outline-warning btnB ${
                            modalData.title === "Modal B" ? "active" : ""
                        }`}
                        type="button"
                        onClick={() => handleModal("Modal B")}
                    >
                        US Contacts
                    </button>
                </div>
                <div className="w-100 d-flex justify-content-center">
                    <div className="d-flex w-50">
                        <div className="border rounded d-flex align-items-center p-1 w-100">
                            <img
                                src={searchIcon}
                                width={20}
                                height={20}
                                alt="searchIocn"
                                className="mx-2"
                            />
                            <input
                                className="searchBox border-0 outlined-none"
                                type="text"
                                onKeyDown={(e) =>
                                    handleSerachChnage(e, modalData.title)
                                }
                                placeholder="Search"
                                aria-label="Search"
                            />
                        </div>
                    </div>
                </div>
                <table className="table table-striped ">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Country</th>
                            <th scope="col">Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {modalData?.filterData?.map((item, index) => {
                            return (
                                <tr
                                    onClick={() => handleDeatilsModal(item)}
                                    className="pointer"
                                    key={index}
                                >
                                    <td>{item.id}</td>
                                    <td>{item?.country?.name}</td>
                                    <td>{item.phone}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between">
                <div className="checkbox">
                    <label>
                        <input onChange={handleChnage} type="checkbox" /> Only
                        Even
                    </label>
                </div>
                <button
                    className="btn btn-lg btn-outline-danger closeBtn"
                    type="button"
                    onClick={handleClose}
                >
                    Close
                </button>
            </Modal.Footer>
        </Modal>
    );
};

export default ContactModal;
