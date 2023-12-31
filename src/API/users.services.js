// here signup data posted to endpoint
export const postUserData = async (url, newUser) => {
    fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            console.log('Response:', data); 
          })
          .catch(error => {
            console.error('Error:', error);
          });
};