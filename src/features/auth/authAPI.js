export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function checkUser(loginInfo) {
  console.log(loginInfo);
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: {
          // authorization: `${JSON.parse(localStorage.getItem("token"))}`,
          "content-type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", JSON.stringify(data.token));
        resolve({ data });
      } else {
        const err = await response.text();
        console.log(err);
        reject(err);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function signOut(loginInfo) {
  return new Promise(async (resolve, reject) => {
    // TODO : on serer we will remove
    resolve({ data: "success" });
  });
}

export function checkAuth() {
  return new Promise(async (resolve, reject) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/auth/check", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        resolve({ data });
      } else {
        const err = await response.text();
        reject(err);
      }
    } catch (error) {
      reject(error);
    }
  });
}
