export const login = async (username, password) => {
  const response = await fetch('http://localhost:8080/api/users', {
    headers: { 'Content-Type': 'application/json' },
    method: 'post',
    body: JSON.stringify({ username: username, password: password })
  });
  return response.json();
};


// registering a new user
export const signup = async (username, password) => {
  const response = await fetch(
    'http://localhost:8080/api/users?action=register',
    {
      headers: { 'Content-Type': 'application/json' },
      method: 'post',
      body: JSON.stringify({ username: username, password: password })
    }
  );
  return response.json();
};
