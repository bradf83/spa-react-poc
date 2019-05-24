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

    const loadProducts = async (page = 0, size = 2) => {
        const requestConfig = await createRequestConfig(auth);
        return fetch('/products?page=' + page + '&size=' + size, requestConfig);
    };

    const saveCompany = async (company, id) => {
        const {headers} = await createRequestConfig(auth);
        return fetch('/companies' + (id === undefined ? '' : '/' + id), {
            method: id ? 'PATCH' : 'POST',
            headers,
            body: JSON.stringify(company)
        });
    };

    /**
     * Downloads an excel file from our API server.  This is a bit ugly but seems to work.  Based on the responses in this
     * stack overflow: https://stackoverflow.com/questions/32545632/how-can-i-download-a-file-using-window-fetch
     * I would be open to a better cleaner way.
     * @returns {Promise<void>}
     */
    const downloadCompaniesExcel = async () => {
        //TODO: This needs to be better
        const token = await auth.getAccessToken();
        const requestConfig = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        fetch('/companies/excelDownload', requestConfig).then(response => response.blob())
            .then(blob => {
                var url = window.URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.href = url;
                a.download = "company_listing.xlsx";
                document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
                a.click();
                a.remove();  //afterwards we remove the element again
                window.URL.revokeObjectURL(url);
            });
    };

    return {
        searchCompanies,
        loadCompany,
        loadOwners,
        saveCompany,
        downloadCompaniesExcel,
        loadProducts,
    }
};

export default API;