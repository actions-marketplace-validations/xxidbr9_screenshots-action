# screenshots-action
Generate a website screenshots in different viewpoint, devices.

# EXAMPLE 
https://github.com/xxidbr9/auto-screenshots-pr-example

# TODO
- [ ] Refactor entire code
- [ ] Add better documentation

- **feel free to open issue to discuss your scenario**

## Parameters

| Name(type) | required(default) | Description |
| ------------- | ------------- | ------------- |
| `url`(string) | **required**(`""`) | The target website's URL to generate screenshots |
| `devices`(string) | optional(`""`) | Specific mobile devices to generate screenshots. **Use comma(`,`) to separate devices name.** The devices name list in below. |
| `noDesktop`(boolean) | optional(`false`) | Set `true` if not require to get desktop viewpoint screenshots. |
| `fullPage`(boolean) | optional(`false`) | Set `true`, takes a screenshot of the full scrollable page. (v1.1.0 added) |
| `type`(string) | optional(`jpeg`) | Specify screenshot type, can be either `jpeg` or `png`. (v1.1.0 added) |

# Config Examples (screenshot desktop and few specific devices)
1. At the root of your repository, create a directory named `.github/workflows` to store your workflow files.

2. In `.github/workflows`, add a `.yml` or `.yaml` file for your workflow. For example, `.github/workflows/screenshots-workflow.yml`.

for more info
- https://help.github.com/en/actions/configuring-and-managing-workflows/configuring-a-workflow

```yaml
name: screenshots ci actions
on:
  push:
    branches:
    - master

jobs:
  screenshots:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: install puppeteer-headful
      uses: mujo-code/puppeteer-headful@master
      env:
        CI: 'true'
    - name: screenshots-ci-action
      uses: xxidbr9/screenshots-ci-action@v1.1.5
      with:
        url: https://github.com
        devices: iPhone 6,iPhone 6 landscape,Nexus 7,Pad Pro,Galaxy S III landscape,iPad Pro landscape
    - uses: actions/upload-artifact@v2
      with:
        path: screenshots
        name: Download-screenshots
```

# Config Examples 2(screenshot iphone 6, without desktop)

```yaml
name: screenshots ci actions
on:
  push:
    branches:
    - master

jobs:
  screenshots:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: install puppeteer-headful
      uses: mujo-code/puppeteer-headful@master
      env:
        CI: 'true'
    - name: screenshots-ci-action
      uses: xxidbr9/screenshots-ci-action@v1.1.5
      with:
        url: https://github.com
        devices: iPhone 6,iPhone 6 landscape
        noDesktop: true
    - uses: actions/upload-artifact@v2
      with:
        path: screenshots
        name: Download-screenshots
```

# Config Examples 3(multi urls)
- url 1: https://www.facebook.com/ (desktop)
- url 2: https://m.facebook.com/   (mobile (iPhone 6))

```yaml
name: screenshots ci actions
on:
  push:
    branches:
    - master

jobs:
  screenshots:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: install puppeteer-headful
      uses: mujo-code/puppeteer-headful@master
      env:
        CI: 'true'
    - name: screenshots-desktop-facebook
      uses: xxidbr9/screenshots-ci-action@v1.1.5
      with:
        url: https://www.facebook.com/
    - uses: actions/upload-artifact@v2
      with:
        name: Download-desktop-screenshots
        path: screenshots
    - run: rm ./screenshots/*

    - name: screenshots-mobile-facebook
      uses: xxidbr9/screenshots-ci-action@v1.1.5
      with:
        url: https://m.facebook.com/
        devices: iPhone 6,iPhone 6 landscape
        noDesktop: true
    - uses: actions/upload-artifact@v2
      with:
        path: screenshots
        name: Download-mobile-screenshots
    - run: rm ./screenshots/*
```

# More Config Examples (**Vercel**, **Netlify**)
- [**Vercel** Preview Deployment screenhots](/README.Vercel.md)
- [**Netlify** Preview Deployment screenhots](/README.Netlify.md)

# Download screenshots (more result example in below)
![img](./asset/download_screenshots_01.jpg)
![img](./asset/download_screenshots_02.jpg)

## desktop: genrate all these ratio
- width: 1366px, height: 768px
- width: 1920px, height: 1080px



### full mobile devices options 
[here](https://github.com/puppeteer/puppeteer/blob/main/src/common/DeviceDescriptors.ts)
<details>
  <summary>Click to show all list!</summary>
  
  ## Mobile Device
  - 'Blackberry PlayBook',
  - 'Blackberry PlayBook landscape',
  - 'BlackBerry Z30',
  - 'BlackBerry Z30 landscape',
  - 'Galaxy Note 3',
  - 'Galaxy Note 3 landscape',
  - 'Galaxy Note II',
  - 'Galaxy Note II landscape',
  - 'Galaxy S III',
  - 'Galaxy S III landscape',
  - 'Galaxy S5',
  - 'Galaxy S5 landscape',
  - 'Galaxy S8',
  - 'Galaxy S8 landscape',
  - 'Galaxy S9+',
  - 'Galaxy S9+ landscape',
  - 'Galaxy Tab S4',
  - 'Galaxy Tab S4 landscape',
  - 'iPad',
  - 'iPad landscape',
  - 'iPad (gen 6)',
  - 'iPad (gen 6) landscape',
  - 'iPad (gen 7)',
  - 'iPad (gen 7) landscape',
  - 'iPad Mini',
  - 'iPad Mini landscape',
  - 'iPad Pro',
  - 'iPad Pro landscape',
  - 'iPad Pro 11',
  - 'iPad Pro 11 landscape',
  - 'iPhone 4',
  - 'iPhone 4 landscape',
  - 'iPhone 5',
  - 'iPhone 5 landscape',
  - 'iPhone 6',
  - 'iPhone 6 landscape',
  - 'iPhone 6 Plus',
  - 'iPhone 6 Plus landscape',
  - 'iPhone 7',
  - 'iPhone 7 landscape',
  - 'iPhone 7 Plus',
  - 'iPhone 7 Plus landscape',
  - 'iPhone 8',
  - 'iPhone 8 landscape',
  - 'iPhone 8 Plus',
  - 'iPhone 8 Plus landscape',
  - 'iPhone SE',
  - 'iPhone SE landscape',
  - 'iPhone X',
  - 'iPhone X landscape',
  - 'iPhone XR',
  - 'iPhone XR landscape',
  - 'iPhone 11',
  - 'iPhone 11 landscape',
  - 'iPhone 11 Pro',
  - 'iPhone 11 Pro landscape',
  - 'iPhone 11 Pro Max',
  - 'iPhone 11 Pro Max landscape',
  - 'iPhone 12',
  - 'iPhone 12 landscape',
  - 'iPhone 12 Pro',
  - 'iPhone 12 Pro landscape',
  - 'iPhone 12 Pro Max',
  - 'iPhone 12 Pro Max landscape',
  - 'iPhone 12 Mini',
  - 'iPhone 12 Mini landscape',
  - 'iPhone 13',
  - 'iPhone 13 landscape',
  - 'iPhone 13 Pro',
  - 'iPhone 13 Pro landscape',
  - 'iPhone 13 Pro Max',
  - 'iPhone 13 Pro Max landscape',
  - 'iPhone 13 Mini',
  - 'iPhone 13 Mini landscape',
  - 'JioPhone 2',
  - 'JioPhone 2 landscape',
  - 'Kindle Fire HDX',
  - 'Kindle Fire HDX landscape',
  - 'LG Optimus L70',
  - 'LG Optimus L70 landscape',
  - 'Microsoft Lumia 550',
  - 'Microsoft Lumia 950',
  - 'Microsoft Lumia 950 landscape',
  - 'Nexus 10',
  - 'Nexus 10 landscape',
  - 'Nexus 4',
  - 'Nexus 4 landscape',
  - 'Nexus 5',
  - 'Nexus 5 landscape',
  - 'Nexus 5X',
  - 'Nexus 5X landscape',
  - 'Nexus 6',
  - 'Nexus 6 landscape',
  - 'Nexus 6P',
  - 'Nexus 6P landscape',
  - 'Nexus 7',
  - 'Nexus 7 landscape',
  - 'Nokia Lumia 520',
  - 'Nokia Lumia 520 landscape',
  - 'Nokia N9',
  - 'Nokia N9 landscape',
  - 'Pixel 2',
  - 'Pixel 2 landscape',
  - 'Pixel 2 XL',
  - 'Pixel 2 XL landscape',
  - 'Pixel 3',
  - 'Pixel 3 landscape',
  - 'Pixel 4',
  - 'Pixel 4 landscape',
  - 'Pixel 4a (5G)',
  - 'Pixel 4a (5G) landscape',
  - 'Pixel 5',
  - 'Pixel 5 landscape',
  - 'Moto G4',
  - 'Moto G4 landscape'
</details>

### mobile (iPhone_6, fullPage)
<p align="center">
  <img width="auto" height="450" src="asset/iPhone_6-bf5fcab-fullPage.jpeg"
</p>
