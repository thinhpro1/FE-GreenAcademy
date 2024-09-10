import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import InputComponents from "../../../components/InputComponents";

const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${hours}:${minutes}:${seconds} / ${day}-${month}-${year}`;
};
const PersonnelViewComponents = ({ show, handleClose, personnel }) => {
    if (!personnel) return null;

    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Chi tiết nhân viên</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Mã nhân viên</label>
                            <input
                                type="text"
                                className="form-control"
                                value={personnel.employeeId}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label>Tên nhân viên</label>
                            <input
                                type="text"
                                className="form-control"
                                value={personnel.employeeName}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label>Giới tính</label>
                            <input
                                type="text"
                                className="form-control"
                                value={personnel.gender}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label>Ngày sinh</label>
                            <input
                                type="date"
                                className="form-control"
                                value={personnel.date}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label>Địa chỉ</label>
                            <input
                                type="address"
                                className="form-control"
                                value={personnel.address}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label>Phòng ban</label>
                            <input
                                type="text"
                                className="form-control"
                                value={personnel.departmentName}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label>Chức vụ</label>
                            <input
                                type="text"
                                className="form-control"
                                value={personnel.positionName}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label>Hợp đồng</label>
                            <input
                                type="text"
                                className="form-control"
                                value={personnel.contractName}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="text"
                                className="form-control"
                                value={personnel.email}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label>Số điện thoại</label>
                            <input
                                type="text"
                                className="form-control"
                                value={personnel.phoneNumber}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label>Bằng cấp</label>
                            <input
                                type="text"
                                className="form-control"
                                value={personnel.qualificationName}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label>CCCD</label>
                            <input
                                type="text"
                                className="form-control"
                                value={personnel.CCCD}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label>Ngày tạo</label>
                            <InputComponents
                                type="text"
                                name="created_at"
                                value={formatDateTime(personnel.created_at)}
                                onChange={() => {
                                }}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label>Ngày cập nhật</label>
                            <InputComponents
                                type="text"
                                name="updated_at"
                                value={formatDateTime(personnel.updated_at)}
                                onChange={() => {
                                }}
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label>Trạng thái</label>
                            <input
                                type="text"
                                className="form-control"
                                value={personnel.status}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label>Hình ảnh</label>
                            {personnel.image && Array.isArray(personnel.image) && personnel.image.length > 0 ? (
                                <div className="mt-2">
                                    {personnel.image.map((image, index) => (
                                        <img key={index} src={image.url} alt={image.name} className="img-thumbnail mb-2"
                                            style={{ width: '100px', height: '100px' }} />
                                    ))}
                                </div>
                            ) : (
                                <p>Chưa có hình ảnh</p>
                            )}
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PersonnelViewComponents;
