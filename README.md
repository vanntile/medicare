# Medicare App
Medical diagnosis web application that manages patients and helps diagnosing heart-attack cases by monitoring the known values of six marker enzymes (MYG, CKMB1 + CKMB2, HFABP, CRP, cTnT, cTnI) and assessing the heart attack risk by user profiling.

## Screenshots

![Medicare presentation](medicare_presentation.png?raw=true "Presentation Image")

### Usage
You can login using the username `matt.smith` and the password `matt.smith.is.the.doctor` (*wink to all the whovians out there*).

## Getting Started
This app uses `npm` for dependency installation and `Gulp` for production packing.

### Prerequesites
There is a `package.json` with all the dependencies. Install by
```
npm install
```
If you don't have `npm`, check out [this](https://www.npmjs.com/get-npm) link.

### Development
You can open a `http-server` to start live development
```
cd src
http-server -o index.html -c-1
```

### Production
If you want to package the `src` into a `build` directory for production, there is a `gulpfile.js` where are predefined some tasks that help you. For more details on using **Gulp** task automation manager, check it out [here](https://gulpjs.com/). The tasks defined are the following:

```shell
gulp # default build task
gulp images # compress images
gulp css-purify # remove unused css
gulp css # concat css
gulp js-modules # concat and minify css modules
gulp templates # minify html
gulp connect # start an http server
gulp copy # create the static assets for production
```

### Built with
 - Bootstrap 4 (v4.1.2)
 - AngularJS (v1.7.2)

## Contributing

As I use this for my own projects, I know this might not be the perfect approach for all the projects out there. If you have any ideas, just [open an issue](https://github.com/vanntile/medicare/issues) and tell me what you think.

If you'd like to contribute, please fork the repository and make changes as you'd like. Pull requests are warmly welcome.

## Acknowledgements
I want to thank [@Poppy22](https://github.com/Poppy22) for the helpful guidance and advice.
