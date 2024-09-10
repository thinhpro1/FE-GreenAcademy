// Service methods

import axios from 'axios';

const apiEndpoint = 'https://66b080af6a693a95b538f138.mockapi.io/API/Personnels/personnel/personnel';

export const fetchContracts = async () => {
    try {
        const response = await axios.get(apiEndpoint);
        // Sắp xếp theo `status` (true trước) và `updated_at` (giảm dần)
        const sortedPersonnels = response.data.sort((a, b) => {
            if (b.status === a.status) {
                return new Date(b.updated_at) - new Date(a.updated_at);
            }
            return b.status - a.status;
        });

        return sortedPersonnels;
    } catch (error) {
        console.error("Có lỗi xảy ra khi lấy dữ liệu!", error);
        throw error;
    }
};

export const addPersonnel = async (newPersonnel) => {
    try {
        console.log('Thêm nhân viên mới:', newPersonnel);
        const response = await axios.post(apiEndpoint, newPersonnel);
        console.log('Phản hồi từ API:', response.data);

        return response.data;
    } catch (error) {
        console.error('Có lỗi xảy ra khi thêm nhân viên!', error);
        throw error;
    }
};

export const updatePersonnel = async (updatedPersonnel) => {
    try {
        const response = await axios.put(`${apiEndpoint}/${updatedPersonnel.id}`, updatedPersonnel);
        return response.data;
    } catch (error) {
        console.error('Có lỗi xảy ra khi cập nhật!', error);
        throw error;
    }
};

export const deletePersonnel = async (personnelId, personnelToUpdate) => {
    try {
        const response = await axios.put(`${apiEndpoint}/${personnelId}`, {
            ...personnelToUpdate,
            status: false
        });
        return response.data;
    } catch (error) {
        console.error('Có lỗi xảy ra khi cập nhật trạng thái nhân viên!', error);
        throw error;
    }
};
