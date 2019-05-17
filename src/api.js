const API = auth => {
    const createRequestConfig = async ({getAccessToken}) => {
        const token = await getAccessToken();
        return {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/hal+json',
                'Content-Type': 'application/json',
            },
        };
    };

    const searchCompanies = async (search) => {
        const requestConfig = await createRequestConfig(auth);
        return fetch(`/companies/search/findByCodeContainsOrNameContainsAllIgnoreCase?search=${search}`, requestConfig);
    };

    const loadCompany = async (id) => {
        const requestConfig = await createRequestConfig(auth);
        return fetch(`/companies/${id}`, requestConfig);
    };

    const loadOwners = async () => {
        const requestConfig = await createRequestConfig(auth);
        return fetch('/owners', requestConfig);
    };

    const saveCompany = async (company, id) => {
        const {headers} = await createRequestConfig(auth);
        return fetch('/companies' + (id === undefined ? '' : '/' + id), {
            method: id ? 'PATCH' : 'POST',
            headers,
            body: JSON.stringify(company)
        });
    };

    return {
        searchCompanies,
        loadCompany,
        loadOwners,
        saveCompany
    }
};

export default API;