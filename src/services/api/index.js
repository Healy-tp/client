import urlLib from "url";
import axios from "axios";
import _ from "lodash";

// export the class itself for testing. We export an instance of the class as the default export for regular app usage
export class Api {
  /* **** standard http methods **** */
  get(url, params = {}) {
    return this._request("get", url, { params });
  }

  getFile(url, params = {}) {
    return this._request("get", url, { params, responseType: "blob" });
  }

  post(url, data = {}, params = {}, headers = {}) {
    return this._request("post", url, { data, params, headers });
  }

  put(url, data = {}, params = {}) {
    return this._request("put", url, { data, params });
  }

  delete(url, data = {}, params = {}) {
    return this._request("delete", url, { data, params });
  }

  /* **** util methods **** */
  setXHeaders(userId, accountId) {
    this.userId = userId;
    this.accountId = accountId;
  }

  /* **** internal class methods **** */
  _request(
    method,
    url,
    { data = {}, params = {}, headers = {}, responseType = null } = {},
  ) {
    // throw error if no url or method given
    if (!url || !method) {
      return Promise.reject(
        new Error("Please provide a url and method for the request"),
      );
    }

    // get requests don't support body data
    if (method === "get") {
      data = {};
    }
    // handle params if included on url so they all get put on properly
    const { url: justUrl, params: justParams } = this._splitUrlAndParams(
      url,
      params,
    );
    url = justUrl;
    params = justParams;

    // supplement headers
    headers = {
      Accept: "application/json",
      ...headers,
    };

    // make request
    return axios({
      method,
      url,
      headers,
      data,
      params,
      responseType,
      withCredentials: true
      // using defaults for responseType and xsrf
    })
      .then((response) => {
        return responseType === null ? response.data : response;
      })
      .catch((err) => {
        if (err.response.status === 401) {
          window.location.href = "/login";
          return Promise.reject(err);
        }
        throw err;
      });
  }

  _splitUrlAndParams(url, params) {
    if (_.includes(url, "?")) {
      // pull off any the dev put directly on the url instead of in the params
      const urlQuery = urlLib.parse(url, true).query;
      // combine into a single params object
      params = {
        ...urlQuery,
        ...params,
      };
      // remove the params from the original url so we don't double add them
      url = url.split("?")[0];
    }
    return { url, params };
  }
}

export default new Api();
