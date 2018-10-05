const CDN = s => `http://cdnjs.cloudflare.com/ajax/libs/${s}`;

const ramda = CDN('ramda/0.21.0/ramda.min');
const jquery = CDN('jquery/3.0.0-rc1/jquery.min');

requirejs.config({ paths: { ramda, jquery } })

require(['jquery', 'ramda'], ($, { compose, curry, map, prop }) => {
    /* 
     1. Construct a url for our particular search term
     2. Make the flicker api call
     3. Transform the resulting json into html images
     4. place them on the screen
     */ 
    const Impure = {
        getJson: curry((callback, url) => $.getJSON(url, callback)),
        setHtml: curry((el, html) => $(el).html(html)),
        trace: curry((tag, x) => {console.log(tag, x); return x;})
    }

    const host = 'api.flickr.com';
    const path = '/services/feeds/photos_public.gne';
    const query = t => `?tags=${t}&format=json&jsoncallback=?`;
    const url = t => `https://${host}${path}${query(t)}`;

    const img = src => $('<img/>', { src })

    const mediaUrl = compose(prop('m'), prop('media'));
    const mediaToImg = compose(img, mediaUrl);

    const images = compose(map(mediaToImg), prop('items'));
    const render = compose(Impure.setHtml('#js-main'), images);
    const app = compose(Impure.getJson(render), url);
    
    app('cats');
})