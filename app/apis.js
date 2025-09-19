import axios from "axios";


  
export const getArticlesx = async () => {
  console.log("my requeste!", process.env.NEXT_PUBLIC_URL);
  
  // Check if URL is available
  if (!process.env.NEXT_PUBLIC_URL) {
    console.error("NEXT_PUBLIC_URL is not defined");
    return { data: [], error: "Configuration error: API URL not found" };
  }
  
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/article`, {
      next: {
        revalidate: 3600 // Revalidate every hour
      }
    });
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const data = await res.json();
    return { data, error: null };
  } catch (error) {
    console.error("FAILED ERROR", error);
    // Return empty data structure instead of throwing
    return { 
      data: [], 
      error: error.message || "Failed to fetch articles. Please try again later." 
    };
  }
};

export const getAllEvents = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/events`, {
      next: {
        revalidate: 3600 // Revalidate every hour
      }
    });
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    return res.json();
  } catch (error) {
    console.error("ERROR", error);
    throw error;
  }
};


export const getEvent = async (id) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/events/${id}`, {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    return res.json();
  } catch (error) {
    console.error("ERROR", error);
    throw error;
  }
};

export const createEvent = async (
  data,
  token,
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/events`, data,
    config
    );

    return res;
  } catch (error) {
    console.log("ERROR", error);
    return error?.response;
  }
};

export const updateEvent = async (
  id,
  data,
  token,
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_URL}/events/${id}`, data,
    config
    );

    return res;
  } catch (error) {
    console.log("ERROR", error);
    return error?.response;
  }
};


export const deleteEvent = async (
  token,
  id,
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_URL}/events/${id}`,
    config
    );

    return res;
  } catch (error) {
    console.log("ERROR", error);
    return error?.response;
  }
};


export const createEpisode = async (
  data,
  token,
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}/episode`, data,
    config
    );

    return res;
  } catch (error) {
    console.log("ERROR", error);
    return error?.response;
  }
};
export const updateGame = async (
  id,
  data,
  token,
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_URL}/games/${id}`, data,
    config
    );

    return res;
  } catch (error) {
    console.log("ERROR", error);
    return error?.response;
  }
};

export const getAllGames = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/games`, {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    return res.json();
  } catch (error) {
    console.error("ERROR", error);
    throw error;
  }
};

export const getGame = async (id) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/games/${id}`, {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    return res.json();
  } catch (error) {
    console.error("ERROR", error);
    throw error;
  }
};

export const deleteGame = async (
  token,
  id,
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_URL}/games/${id}`,
    config
    );

    return res;
  } catch (error) {
    console.log("ERROR", error);
    return error?.response;
  }
};

export const login = async (
  username,
  password
) => {
  try {
    const res = await axios.post(
      // `${process.env.REACT_APP_DEV_URL}/auth/login`, {
      `${process.env.NEXT_PUBLIC_URL}/auth/login`, {
      username,
      password
    });

    return res;
  } catch (error) {
    console.log("ERROR", error);
    return error?.response;
  }
};


export const getCryptoPrices = async () => {
  // Check if URL is available
  if (!process.env.NEXT_PUBLIC_URL) {
    console.error("NEXT_PUBLIC_URL is not defined");
    return { data: { data: { cryptoPrices: [] } }, error: "Configuration error: API URL not found" };
  }
  
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/crypto`);
    return { data: res.data, error: null };
  } catch (error) {
    console.error("ERROR fetching crypto prices:", error);
    // Return empty data structure instead of error response
    return { 
      data: { data: { cryptoPrices: [] } }, 
      error: error.message || "Failed to fetch crypto prices. Please try again later." 
    };
  }
};