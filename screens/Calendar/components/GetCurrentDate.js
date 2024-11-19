const GetCurrentDate =()=> {
    const date = new Date();
    return date.toISOString().split('T')[0];
};

export default GetCurrentDate;