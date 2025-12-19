export default {
  async fetch(request) {
    const url = new URL(request.url);
  
    let path = url.pathname.toLowerCase().replace(/^\//, '').split('/')[0];
    let userAgent = request.headers.get('User-Agent');
    if (userAgent && userAgent.includes('Discordbot') && path != ''){
      let responceHTML = `<!DOCTYPE html>
                          <html>
                          <head>
                          </head>
                          <body>
                          </body>
                          </html>`;
      let pronounsrequest = new Request('https://en.pronouns.page/api/profile/get/' + path + '?version=2')
      let pronounsresponce = await fetch(pronounsrequest);
      if (!pronounsresponce.ok){
        throw new Error(`HTTP error! status: ${pronounsresponce.status}`);
      }
      let pronounsData = await pronounsresponce.json();
      let sourcepage = 'https://en.pronouns.page/@' + path;
      let pronouns = '';
      for (let pronoun of pronounsData.profiles.en.pronouns){
        if (pronoun.opinion == 'yes' || pronoun.opinion == 'love'){
          pronouns += pronoun.value + "/";
        }
      }
      if (pronouns == ''){
        for (let pronoun of pronounsData.profiles.en.pronouns){
          if (pronoun.opinion == 'meh' || pronoun.opinion == 'okey' || pronoun.opinion == 'okay' || pronoun.opinion == 'ok'){
            pronouns += pronoun.value + "/";
          }
        }
      }
      pronouns = pronouns.slice(0, -1);
      console.log(pronouns)
      // Doing names TODO
      let name = '';
      let listBool = true;
      while (name = '' && listBool){
        let i = 0;
        if (pronounsData.profiles.en.names[i].opinion == 'yes' || pronounsData.profiles.en.names[i].opinion == 'love'){
          name += pronounsData.profiles.en.names[i].value;
        }
      }
      if (name == ''){
        name += pronounsData.username
      }
      let ogTags = `<meta property="og:title" content="${name} - ${pronouns}" />
                    <meta property="og:description" content="${pronounsData.profiles.en.description}" />
                    <meta property="og:image" content="${pronounsData.avatar}" />
                    <meta property="og:url" content="${sourcepage}" />`;

      let modifiedResponce = responceHTML.replace('<head>', `<head>${ogTags}`);
      return new Response(modifiedResponce, {
        headers: { 'content-type': 'text/html;charset=UTF-8' },
        status: 200,
      });
    }

    if (path == ''){
      return new Response('Made by lilly (I have nothing to do with the pronouns.page team) ~ to redirect to ur (must be a en.) pronouns.page the url should be https://my.pronou.nz/{ur page} for example mine is https://my.pronou.nz/AuroraLilly <3 have a lovely day!');
    }
    
    let page = 'https://en.pronouns.page/@';
    return Response.redirect(page + path, 302);
  },
 };
