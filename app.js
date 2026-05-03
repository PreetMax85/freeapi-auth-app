const BASE_URL = 'https://api.freeapi.app/api/v1/users';

async function handleResponse(response) {
    const data = await response.json();
    if (response.ok) {
        return { success: true, data: data.data };
    } else {
        // More robust error extraction for FreeAPI's error format
        let details = '';
        if (data.errors && Array.isArray(data.errors) && data.errors.length > 0) {
            details = ': ' + data.errors.map(e => {
                if (typeof e === 'string') return e;
                return e.msg || e.message || JSON.stringify(e);
            }).join(', ');
        }
        
        const errorMessage = (data.message || 'Something went wrong') + details;
        console.error('Full API Error Context:', data);
        return { success: false, message: errorMessage };
    }
}

async function registerUser(username, email, password) {
    try {
        const response = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                username,
                email,
                password,
                role: 'USER'
            })
        });
        return await handleResponse(response);
    } catch (error) {
        return { success: false, message: error.message };
    }
}

async function loginUser(username, password) {
    try {
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        });
        const result = await handleResponse(response);
        if (result.success && result.data.accessToken) {
            localStorage.setItem('token', result.data.accessToken);
        }
        return result;
    } catch (error) {
        return { success: false, message: error.message };
    }
}

async function logoutUser() {
    try {
        const response = await fetch(`${BASE_URL}/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        const result = await handleResponse(response);
        if (result.success) {
            localStorage.removeItem('token');
        }
        return result;
    } catch (error) {
        return { success: false, message: error.message };
    }
}

async function getCurrentUser() {
    try {
        const response = await fetch(`${BASE_URL}/current-user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        return await handleResponse(response);
    } catch (error) {
        return { success: false, message: error.message };
    }
}

// Export functions for use in other files if needed, 
// though in vanilla JS we'll just include the script.
window.authApp = {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser
};
