const BASE_URL = 'http://localhost:8080'; // Adjust base URL as needed

const getAllCamps = async () => {
  const response = await fetch(`${BASE_URL}/donationcamp/all`);
  if (!response.ok) throw new Error('Failed to fetch donation camps');
  return response.json();
};

const approveDonationCamp = async (id, approved) => {
  const response = await fetch(`${BASE_URL}/donationcamp/approve/${id}?approved=${approved}`, {
    method: 'POST',
  });
  if (!response.ok) throw new Error('Failed to approve donation camp');
  return response.json();
};

export default {
  getAllCamps,
  approveDonationCamp,
};
