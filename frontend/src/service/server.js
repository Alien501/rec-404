const uploadNewPost = async (postData) => {
    let url = 'http://localhost:3000/api/post';
    let options = {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
        // 'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
      },
      body: postData
    };
    const res = await fetch(url, options)
    const data = await res.json()
    if(data.status == 200) {
      alert('Submitted Successfully!');
      return true;
    }else{
      alert('Something went wrong! Try again later');
      return false;
    }
}

const getAllPost = async () => {
  const url = 'http://localhost:3000/api/all';
  const response = await fetch(url);
  const data = await response.json();
  if(data.status == 'found'){
    return data.data;
  }else{
    return false;
  }
}

const deletePost = async (data) => {
  const url = 'http://localhost:3000/api/delete';
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      Accept: '*/*',
      'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
      'Content-Type': 'application/json'
    },
    body: data
  })
  const res = await response.json();
  if(res.status === 200) {
    alert('Deleted Successfully!');
  }else{
    alert('Something went wrong while deleting!, Try again later')
  }
}


export {
    uploadNewPost,
    getAllPost,
    deletePost
}