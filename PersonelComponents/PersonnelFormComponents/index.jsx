import React, { useState, useEffect } from 'react';
import FormInput from "../../../components/FormInputComponents";
import InputComponents from "../../../components/InputComponents";
import 'bootstrap/dist/css/bootstrap.min.css';

const PersonnelForm = ({ onSubmit, personnels }) => {
    const [formData, setFormData] = useState({
        id: '',
        positionId: '',
        allowanceId: '',
        qualificationId: '',
        contractId: '',
        employeeId: '',
        employeeName: '',
        positionName: '',
        contractName: '',
        date: '',
        address: '',
        gender: '',
        email: '',
        phoneNumber: '',
        departmentName: '',
        qualificationName: '',
        CCCD: '',
        status: true,
        image: [],
        created_at: '',
        updated_at: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const now = new Date().toISOString().slice(0, 16); // Slice for YYYY-MM-DD format
        setFormData((prevState) => ({
            ...prevState,
            created_at: now,
            updated_at: now,
        }));
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        const now = new Date().toISOString().slice(0, 16); // Move 'now' here
        if (files) {
            setFormData({
                ...formData,
                [name]: Array.from(files),
                created_at: now,
                updated_at: now
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
                created_at: now,
                updated_at: now
            });
        }
    };

    const validate = () => {
        const newErrors = {};
        const isNumber = value => /^\d+$/.test(value);
        const isValidEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        if (!formData.employeeId) {
            newErrors.employeeId = 'Mã nhân viên không được để trống';
        } else if (formData.employeeId.length !== 10) {
            newErrors.employeeId = 'Mã nhân viên phải là 10 ký tự';
        } else if (personnels.some(personnel => personnel.employeeId === formData.employeeId)) {
            newErrors.employeeId = 'Mã nhân viên đã tồn tại';
        }

        if (!formData.employeeName) newErrors.employeeName = 'Tên nhân viên không được để trống';

        if (!formData.CCCD) {
            newErrors.CCCD = 'CCCD không được để trống';
        } else if (!isNumber(formData.CCCD)) {
            newErrors.CCCD = 'CCCD chỉ được chứa số';
        } else if (formData.CCCD.length !== 12) {
            newErrors.CCCD = 'CCCD phải là 12 ký tự';
        } else if (personnels.some(personnel => personnel.CCCD === formData.CCCD)) {
            newErrors.CCCD = 'CCCD đã tồn tại';
        }

        if (!formData.positionName || formData.positionName === "--Chọn chức vụ--") {
            newErrors.positionName = 'Chức vụ không được để trống';
        }
        if (!formData.departmentName) newErrors.departmentName = 'Tên Phòng ban không được để trống';
        if (!formData.address) newErrors.address = 'Địa chỉ không được để trống';
        if (!formData.gender || formData.gender === "--Chọn giới tính--") {
            newErrors.gender = 'Giới tính không được để trống';
        }

        if (!formData.phoneNumber) {
            newErrors.phoneNumber = 'Số điện thoại không được để trống';
        } else if (!isNumber(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Số điện thoại chỉ được chứa số';
        } else if (formData.phoneNumber.length !== 10) {
            newErrors.phoneNumber = 'Số điện thoại phải là 10 ký tự';
        }
        if (!formData.qualificationName) {
            newErrors.qualificationName = 'Bằng cấp không được để trống';
        }
        if (!formData.email) {
            newErrors.email = 'Email không được để trống';
        } else if (!isValidEmail(formData.email)) {
            newErrors.email = 'Email không hợp lệ';
        }
        if (!formData.date) {
            newErrors.date = 'Ngày sinh không được để trống';
        }
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            const validImages = formData.image.every(file => file instanceof File);
            if (validImages) {
                onSubmit({
                    ...formData,
                    status: true
                });
                const now = new Date().toISOString().slice(0, 10);
                setFormData({
                    id: '',
                    positionId: '',
                    allowanceId: '',
                    qualificationId: '',
                    contractId: '',
                    employeeId: '',
                    employeeName: '',
                    positionName: '',
                    departmentName: '',
                    contractName: '',
                    date: '',
                    address: '',
                    gender: '',
                    email: '',
                    phoneNumber: '',
                    CCCD: '',
                    qualificationName: '',
                    status: true,
                    image: [],
                    created_at: now,
                    updated_at: now
                });
                setErrors({});
                console.log(formData);
            } else {
                setErrors({ image: 'Hình ảnh không hợp lệ' });
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-md-6">
                    <FormInput
                        label="Mã nhân viên"
                        type="text"
                        name="employeeId"
                        value={formData.employeeId}
                        onChange={handleChange}
                        error={errors.employeeId}
                    />
                    <FormInput
                        label="Tên nhân viên"
                        type="text"
                        name="employeeName"
                        value={formData.employeeName}
                        onChange={handleChange}
                        error={errors.employeeName}
                    />
                    <FormInput
                        label="Phòng ban"
                        type="text"
                        name="departmentName"
                        value={formData.departmentName}
                        onChange={handleChange}
                        error={errors.departmentName}
                    />
                    <div className="form-group">
                        <label>Chức vụ</label>
                        <select
                            name="positionName"
                            value={formData.positionName}
                            onChange={handleChange}
                            className="form-control"
                        >
                            <option value="">--Chọn chức vụ--</option>
                            <option value="Giám đốc">Giám đốc</option>
                            <option value="Trưởng phòng">Trưởng phòng</option>
                            <option value="Nhân viên chính thức">Nhân viên chính thức</option>
                            <option value="Nhân viên thử việc">Nhân viên thử việc</option>
                        </select>
                        {errors.positionName && <div className="text-danger">{errors.positionName}</div>}
                    </div>

                    <FormInput
                        label="Ngày sinh"
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        error={errors.date}
                    />

                    <FormInput
                        label="Địa chỉ"
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        error={errors.address}
                    />
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Giới tính</label>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            className="form-control"
                        >
                            <option value="">--Chọn giới tính--</option>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                        </select>
                        {errors.gender && <div className="text-danger">{errors.gender}</div>}
                    </div>


                    <FormInput
                        label="Email"
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                    />
                    <FormInput
                        label="Số điện thoại"
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        error={errors.phoneNumber}
                    />
                    <FormInput
                        label="CCCD"
                        type="text"
                        name="CCCD"
                        value={formData.CCCD}
                        onChange={handleChange}
                        error={errors.CCCD}
                    />
                    <FormInput
                        label="Bằng cấp"
                        type="text"
                        name="qualificationName"
                        value={formData.qualificationName}
                        onChange={handleChange}
                        error={errors.qualificationName}
                    />
                    <div className="form-group">
                        <label>Image</label>
                        <input
                            type="file"
                            name="image"
                            multiple
                            onChange={handleChange}
                            className="form-control"
                            accept=".jpg,.png"
                        />
                        {formData.image.length > 0 && (
                            <ul className="list-group mt-2">
                                {formData.image.map((image, index) => (
                                    <li key={index} className="list-group-item">
                                        {image.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
            <button type="submit" className="btn btn-primary">Thêm nhân viên</button>
        </form>
    );
};

export default PersonnelForm;
