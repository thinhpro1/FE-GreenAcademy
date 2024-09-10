import React, { useState, useEffect } from 'react';
import '../Personnel.scss';
import { CSVLink } from "react-csv";
import SearchComponents from "../../../components/SearchComponents";
import ButtonComponents from "../../../components/ButtonComponents";

const PersonnelTittleComponents = ({ personnels = [], onSearch, onAddNewClick }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    const handleSearch = () => {
        const searchValue = searchTerm.toLowerCase();

        const filteredpersonnels = personnels.filter(personnel => {
            const employeeId = personnel.employeeId ? personnel.employeeId.toLowerCase() : '';
            const employeeName = personnel.employeeName ? personnel.employeeName.toLowerCase() : '';
            const positionName = personnel.positionName ? personnel.positionName.toString().toLowerCase() : '';
            const email = personnel.email ? personnel.email.toLowerCase() : '';
            const phoneNumber = personnel.phoneNumber ? personnel.phoneNumber.toLowerCase() : '';
            const status = personnel.status ? 'active' : 'inactive';
            const CCCD = personnel.CCCD ? personnel.CCCD.toLowerCase() : '';

            return (
                (employeeId.includes(searchValue) ||
                    employeeName.includes(searchValue) ||
                    positionName.includes(searchValue) ||
                    email.includes(searchValue) ||
                    phoneNumber.includes(searchValue) ||
                    CCCD.includes(searchValue)) &&
                (statusFilter === '' || status === statusFilter)
            );
        });

        onSearch(filteredpersonnels);
    };

    useEffect(() => {
        handleSearch(); // Gọi lại hàm tìm kiếm mỗi khi searchTerm hoặc statusFilter thay đổi
    }, [searchTerm, statusFilter]);

    const handleImportClick = () => {
        document.getElementById('import').click();
    };

    // Format the data for CSV export
    const formattedPersonnels = Array.isArray(personnels) ? personnels.map(personnel => ({
        employeeId: personnel.employeeId,
        employeeName: personnel.employeeName,
        positionName: personnel.positionName,
        email: personnel.email,
        phoneNumber: personnel.phoneNumber,
        status: personnel.status ? 'active' : 'inactive',
        CCCD: personnel.CCCD
    })) : [];

    return (
        <div className="row personnel-tittle d-flex justify-content-between align-items-center">
            <div className="col-sm-4">
                <h2>DANH SÁCH NHÂN VIÊN</h2>
            </div>
            <div className="col-sm-8 d-flex justify-content-end align-items-center">
                <div className="d-flex ms-auto">
                    <SearchComponents
                        onSearch={(term) => setSearchTerm(term)}
                        placeholder="Tìm kiếm..."
                        className="me-2"
                    />
                    <select
                        className="form-select form-select-sm"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
                <ButtonComponents
                    className='btn btn-success me-2'
                    onClick={onAddNewClick}
                >
                    Thêm mới
                </ButtonComponents>
                <ButtonComponents
                    className='btn btn-danger me-2'
                    onClick={handleImportClick}
                >
                    <i className="fas fa-file-excel"></i>&nbsp;
                </ButtonComponents>
                <input id='import' type='file' hidden />

                <CSVLink
                    data={formattedPersonnels}
                    filename={"List-personnel.csv"}
                    className="btn btn-primary"
                >
                    <i className="fas fa-file-export"></i>&nbsp;
                </CSVLink>
            </div>
        </div>
    );
};

export default PersonnelTittleComponents;
