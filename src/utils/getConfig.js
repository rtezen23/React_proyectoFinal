const getConfig = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

/* axios.post('url', data, getConfig()); */
export default getConfig;