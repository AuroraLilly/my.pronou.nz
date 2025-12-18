export default {
  async fetch(request) {
    const url = new URL(request.url);
  
    let path = url.pathname.toLowerCase().replace(/^\//, '').split('/')[0];

    if (path == ""){
      return new Response("Made by lilly (I have nothing to do with the pronouns.page team) ~ to redirect to ur (must be a en.) pronouns.page the url should be https://my.pronou.nz/{ur page} for example mine is https://my.pronou.nz/AuroraLilly <3 have a lovely day!");
    }
    let page = 'https://en.pronouns.page/@';

    return Response.redirect(page + path, 302);
  },
 };
