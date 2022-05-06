import axios from 'axios';
import s3 from './s3';
import puppeteer from 'puppeteer';

const htmlToImage = async (html = '') => {
	console.log('... launching browser ...');

	const browser = await puppeteer.launch({
		headless: false,
		args: ['--no-sandbox'],
		timeout: 0,
	});

	console.log('... generating previews ...');
	const page = await browser.newPage();
	await page.setContent(html);
	const content = await page.$('body');

	let imageBuffer;
	console.log('... taking a screenshot ...');
	try {
		imageBuffer = await content.screenshot({ omitBackground: true });
	} catch (e) {
		console.log('Error in screenshot', e);
	}

	console.log('... Closing a browser ...');
	await page.close();
	await browser.close();
	return imageBuffer;
};

const generatePreview = async ({ name, headline, username }) => {
	console.log('... Generating image html ...');

	const thumbnail = 'https://peerlist.io/favicon.png';
	const emptyDP = `${process.env.NEXT_PUBLIC_PREFIX_URL}/previewDemo/johnrao.jpeg`;
	const html = `<html>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;900&display=swap');
      body {width: 1200px;height: 628px;color: #ffffff;font-family: 'Inter', sans-serif;margin: 0;padding: 0;}
      .wrapper {display: flex;align-items: center;justify-content: center;height: 100%;background: linear-gradient(118.63deg, #444D56 0%, #0E1723 67.66%);}
      .og-description {flex: 1;padding-left: 80px;}
      .og-image {flex: 1;display: flex;justify-content: center;align-items: center;background-color: transparent;background-image: linear-gradient(rgba(255, 255, 255, 0.240) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 248, 248, 0.240) 1px, transparent 1px);height: 100%;background-size: 80px 78px;}
      .name {color: #ffffff;font-weight: 900;font-size: 80px;line-height: 120%;margin-bottom: 24px;text-shadow: -4px 4px 0px #24292E;}
      .headline {font-weight: 400;font-size: 32px;}.profile {border-radius: 50%;width: 200;height: 200px;filter: drop-shadow(4px 4px 0px #24292E);}
      .thumbnail {position: relative;width: 48px;height: 48px;}
      .username {display: flex;align-items: center;margin-left: 8px;font-size: 24px;}
      .username-wrapper {position: absolute;display: flex;bottom: 70;}
      .circle {border: 1px solid rgb(111, 207, 151);border-radius: 50%;display: flex;justify-content: center;align-items: center;}
      .c1 {padding: 40px;border: 1px solid rgb(111, 207, 151);}
      .c2 {width: 400px;height: 400px;border: 1px solid rgb(111, 207, 151, 0.5);}
      .c3 {position: relative;width: 520px;height: 520px;border: 1px solid rgb(111, 207, 151, 0.2);}
    </style> 
    <body class="body">
      <div class="wrapper">
        <div class="og-description">
          <div class="name">${name}</div>
          <div class="headline">${headline}</div>
        </div>
        <div class="og-image">
          <div class="circle c3">
            <div class="circle c2">
              <div class="circle c1">
                <img class="profile"
                  src="${emptyDP}"></img>
              </div>
              <div class="username-wrapper">
                <img class="thumbnail" src="${thumbnail}"></img>
                <div class="username">/${username}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>`;

	let image;

	try {
		image = await htmlToImage(html);
	} catch (e) {
		console.log('HTML to image:', e);
	}

	console.log('... Image received. Uploading to S3 ...');
	const imageID = `thisisfordemo.png`;

	let signedURL;

	// STEP1: Get signed url
	try {
		signedURL = await s3.signedUrl(`previewDemo/${imageID}`);
	} catch (error) {
		console.log('Err in signedURL', error);
	}

	console.log('... received signed URL ...');

	// STEP2: upload image
	const uploadURL = await axios.put(signedURL, image, {
		headers: {
			'Content-Type': 'application/octet-stream',
		},
	});
	console.log('... Upload finished! ...');
	console.log('... Preview generated successfully! ...');

	return uploadURL;
};

export default generatePreview;
