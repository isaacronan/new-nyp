import convert from 'xml-js';

const xmlToJson: (xml: string) => { [key: string]: any } = (xml) => {
    return convert.xml2js(xml, { compact: false })
};

interface IMedia {
    title: string | null;
    url: string;
}

export interface ISummary {
    title: string;
    description: string;
    link: string;
    media: IMedia[];
}

const mediaElementToMedia: (mediaElement: any) => IMedia = (mediaElement) => {
    const url = mediaElement.attributes.url;
    const title = mediaElement.elements === undefined ? null : mediaElement.elements[0].elements[0].text;
    return { url, title };
};

const itemElementToSummary: (itemElement: any) => ISummary = (itemElement) => {
    const title = itemElement.elements.find((el: any) => el.name === 'title').elements[0].text;
    const description = itemElement.elements.find((el: any) => el.name === 'description').elements[0].cdata;
    const link = itemElement.elements.find((el: any) => el.name === 'link').elements[0].text;
    const media = itemElement.elements.filter((el: any) => el.name === 'media:content').map(mediaElementToMedia);
    return { title, description, link, media };
};

export const getSummaries: (path: string) => Promise<ISummary[]> = async (path) => {
    const feed = await fetch(`https://nypost.com${path === '/' ? path : path + '/'}feed`).then(r => r.text()).then(xmlToJson);
    const itemElements = feed.elements[0].elements[0].elements.filter((el: any) => el.name === 'item')
    return itemElements.map(itemElementToSummary);
};

interface IStory {
    title: string;
    paragraphs: string[]
}

interface IScrapeParams {
    rootUrl: string;
    scrapeUrl: string;
    selectors: string[];
}

const createParamRegistry = () => {
    const registry: { [domain: string]: { rootUrl: string, selectors: string[] }} = {};

    const register = (domain: string, rootUrl: string, selectors: string[]) => {
        registry[domain] = { rootUrl, selectors };
    };

    const get: (scrapeUrl: string) => IScrapeParams = (scrapeUrl) => {
        const domain = scrapeUrl.split('/')[2];
        return {
            ...registry[domain],
            scrapeUrl
        }
    };

    return { register, get };
}

const paramRegistry = createParamRegistry();

paramRegistry.register('nypost.com', 'https://nypost.com/feed/', ['h1.headline', '.entry-content p']);
paramRegistry.register('pagesix.com', 'https://pagesix.com/feed/', ['h1', '.entry-content p']);
paramRegistry.register('decider.com', 'https://decider.com/feed/', ['h1.story__heading', '.entry-content p']);


export const getStory: (url: string) => Promise<IStory> = async (url) => {
    const params = paramRegistry.get(url);
    const queryString = [
        `rootUrl=${params.rootUrl}`,
        `scrapeUrl=${params.scrapeUrl}`,
        ...params.selectors.map(selector => `selector=${selector}`)
    ].join('&');
    const response = await (await fetch(`http://localhost:3004/scrape?${queryString}`)).json();
    return {
        title: response.results[0],
        paragraphs: response.results[1]
    }
};