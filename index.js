'use strict';

const aws = require('aws-sdk');
const through = require('through2');
const log = require('fancy-log');

module.exports = (cloudfront, distributionId) => {
	if (!distributionId) {
		distributionId = cloudfront;
		cloudfront = new aws.CloudFront();
	}

	let invalidate = false;
	return through.obj((file, enc, cb) => {
		const { s3: { state } = {} } = file;
		invalidate = invalidate || ['update', 'create', 'delete'].includes(state);
		cb(null, file);
	}, cb => {
		if (!invalidate) {
			return cb();
		}

		cloudfront.createInvalidation({
			DistributionId: distributionId,
			InvalidationBatch: {
				CallerReference: (new Date).toISOString(),
				Paths: {
					Quantity: 1,
					Items: ['/*'],
				},
			},
		}, (err, res) => {
			if (!err) {
				log('CloudFront invalidation:', res.Invalidation.Id);
			}

			cb(err);
		});
	});
};