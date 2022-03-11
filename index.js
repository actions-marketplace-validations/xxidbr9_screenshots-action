const core = require('@actions/core');
const io = require('@actions/io');
const puppeteer = require('puppeteer');
const fs = require('fs');
const util = require('util');
const readdir = util.promisify(fs.readdir);
const telegram = require('./telegram.js');

const DEFAULT_DESKTOP_VIEWPOINT_RATIO = [
  { width: 1366, height: 768 },
  { width: 1920, height: 1080 },
];

/* 
? TODO :
- [ ] Clean the code
- [ ] Refactor all code
- [ ] Module Concepts
- [ ] Add Custom size
*/

const DEFAULT_TYPE = 'jpeg';
const deviceNames = Object.keys(puppeteer.devices);

const PATH = process.env.GITHUB_WORKSPACE
  ? `${process.env.GITHUB_WORKSPACE}/screenshots/`
  : `screenshots/`;

const POST_FIX = process.env.GITHUB_SHA
  ? `${process.env.GITHUB_SHA}`.substr(0, 7)
  : `${new Date().getTime()}`;

async function run() {
  try {
    const url =
      core.getInput('url') ||
      'https://xxidbr9.github.io/contoh-responsive-di-css/';
    let includedDevices = core.getInput('devices') || 'iPhone 12 Pro';
    const noDesktop = core.getInput('noDesktop') === 'true';
    const fullPage = core.getInput('fullPage') === 'true';
    let screenshotType = core.getInput('type') || DEFAULT_TYPE;

    screenshotType = screenshotType.toLowerCase();

    if (!['png', 'jpeg'].includes(screenshotType)) {
      screenshotType = DEFAULT_TYPE;
    }

    core.startGroup('Action config');
    console.log('Input args:', {
      url,
      noDesktop: noDesktop,
      devices: includedDevices,
      fullPage,
      type: screenshotType,
    });
    core.endGroup(); // Action config

    if (!url) {
      console.log([`Task done`, `- "url" is empty.`].join('\n'));
      return;
    }

    includedDevices = includedDevices.split(',');

    let inValidedDevices = includedDevices.filter(
      (name) => !deviceNames.includes(name)
    );
    inValidedDevices = inValidedDevices.map((name) => `- "${name}"`);
    if (inValidedDevices.length) {
      console.error(
        ['Following devices name are invalid:', ...inValidedDevices].join('\n')
      );
    }

    includedDevices = includedDevices.filter((name) =>
      deviceNames.includes(name)
    );

    if (noDesktop && !includedDevices.length) {
      console.log(
        [
          `Task done`,
          `- No desktop and and devices are selected. You have chose at least one desktop or device.`,
        ].join('\n')
      );
      return;
    }

    const launchOptions = !process.env.GITHUB_SHA
      ? {}
      : {
        executablePath: 'google-chrome-stable',
        args: ['--no-sandbox'],
      };
    const browser = await puppeteer.launch(launchOptions);

    const desktopPage = await browser.newPage();

    if (process.env.GITHUB_WORKSPACE) {
      await io.mkdirP(`${process.env.GITHUB_WORKSPACE}/screenshots/`);
    }

    if (!noDesktop) {
      core.startGroup('start process desktop');
      console.log('Processing desktop screenshot');
      await desktopPage.goto(url, { waitUntil: 'networkidle0' });
      for (const { width, height } of DEFAULT_DESKTOP_VIEWPOINT_RATIO) {
        await desktopPage.setViewport({ width, height });
        await desktopPage.screenshot({
          path: `${PATH}desktopPage${width}x${height}-${POST_FIX}.${screenshotType}`,
          fullPage,
          type: screenshotType,
        });
      }
      core.endGroup(); // end start process desktop
    }

    if (includedDevices.length) {
      core.startGroup('start process mobile devices');
      console.log('Processing mobile devices screenshot');
      const mobilePages = await Promise.all([
        ...Array.from({ length: includedDevices.length }).fill(
          browser.newPage()
        ),
      ]);
      for (const [index, page] of mobilePages.entries()) {
        console.log('mobile for loop in ');
        await page.emulate(puppeteer.devices[`${includedDevices[index]}`]);
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 0 });
        await page.screenshot({
          path: `${PATH}${includedDevices[index].replace(
            / /g,
            '_'
          )}-${POST_FIX}.${screenshotType}`,
          fullPage,
          type: screenshotType,
        });
      }
      core.endGroup(); // end start process mobile devices
    }

    await browser.close();

    await postProcesses();
  } catch (error) {
    console.error(error);
    core.setFailed(error.message);
  }
}

async function postProcesses() {
  const files = await readdir(PATH);
  if (!files.length) {
    return;
  }

  if (!!process.env.TELE_CHAT_ID && !!process.env.TELE_BOT_TOKEN) {
    await telegram({
      path: PATH,
      files,
      teleChatId: process.env.TELE_CHAT_ID,
      teltBotToken: process.env.TELE_BOT_TOKEN,
    });
  }
}

run();
