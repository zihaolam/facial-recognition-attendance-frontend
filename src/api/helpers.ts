export const buildQueryParams = function(params: {[key: string]: string| number | boolean}) {
  var str = [];
  for (var p in params)
    if (params.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(params[p]));
    }
  return str.join("&");
}