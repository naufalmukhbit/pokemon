export const Header = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const POST = async (url: string, body: object, header = Header): Promise<any> => {
  const parseBody = JSON.stringify(body);
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: header,
      body: parseBody,
    });
    return {
      status: res.status,
      res: await res.json()
    }
  } catch (err) {
    throw err;
  }
};

export const GET = async (url: string, query: any, header = Header): Promise<any> => {
  try {
    let queries = (new URLSearchParams(query)).toString();
    let queryParams = queries && queries !== "" ? "?" + queries : "";
    
    const res = await fetch(url + queryParams, {
      method: "GET",
      headers: header,
    });
    return {
      status: res.status,
      res: await res.json()
    }
  } catch (err) {
    // throw err;
    return false;
  }
};
