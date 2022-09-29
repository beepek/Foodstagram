import tokenService from "./tokenService";

const BASE_URL = "/api/posts";


export function create(post) {// DONT STRINGIFY, THIS IS A PHOTO POST! (formdata)
    return fetch(BASE_URL, {
      method: "POST",
      body: post,
      headers: {
        "Authorization": "Bearer " + tokenService.getToken(),
      },
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
    console.log("this is the res.json", res)
    if(res.ok) return res.json();

    return res.json().then(response => {
      console.log(response)
      throw new Error(response.err)
    })
  });
}