const loginUser = async (url, email, password) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.status === 200) {
      const responseData = await response.json();

      return responseData.token;
    } else {
      throw new Error("Login failed with status: " + response.status);
    }
  } catch (error) {
    throw new Error("Failed to login user: " + error.message);
  }
};

export { loginUser };
