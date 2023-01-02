export function GetGlobalService({ slug, title, description, body }) {
    const axiosInstance = ApiInterceptor();
  
    const get = () => new Observable(observer => {
      const params = {}
      axiosInstance.get(`articles`, { params })
        .then(response => response)
        .then(data => {
          observer.next(data);
          observer.complete();
        })
        .catch(err => observer.error(err));
    });
  
    return get;
  }