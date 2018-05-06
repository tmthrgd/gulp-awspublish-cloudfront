# gulp-awspublish-cloudfront

A plugin to invalidate a CloudFront cache on publish for [gulp-awspublish](https://github.com/pgherveou/gulp-awspublish).

## Usage

```js
const awscloudfront = require('gulp-awspublish-cloudfront');

gulp.task('publish', function() {
	const publisher = awspublish.create(/*...*/);

	return gulp.src('./public/**/*')
		.pipe(publisher.publish())
		.pipe(awscloudfront('your-cloudfront-id'));
});
```

If any files have changed in the S3 bucket, an invalidation for the entire bucket (`path: /*`) will be created. `gulp-awspublish-cloudfront` can optionally take a first argument that provides the [`aws.CloudFront`](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CloudFront.html#constructor_details) object to use.

## Installation

This is a [Node.js](https://nodejs.org/) module available through the 
[npm registry](https://www.npmjs.com/). It can be installed using the 
[`npm`](https://docs.npmjs.com/getting-started/installing-npm-packages-locally)
or 
[`yarn`](https://yarnpkg.com/en/)
command line tools.

```sh
npm install gulp-awspublish-cloudfront --save
```

## Dependencies

- [aws-sdk](https://ghub.io/aws-sdk): AWS SDK for JavaScript
- [fancy-log](https://ghub.io/fancy-log): Log things, prefixed with a timestamp
- [through2](https://ghub.io/through2): A tiny wrapper around Node streams2 Transform to avoid explicit subclassing noise

## License

BSD-3-Clause