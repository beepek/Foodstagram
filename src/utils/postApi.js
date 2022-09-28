import tokenService from "./tokenService";

const BASE_URL = "/api/posts";


export function create(post) {
   post.forEach(item => { console.log(item)})
    
  return fetch(BASE_URL, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
 "Authorization": "Bearer " + tokenService.getToken(),
},
body: JSON.stringify(post)
  }).then((res) => {
    if (res.ok) return res.json(); 
    return res.json().then(response => {
      console.log(response)
      throw new Error(response.err)
    })
  });
}


export function getAll() {
  return fetch(BASE_URL, {
    headers: {
      'Authorization': 'Bearer ' + tokenService.getToken() 
    }
  })
  .then((res) => {
    if(res.ok) return res.json();

    return res.json().then(response => {
      console.log(response)
      throw new Error(response.err)
    })
  });
}